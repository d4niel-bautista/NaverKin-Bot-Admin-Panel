import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

const VMs = ['VM_1', 'VM_2', 'VM_3']

const RunningInstances = ({ currentConnections, botConfigs, promptConfigs, setPromptConfigs, setTempBotConfigs, setLevelupAccount, setConnectionInfo, setDisableAll }) => {
    const [currentSelected, setCurrentSelected] = useState('');

    const setAutoanswerConfigs = (connectionInfo, e) => {
        setCurrentSelected(e.target.value);
        setConnectionInfo({'group_id': connectionInfo['group_id'], 'connection_id': connectionInfo['connection_id']});

        if (connectionInfo['is_active'] === 2) {
            setPromptConfigs(connectionInfo['prompt_configs']);
            setTempBotConfigs(connectionInfo['botconfigs']);
            setLevelupAccount(connectionInfo['account']);
        } else {
            if (promptConfigs) {
                setPromptConfigs(promptConfigs);
            }
            setTempBotConfigs(botConfigs);
            setLevelupAccount({ "id": '' });
        }
        setDisableAll(connectionInfo['is_active'] === 2 ? true : false);
    };

    return (
        <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
            <Typography variant='h5' marginBottom={3}>
                Running Instances
            </Typography>
            <Grid container style={{ gap: 5 }}>
                {VMs.map((VM_id) => {
                    let isConnected = false;
                    let connectionInfo = null;
                    currentConnections.forEach((connection) => {
                        if (connection["VM_id"] === VM_id) {
                            isConnected = true;
                            connectionInfo = connection
                        }
                    });
                    return (
                        <Button key={VM_id} value={VM_id} color="primary" variant={currentSelected === VM_id ? 'contained' : 'outlined'} disabled={!isConnected} onClick={(e) => setAutoanswerConfigs(connectionInfo, e)}>
                            {VM_id.replace('_', ' ')}
                        </Button>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default RunningInstances;