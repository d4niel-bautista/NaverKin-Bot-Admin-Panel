import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import ActivityToolbar from './ActivityToolbar';
const moment = require('moment');

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'question_url', headerName: 'Question URL', width: 150 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'content', headerName: 'Content', width: 300 },
    { field: 'postscript', headerName: 'Postscript', width: 120 },
    {
        field: 'date_answered', headerName: 'Date Answered', width: 160, type: 'date',
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD HH:mm:ss').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY H:mm:ss') : '';
        }
    },
    { field: 'status', headerName: 'Status', width: 80 },
];

const AnswerResponses = ({ answerResponses }) => {
    const [selected, setRowSelectionModel] = useState([]);

    const handleDelete = async () => {

    };

    return (
        <DataGrid
            columns={columns}
            rows={answerResponses}
            slots={{ toolbar: ActivityToolbar }}
            slotProps={{
                toolbar: {
                    selected,
                    handleDelete,
                    title: "Answer Responses"
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
                }, minWidth: '1000px', maxWidth: '50vw', height: '60vh'
            }} />
    );
};

export default AnswerResponses;