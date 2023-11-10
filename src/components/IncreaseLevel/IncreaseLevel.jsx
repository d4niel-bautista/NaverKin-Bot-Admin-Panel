import { Box, Button, Divider, Grid, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SERVER } from '../../App';
import { useOutletContext } from 'react-router-dom';

const delayValues = {
    '30 secs': 30,
    '1 min': 60,
    '2 mins': 120,
    '3 mins': 180,
    '5 mins': 300,
    '10 mins': 600,
    '15 mins': 900,
    '20 mins': 1200,
    '30 mins': 1800,
    '45 mins': 2700,
    '1 hour': 3600,
    '2 hours': 7200,
    '3 hours': 10800
};

const cooldownValues = {
    '16 hours': 57600,
    '18 hours': 64800,
    '20 hours': 72000,
    '24 hours': 86400
}

const answersPerDay = [];
for (let i = 1; i < 21; i++) {
    answersPerDay.push(i * 10);
}

const IncreaseLevel = () => {
    const [botConfigs, setBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 20, 'cooldown': 64800 });
    const [tempBotConfigs, setTempBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 20, 'cooldown': 64800 });
    const [promptConfigsList, setPromptConfigsList] = useState([]);
    const [promptConfigs, setPromptConfigs] = useState({ 'id': '', 'prompt': '', 'postscript': '', 'prohibited_words': '' });
    const [levelupAccounts, setLevelupAccounts] = useState([]);
    const [token] = useOutletContext();

    useEffect(() => {
        const fetchAutoanswerBotConfigs = async () => {
            const response = await fetch(SERVER + "/autoanswerbot_configs", {
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
                setLevelupAccounts(data.levelup_accounts);
            }
        }
        fetchAutoanswerBotConfigs();
    }, []);

    const changePromptConfigs = async (e) => {
        const { name, value } = e.target;
        setPromptConfigs({
            ...promptConfigs,
            [name]: value,
        });
    };

    const changeBotConfigs = async (e) => {
        const { name, value } = e.target;
        setTempBotConfigs({ ...tempBotConfigs, [name]: value });
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
        const response = await fetch(SERVER + "/autoanswerbot_configs", {
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

    return (
        <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px' }}>
            <Typography variant='h5' marginBottom={3}>
                Configuration
            </Typography>
            <Grid container rowSpacing={3}>
                <Grid item md={12}>
                    <TextField select label="Submit Delay" name="submit_delay" onChange={changeBotConfigs} value={tempBotConfigs['submit_delay']} sx={{ width: '150px', marginRight: 2 }}>
                        {Object.keys(delayValues).map((key) =>
                            <MenuItem key={key} value={delayValues[key]}>{key}</MenuItem>
                        )}
                    </TextField>
                    <TextField select label="Next Question" name="page_refresh" onChange={changeBotConfigs} value={tempBotConfigs['page_refresh']} defaultValue={20} sx={{ width: '150px', marginRight: 2 }}>
                        {Object.keys(delayValues).map((key) =>
                            <MenuItem key={key} value={delayValues[key]}>{key}</MenuItem>
                        )}
                    </TextField>
                    <TextField select label="Answers per Day" name="answers_per_day" onChange={changeBotConfigs} value={tempBotConfigs['answers_per_day']} sx={{ width: '170px', marginRight: 2 }}>
                        {answersPerDay.map((num) =>
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        )}
                    </TextField>
                    <TextField select label="Restart After" name="cooldown" onChange={changeBotConfigs} value={tempBotConfigs['cooldown']} sx={{ width: '170px', marginRight: 2 }}>
                        {Object.keys(cooldownValues).map((key) =>
                            <MenuItem key={key} value={cooldownValues[key]}>{key}</MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item md={12}>
                    <TextField select label="Category" name="description" defaultValue={''} sx={{ width: '160px', marginRight: 2 }} onChange={(e) => setPromptConfigs({ 'id': e.target.value['id'], 'prompt': e.target.value['prompt'], 'postscript': e.target.value['postscript'], 'prohibited_words': e.target.value['prohibited_words'] })}>
                        {promptConfigsList.map((item) =>
                            <MenuItem key={item.id} value={item}>{item.description}</MenuItem>
                        )}
                    </TextField>
                    <TextField
                        name='prompt'
                        label='Prompt'
                        sx={{ width: '300px', marginRight: 2 }}
                        margin="dense"
                        rows={8}
                        value={promptConfigs.prompt}
                        multiline
                        onChange={changePromptConfigs}
                    />
                    <TextField
                        name='postscript'
                        label='Postscript'
                        sx={{ width: '200px', marginRight: 2 }}
                        margin="dense"
                        rows={8}
                        value={promptConfigs.postscript}
                        multiline
                        onChange={changePromptConfigs}
                    />
                    <TextField
                        name='prohibited_words'
                        label='Prohibited Words'
                        sx={{ width: '200px' }}
                        margin="dense"
                        rows={8}
                        value={promptConfigs.prohibited_words}
                        multiline
                        onChange={changePromptConfigs}
                    />
                </Grid>
                <Grid container item columnSpacing={2} sx={{ marginTop: -2, marginLeft: 21 }}>
                    <Grid item>
                        <Button color="secondary" variant="contained" onClick={revertChanges}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={updateChanges}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
};

export default IncreaseLevel;