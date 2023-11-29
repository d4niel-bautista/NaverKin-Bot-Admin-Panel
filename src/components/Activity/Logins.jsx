import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import ActivityToolbar from './ActivityToolbar';
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

const Logins = ({ logins }) => {
    const [selected, setRowSelectionModel] = useState([]);

    const handleDelete = async () => {

    };

    return (
        <DataGrid
            columns={columns}
            rows={logins}
            slots={{ toolbar: ActivityToolbar }}
            slotProps={{
                toolbar: {
                    selected,
                    handleDelete,
                    title: "Logins"
                },
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
                }, maxWidth: '520px', height: '60vh'
            }} />
    );
};

export default Logins;