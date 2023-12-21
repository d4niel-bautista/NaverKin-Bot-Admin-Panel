import { Backdrop, Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import BotConfigs, { answersPerDay } from './BotConfigs';
import PromptConfigs from './PromptConfigs';
import RunningInstances from './RunningInstances';
import { determineRange } from '../../utils/determineRange';

const IncreaseLevel = () => {
    const [botConfigs, setBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': "6-13", 'cooldown': 64800 });
    const [tempBotConfigs, setTempBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': "6-13", 'cooldown': 64800 });
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
                console.log(data)
                data.forEach((connection) => {
                    if (connection["botconfigs"] && connection["botconfigs"]["answers_per_day"] !== '') {
                        connection["botconfigs"]["answers_per_day"] = determineRange(answersPerDay, connection["botconfigs"]["answers_per_day"]);
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
            data.botconfigs['answers_per_day'] = 20;
            setBotConfigs(tempBotConfigs);
            setTempBotConfigs(tempBotConfigs);
            setPromptConfigs(promptConfigs);
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
            <RunningInstances currentConnections={autoanswerbotConnections} setTempBotConfigs={setTempBotConfigs} setPromptConfigs={setPromptConfigs} setLevelupAccount={setLevelupAccount} setDisableAll={setDisableAll} />
            <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
                <Typography variant='h5' marginBottom={3}>
                    Configuration
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
                        <Button color="primary" variant="contained" onClick={startAutoanswerBot} disabled={!levelupAccount || loadingState || disableAll}>
                            Start
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default IncreaseLevel;