import { Button, Grid, Typography } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState } from 'react';
import AlertDialog from '../Alerts/AlertDialog';

const ActivityToolbar = ({ selected, handleDelete, title, component }) => {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, title: 'Are you sure you want to delete? This action is irreversible.', description: '' });

    const submitDelete = async () => {
        setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }));
        handleDelete();
    };

    return (
        <>
            <GridToolbarContainer>
                <Grid container columnSpacing={12} rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {title &&
                            <Typography variant="h6" noWrap marginLeft={2} marginTop={1}>
                                {title}
                            </Typography>
                        }
                        {component && component}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Button
                            color='secondary'
                            size='small'
                            startIcon={<DeleteOutlineIcon />}
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: true }))}
                            disabled={!selected.length}
                        >
                            DELETE
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <GridToolbarQuickFilter sx={{ marginLeft: 'auto' }} />
                    </Grid>
                </Grid>
            </GridToolbarContainer >
            <AlertDialog alertDialog={deleteDialog} handleClose={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }))} handleConfirm={submitDelete} />
        </>
    );
};

export default ActivityToolbar;