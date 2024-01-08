import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

const VMs = ['VM_1', 'VM_2', 'VM_3']

const RunningInstances = ({ currentConnections, botConfigs, promptConfigs, setPromptConfigs, setTempBotConfigs, setConnectionInfo, setRowSelectionModel }) => {
    const [currentSelected, setCurrentSelected] = useState('');

    const setAutoanswerConfigs = (e) => {
        setCurrentSelected(e.target.value);
        const connectionInfo = currentConnections[e.target.value];
        setConnectionInfo({ 'group_id': connectionInfo['group_id'], 'connection_id': connectionInfo['connection_id'], 'VM_id': e.target.value, 'is_active': connectionInfo['is_active'] });

        if (connectionInfo['is_active'] === 2) {
            setPromptConfigs(connectionInfo['prompt_configs']);
            setTempBotConfigs(connectionInfo['botconfigs']);
            setRowSelectionModel(connectionInfo['account_ids']);
        } else {
            if (promptConfigs) {
                setPromptConfigs(promptConfigs);
            }
            setTempBotConfigs(botConfigs);
            setRowSelectionModel([]);
        }
    };

    return (
        <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
            <Typography variant='h5' marginBottom={3}>
                Running Instances
            </Typography>
            <Grid container style={{ gap: 5 }}>
                {VMs.map((VM_id) => {
                    let isConnected = false;
                    Object.values(currentConnections).forEach((connection) => {
                        if (connection["VM_id"] === VM_id) {
                            isConnected = true;
                        }
                    });
                    return (
                        <Button key={VM_id} value={VM_id} color="primary" variant={currentSelected === VM_id ? 'contained' : 'outlined'} disabled={!isConnected} onClick={(e) => setAutoanswerConfigs(e)}>
                            {VM_id.replace('_', ' ')}
                        </Button>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default RunningInstances;