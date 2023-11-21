import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { SERVER } from '../../App';
import { useOutletContext } from 'react-router-dom';
import { getObjectNewValues } from '../../utils/getObjectNewValues';
import AlertSnackbar from '../Alerts/AlertSnackbar';
import DataGridToolbar from './DataGridToolbar';
const moment = require('moment');

const columnsInitial = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'password', headerName: 'Password', width: 100, editable: true },
    { field: 'level', headerName: 'Level', width: 80 },
    {
        field: 'category',
        headerName: 'Category', width: 100, editable: true,
        type: 'singleSelect',
        valueOptions: []
    },
    {
        field: 'date_registered',
        headerName: 'Registration', width: 100, type: 'date',
        editable: true,
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY') : '';
        }
    },
    { field: 'verified', headerName: 'Verified', width: 80, editable: true },
    { field: 'last_login', headerName: 'Last Login', width: 100, editable: true },
    { field: 'account_url', headerName: 'Profile URL', width: 120, editable: true },
    { field: 'recovery_email', headerName: 'Recovery Email', width: 120, editable: true },
    { field: 'name', headerName: 'Name', width: 120, editable: true },
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
    { field: 'mobile_no', headerName: 'Mobile No', width: 100, editable: true },
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
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "",
        description: ""
    });
    const [token] = useOutletContext();

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch(SERVER + "/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        }
        const fetchCategories = async () => {
            const response = await fetch(SERVER + "/categories", {
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
                })
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

        const response = await fetch(SERVER + "/update_account", {
            method: "PATCH", body: JSON.stringify(newValues),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        const data = await response.json();
        if (response.ok) {
            setSnackbar({ open: true, severity: 'success', description: data })
            return updatedRow;
        } else {
            setSnackbar({ open: true, severity: 'error', description: data })
            return originalRow;
        }
    };

    return (
        <>
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
                        setSnackbar
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={handleRowSelectionModelChange}
                processRowUpdate={onRowUpdate}
                onProcessRowUpdateError={(error) => console.log(error)}
            />
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