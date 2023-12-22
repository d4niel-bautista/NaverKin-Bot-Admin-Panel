import { Backdrop, Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import BotConfigs from './BotConfigs';
import PromptConfigs from './PromptConfigs';
import RunningInstances from './RunningInstances';

const IncreaseLevel = () => {
    const [botConfigs, setBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 10, 'cooldown': 64800 });
    const [tempBotConfigs, setTempBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 10, 'cooldown': 64800 });
    const [promptConfigsList, setPromptConfigsList] = useState([]);
    const [autoanswerbotConnections, setAutoanswerbotConnections] = useState([]);
    const [promptConfigs, setPromptConfigs] = useState({ 'id': '', 'prompt': '', 'postscript': '', 'prohibited_words': '' });
    const [levelupAccounts, setLevelupAccounts] = useState([]);
    const [levelupAccount, setLevelupAccount] = useState({ "id": '' });
    const [loadingState, setLoadingState] = useState(false);
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);
    const [disableAll, setDisableAll] = useState(false);

    useEffect(() => {
        const fetchAutoanswerBotConfigs = async () => {
            const response = await fetch(serverAPI + "/autoanswerbot_configs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setBotConfigs(data.botconfigs);
                setTempBotConfigs(data.botconfigs);
                setPromptConfigsList(data.prompt_configs);
                setPromptConfigs(data.prompt_configs[0]);
                setLevelupAccounts(data.levelup_accounts);
            }
        };
        const fetchAutoanswerBotConnections = async () => {
            const response = await fetch(serverAPI + "/autoanswerbot_connections", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                data.forEach((connection) => {
                    if (Object.keys(connection["prompt_configs"]).length !== 0) {
                        connection["prompt_configs"]["prohibited_words"] = connection["prompt_configs"]["prohibited_words"].join(";");
                    }
                });
                setAutoanswerbotConnections(data);
            }
        };
        fetchAutoanswerBotConfigs();
        fetchAutoanswerBotConnections();
    }, []);

    const changeLevelupAccount = async (e) => {
        const { value } = e.target;
        setLevelupAccount(levelupAccounts.find(account => account.id === value));
    };

    const revertChanges = () => {
        setTempBotConfigs(botConfigs);
        if (promptConfigs['id'] !== '') {
            setPromptConfigs(promptConfigsList.find(obj => obj.id === promptConfigs['id']));
        }
    };

    const updateChanges = async (e) => {
        e.preventDefault();

        const configs = { 'botconfigs': tempBotConfigs, 'prompt_configs': promptConfigs };
        const response = await fetch(serverAPI + "/autoanswerbot_configs", {
            method: "PATCH",
            body: JSON.stringify(configs),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            setBotConfigs(tempBotConfigs);
            setTempBotConfigs(tempBotConfigs);
            setPromptConfigs(promptConfigs);
            setPromptConfigsList((promptConfigsList) => {
                const updatedPromptConfigsIndex = promptConfigsList.findIndex(obj => obj.id === promptConfigs['id']);
                if (updatedPromptConfigsIndex !== -1) {
                    const updatedPromptConfigsList = [...promptConfigsList];
                    updatedPromptConfigsList[updatedPromptConfigsIndex] = promptConfigs;

                    return updatedPromptConfigsList;
                }
                return promptConfigsList;
            });
        }
    };

    const startAutoanswerBot = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        if (!levelupAccount) {
            return;
        }

        const autoanswerBotData = { 'levelup_account': levelupAccount, 'botconfigs': botConfigs, 'prompt_configs': promptConfigs }
        const response = await fetch(serverAPI + "/start_autoanswerbot", {
            method: "POST",
            body: JSON.stringify(autoanswerBotData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            const data = await response.json();
        }
        setLoadingState(false);
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingState}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <RunningInstances currentConnections={autoanswerbotConnections} botConfigs={botConfigs} promptConfigs={promptConfigsList[0]} setTempBotConfigs={setTempBotConfigs} setPromptConfigs={setPromptConfigs} setLevelupAccount={setLevelupAccount} setDisableAll={setDisableAll} />
            <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
                <Typography variant='h5' marginBottom={3}>
                    Configuration {levelupAccount.id && `[${levelupAccount.username}]`}
                </Typography>
                <Grid container rowSpacing={3}>
                    <BotConfigs tempBotConfigs={tempBotConfigs} setTempBotConfigs={setTempBotConfigs} />
                    <PromptConfigs promptConfigs={promptConfigs} setPromptConfigs={setPromptConfigs} />
                    <Grid container item columnSpacing={2} sx={{ marginTop: -2, marginLeft: 21 }}>
                        <Grid item>
                            <Button color="secondary" variant="contained" onClick={revertChanges} disabled={loadingState || disableAll}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" onClick={updateChanges} disabled={loadingState || disableAll}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px' }}>
                <Grid container columnSpacing={2} alignItems={'center'}>
                    <Grid item>
                        <TextField select label="Account" name="levelup_account" value={levelupAccount.id} onChange={changeLevelupAccount} sx={{ width: '200px' }}>
                            {levelupAccounts.map((account) =>
                                <MenuItem key={account.id} value={account.id}>{account.username}</MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={startAutoanswerBot} disabled={!levelupAccount.id || loadingState || disableAll}>
                            Start
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default IncreaseLevel;