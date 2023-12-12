import { Grid } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import DeleteToolbarComponent from './DeleteToolbarComponent';
import AddAccountToolbarComponent from './AddAccountToolbarComponent';

const DataGridToolbar = (props) => {
    return (
        <GridToolbarContainer>
            <Grid container columnSpacing={12} rowSpacing={2}>
                <Grid item xs={12}>
                    <GridToolbarExport printOptions={{ disableToolbarButton: true }} sx={{ fontWeight: 'bold' }} />
                    <AddAccountToolbarComponent />
                    <DeleteToolbarComponent
                        selectedRows={props.rowSelectionModel}
                        usernames={props.selectedUsernames}
                        accounts={props.accounts}
                        setAccounts={props.setAccounts}
                        setSnackbar={props.setSnackbar}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GridToolbarQuickFilter sx={{ marginLeft: 'auto' }} />
                </Grid>
            </Grid>
        </GridToolbarContainer>
    );
};

export default DataGridToolbar;