import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import ActivityToolbar from './ActivityToolbar';
import { Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
const moment = require('moment');

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'ip_address', headerName: 'IP Address', width: 120 },
    {
        field: 'login_timestamp', headerName: 'Timestamp', width: 160, type: 'date',
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD HH:mm:ss').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY H:mm:ss') : '';
        }
    },
];

const Logins = ({ logins, resetLoginsList, viewLoginsHistory, button, setButton }) => {
    const [selected, setRowSelectionModel] = useState([]);

    const handleDelete = async () => {

    };

    const handleCellDoubleClick = (params, event) => {
        if (params.field === "username") {
            viewLoginsHistory(params.row.username);
            setButton(backButton);
        }
    };

    const handleBackButtonClick = () => {
        resetLoginsList();
        setButton(null);
    };

    const backButton = (
        <Button
            size='small'
            startIcon={<ChevronLeft />}
            sx={{ color: '#0000008a' }}
            onClick={handleBackButtonClick}
        >
            Back
        </Button>
    );

    return (
        <DataGrid
            columns={columns}
            rows={logins}
            slots={{ toolbar: ActivityToolbar }}
            slotProps={{
                toolbar: {
                    selected,
                    handleDelete,
                    title: "Logins",
                    component: [button]
                },
            }}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        id: false,
                    },
                }
            }}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setRowSelectionModel}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
                '.MuiDataGrid-columnHeaders': {
                    backgroundColor: '#e7e5e1',
                },
                '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold'
                }, maxWidth: '450px',
            }}
            onCellDoubleClick={(params, event) => handleCellDoubleClick(params, event)}
        />
    );
};

export default Logins;