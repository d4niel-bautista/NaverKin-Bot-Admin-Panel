import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import ActivityToolbar from './ActivityToolbar';
const moment = require('moment');

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'url', headerName: 'Question URL', width: 150 },
    { field: 'title', headerName: 'Title', width: 120 },
    { field: 'author', headerName: 'Author', width: 120 },
    { field: 'respondent', headerName: 'Respondent', width: 120 },
    {
        field: 'date_posted', headerName: 'Date Posted', width: 160, type: 'date',
        valueGetter: (params) => {
            return params.value ? moment(params.value, 'YYYY-MM-DD HH:mm:ss').toDate() : '';
        },
        valueFormatter: (params) => {
            return params.value ? moment(params.value).format('DD/MM/YYYY H:mm:ss') : '';
        }
    },
    { field: 'status', headerName: 'Status', width: 120 },
];

const QuestionPosts = ({ questionPosts }) => {
    const [selected, setRowSelectionModel] = useState([]);

    const handleDelete = async () => {

    };

    return (
        <DataGrid
            columns={columns}
            rows={questionPosts}
            slots={{ toolbar: ActivityToolbar }}
            slotProps={{
                toolbar: {
                    selected,
                    handleDelete,
                    title: "Question Posts"
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
                }, minWidth: '800px', maxWidth: '35vw', height: '60vh'
            }} />
    );
};

export default QuestionPosts;