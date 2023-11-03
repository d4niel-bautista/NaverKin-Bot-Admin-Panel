import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { SERVER } from '../../App';
import { useOutletContext } from 'react-router-dom';
const moment = require('moment');

const categories = ['Market', 'Finance', 'Development']
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'password', headerName: 'Password', width: 100 },
    { field: 'level', headerName: 'Level', width: 80 },
    {
        field: 'category',
        headerName: 'Category', width: 100,
        type: 'singleSelect',
        valueOptions: categories
    },
    { field: 'date_registered', headerName: 'Registration', width: 100, type: 'date' },
    { field: 'verified', headerName: 'Verified', width: 80 },
    { field: 'last_login', headerName: 'Last Login', width: 100 },
    { field: 'account_url', headerName: 'Profile URL', width: 120 },
    { field: 'recovery_email', headerName: 'Recovery Email', width: 120 },
    { field: 'name', headerName: 'Name', width: 120 },
    {
        field: 'date_of_birth',
        headerName: 'Date of Birth', width: 100, type: 'date',
        editable: true,
        valueGetter: (params) => {
            return moment(params.value, 'YYYY-MM-DD').toDate();
        },
        valueFormatter: (params) => {
            return moment(params.value).format('DD/MM/YYYY');
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
]

const AccountsDataGrid = () => {
    const [accounts, setAccounts] = useState([]);
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
        fetchAccounts();
    }, []);

    const onRowUpdate = async (updatedRow, originalRow) => {
        return updatedRow;
    };

    return (
        <DataGrid
            sx={{
                '.MuiDataGrid-columnHeaders': {
                    backgroundColor: '#e7e5e1',
                },
                maxHeight: '80vh',
                maxWidth: '75vw',
            }}
            rows={accounts}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
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
            processRowUpdate={onRowUpdate}
            onProcessRowUpdateError={(error) => console.log(error)}
        />
    );
}

export default AccountsDataGrid;