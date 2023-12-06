import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';

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

const answersPerDay = ["2-5", "3-7", "6-13", "10-15", "12-20"];

const BotConfigs = ({ tempBotConfigs, setTempBotConfigs }) => {
    const changeBotConfigs = async (e) => {
        const { name, value } = e.target;
        setTempBotConfigs({ ...tempBotConfigs, [name]: value });
    };

    return (
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
    );
};

export default BotConfigs;