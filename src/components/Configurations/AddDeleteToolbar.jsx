import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertDialog from '../Alerts/AlertDialog';

const AddDeleteToolbar = ({ selected, handleAdd }) => {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, title: 'Are you sure you want to delete the following? This action is irreversible.', description: '' });
    const description = selected.join('\n');

    const submitDelete = async () => {
        setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }));
    };

    return (
        <>
            <GridToolbarContainer sx={{ marginBottom: 2 }}>
                <Button
                    color="primary"
                    size='small'
                    startIcon={<AddIcon />}
                    sx={{ fontWeight: 'bold' }}
                    onClick={handleAdd}
                >
                    ADD
                </Button>
                <Button
                    color='secondary'
                    size='small'
                    startIcon={<DeleteOutlineIcon />}
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: true, description: description }))}
                    disabled={!selected.length}
                >
                    DELETE
                </Button>
            </GridToolbarContainer >
            <AlertDialog alertDialog={deleteDialog} handleClose={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }))} handleConfirm={submitDelete} />
        </>
    );
};

export default AddDeleteToolbar;