import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import { getObjectNewValues } from '../../utils/getObjectNewValues';
import AlertSnackbar from '../Alerts/AlertSnackbar';
import DataGridToolbar from './DataGridToolbar';
import SaveAccount from './SaveAccount';
import { addIndices } from '../../utils/addIndices';
import MUINewWindow from '../MUINewWindow/MUINewWindow';
import { Box } from '@mui/material';
import clsx from 'clsx';
const moment = require('moment');

const columnsInitial = [
    { field: 'index', headerName: '#', width: 10 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'password', headerName: 'Password', width: 100 },
    { field: 'level', headerName: 'Level', width: 80 },
    {
        field: 'category',
        headerName: 'Category', width: 100,
        type: 'singleSelect',
        valueOptions: []
    },
    {
        field: 'registration_date',
        headerName: 'Registration', width: 100, type: 'date',
        editable: true,
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY') : '';
        }
    },
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
    { field: 'last_login', headerName: 'Last Login', width: 100 },
    { field: 'account_url', headerName: 'Profile URL', width: 120 },
    { field: 'recovery_email', headerName: 'Recovery Email', width: 120 },
    { field: 'name', headerName: 'Name', width: 120 },
    {
        field: 'date_of_birth',
        headerName: 'Date of Birth', width: 100, type: 'date',
        editable: true,
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY') : '';
        }
    },
    { field: 'mobile_no', headerName: 'Mobile No', width: 100 },
    {
        field: 'gender',
        headerName: 'Gender', width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['Male', 'Female', 'Other']
    },
];

const AccountsDataGrid = () => {
    const [accounts, setAccounts] = useState([]);
    const [columns, setColumns] = useState(columnsInitial);
    const [categories, setCategories] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "",
        description: ""
    });
    const [openEditAccountWindow, setOpenEditAccountWindow] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState([]);
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch(serverAPI + "/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                addIndices(data);
                setAccounts(data);
            }
        }
        const fetchCategories = async () => {
            const response = await fetch(serverAPI + "/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setColumns((columns) => {
                    const updatedColumns = [...columns];
                    const categoryColumnIndex = updatedColumns.findIndex(column => column.field === "category");

                    if (categoryColumnIndex !== -1) {
                        updatedColumns[categoryColumnIndex] = {
                            ...updatedColumns[categoryColumnIndex],
                            getOptionValue: (value) => value.id,
                            getOptionLabel: (value) => value.category,
                            valueOptions: data
                        }
                    }
                    return updatedColumns;
                });
                setCategories(data);
            }
        };
        fetchAccounts();
        fetchCategories();
    }, []);

    const handleRowSelectionModelChange = (newRowSelectionModel) => {
        const selectedRows = newRowSelectionModel.map((id) => {
            const account = accounts.find((account) => account.id === id);
            return account ? account.username : '';
        });
        setSelectedUsernames(selectedRows.sort());
        setRowSelectionModel(newRowSelectionModel);
    }

    const onRowUpdate = async (updatedRow, originalRow) => {
        const newValues = getObjectNewValues(originalRow, updatedRow);
        if (Object.keys(newValues).length === 0) {
            return originalRow;
        }
        newValues['id'] = updatedRow['id'];

        const response = await fetch(serverAPI + "/update_account", {
            method: "PATCH", body: JSON.stringify(newValues),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        const data = await response.json();
        if (response.ok) {
            setSnackbar({ open: true, severity: 'success', description: data.message })
            return updatedRow;
        } else {
            setSnackbar({ open: true, severity: 'error', description: data.message })
            return originalRow;
        }
    };

    const handleCellDoubleClick = (params, event) => {
        if (params.field === "username") {
            editAccount(params.row);
            console.log(openEditAccountWindow);
        } else if (params.field === "account_url") {
            if (params.row.account_url) {
                window.open(params.row.account_url, "", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=900,height=600");
            }
        }
    };

    const editAccount = (account) => {
        setAccountToEdit(account);
        setOpenEditAccountWindow(true);
    };

    return (
        <>
            {openEditAccountWindow && (
                <MUINewWindow title={"Edit Account"} onClose={() => setOpenEditAccountWindow(false)}>
                    <SaveAccount action="edit" account={accountToEdit} categories={categories} token={token} serverAPI={serverAPI} setAccounts={setAccounts} />
                </MUINewWindow>
            )}
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
                        maxHeight: '80vh',
                        maxWidth: '75vw',
                    }}
                    rows={accounts}
                    columns={columns}
                    slots={{ toolbar: DataGridToolbar }}
                    slotProps={{
                        toolbar: {
                            rowSelectionModel,
                            selectedUsernames,
                            accounts,
                            setAccounts,
                            setSnackbar,
                            categories,
                            token,
                            serverAPI
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                    processRowUpdate={onRowUpdate}
                    onProcessRowUpdateError={(error) => console.log(error)}
                    onCellDoubleClick={(params, event) => handleCellDoubleClick(params, event)}
                />
            </Box>
            <AlertSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                description={snackbar.description}
                onClose={() => setSnackbar(snackbar => ({ ...snackbar, open: false }))}
            />
        </>
    );
}

export default AccountsDataGrid;