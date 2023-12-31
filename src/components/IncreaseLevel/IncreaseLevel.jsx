import { Backdrop, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import BotConfigs from './BotConfigs';
import PromptConfigs from './PromptConfigs';
import RunningInstances from './RunningInstances';
import { DataGrid } from '@mui/x-data-grid';
import StartAutoanswerBotToolbarComponent from './StartAutoanswerBotToolbarComponent';
import clsx from 'clsx';
import { addIndices } from '../../utils/addIndices';

const columns = [
    { field: 'index', headerName: '#', width: 10 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'level', headerName: 'Level', width: 70 },
    {
        field: 'verified',
        headerName: 'Verified', width: 80,
        type: 'singleSelect',
        editable: true,
        getOptionValue: (value) => value.value,
        getOptionLabel: (value) => value.label,
        valueOptions: [{ 'value': true, 'label': 'Yes' }, { 'value': false, 'label': 'No' }],
        cellClassName: (params) => {
            if (params.value == null) {
                return '';
            }

            return clsx('super-app', {
                verified: params.value === true,
            });
        },
    },
    { field: 'status', headerName: 'Status', width: 70 },
];

const IncreaseLevel = () => {
    const [botConfigs, setBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 10, 'cooldown': 64800 });
    const [tempBotConfigs, setTempBotConfigs] = useState({ 'submit_delay': 120, 'page_refresh': 600, 'answers_per_day': 10, 'cooldown': 64800 });
    const [promptConfigsList, setPromptConfigsList] = useState([]);
    const [autoanswerbotConnections, setAutoanswerbotConnections] = useState({});
    const [promptConfigs, setPromptConfigs] = useState({ 'id': '', 'prompt': '', 'postscript': '', 'prohibited_words': '' });
    const [levelupAccounts, setLevelupAccounts] = useState([]);
    const currentlyRunningAccounts = useRef([]);
    const [connectionInfo, setConnectionInfo] = useState({});
    const [loadingState, setLoadingState] = useState(false);
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

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
                addIndices(data.levelup_accounts);
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
                const connections = {};
                data.forEach((connection) => {
                    if (Object.keys(connection["prompt_configs"]).length !== 0) {
                        connection["prompt_configs"]["prohibited_words"] = connection["prompt_configs"]["prohibited_words"].join(";");
                    }
                    connections[connection["VM_id"]] = connection;
                    if (connection["is_active"] === 2) {
                        connection["account_ids"].forEach((account_id) => currentlyRunningAccounts.current.push(account_id));
                    }
                });
                setAutoanswerbotConnections(connections);
            }
        };
        fetchAutoanswerBotConfigs();
        fetchAutoanswerBotConnections();
    }, []);

    const revertChanges = () => {
        setTempBotConfigs(botConfigs);
        if (promptConfigs['id'] !== '') {
            setPromptConfigs(promptConfigsList.find(obj => obj.id === promptConfigs['id']));
        }
    };

    const updateChanges = async (e) => {
        e.preventDefault();
        setLoadingState(true);

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

        setLoadingState(false);
    };

    const startAutoanswerBot = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        if (!rowSelectionModel.length || !connectionInfo["VM_id"]) {
            setLoadingState(false);
            return;
        }

        const autoanswerBotData = { 'connection_info': connectionInfo, 'levelup_accounts': rowSelectionModel, 'botconfigs': botConfigs, 'prompt_configs': promptConfigs }
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
            setAutoanswerbotConnections((connections) => ({
                ...connections,
                [connectionInfo["VM_id"]]: {
                    ...connections[connectionInfo["VM_id"]],
                    is_active: 2,
                    prompt_configs: promptConfigs,
                    account_ids: rowSelectionModel,
                    botconfigs: botConfigs
                }
            }));
            setConnectionInfo((connectionInfo) => ({
                ...connectionInfo,
                is_active: 2
            }));
            rowSelectionModel.forEach((account_id) => currentlyRunningAccounts.current.push(account_id));
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
            <RunningInstances currentConnections={autoanswerbotConnections} botConfigs={botConfigs} promptConfigs={promptConfigsList[0]} setTempBotConfigs={setTempBotConfigs} setPromptConfigs={setPromptConfigs} setConnectionInfo={setConnectionInfo} setRowSelectionModel={setRowSelectionModel} />
            <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
                <Typography variant='h5' marginBottom={3}>
                    Configuration
                </Typography>
                <Grid container rowSpacing={3}>
                    <BotConfigs tempBotConfigs={tempBotConfigs} setTempBotConfigs={setTempBotConfigs} />
                    <PromptConfigs promptConfigs={promptConfigs} setPromptConfigs={setPromptConfigs} />
                    <Grid container item columnSpacing={2} sx={{ marginTop: -2, marginLeft: 21 }}>
                        <Grid item>
                            <Button color="secondary" variant="contained" onClick={revertChanges} disabled={loadingState || connectionInfo['is_active'] === 2}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" onClick={updateChanges} disabled={loadingState || connectionInfo['is_active'] === 2}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    '& .super-app.verified': {
                        fontWeight: 'bold',
                    },
                }}
            >
                <DataGrid
                    sx={{
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#e7e5e1',
                        },
                        '.MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold'
                        },
                        '.unselectable': {
                            opacity: 0.38
                        },
                        maxHeight: '700px',
                        maxWidth: '500px',
                    }}
                    columns={columns}
                    rows={levelupAccounts}
                    checkboxSelection={connectionInfo["VM_id"] ? true : false}
                    slots={{ toolbar: StartAutoanswerBotToolbarComponent }}
                    slotProps={{
                        toolbar: {
                            startAutoanswerBot,
                            rowSelectionModel,
                            connectionInfo,
                            loadingState,
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                                status: false
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    getRowClassName={(params) => `${params.row.status !== 0 || currentlyRunningAccounts.current.includes(params.row.id) ? 'unselectable' : 'available'}`}
                    isRowSelectable={(params) => { return !currentlyRunningAccounts.current.includes(params.row.id) && params.row.status === 0 }}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
                />
            </Box>
        </>
    );
};

export default IncreaseLevel;