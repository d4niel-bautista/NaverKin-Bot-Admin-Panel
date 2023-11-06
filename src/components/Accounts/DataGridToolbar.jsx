import { Grid } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import DeleteToolbarComponent from './DeleteToolbarComponent';

const DataGridToolbar = ({ rowSelectionModel, selectedUsernames }) => {
    return (
        <GridToolbarContainer>
            <Grid container columnSpacing={12} rowSpacing={2}>
                <Grid item xs={1}>
                    <GridToolbarExport printOptions={{ disableToolbarButton: true }} sx={{ fontWeight: 'bold' }} />
                </Grid>
                <Grid item xs={1}>
                    <DeleteToolbarComponent selectedRows={rowSelectionModel} usernames={selectedUsernames} />
                </Grid>
                <Grid item xs={12}>
                    <GridToolbarQuickFilter sx={{ marginLeft: 'auto' }} />
                </Grid>
            </Grid>
        </GridToolbarContainer>
    );
};

export default DataGridToolbar;