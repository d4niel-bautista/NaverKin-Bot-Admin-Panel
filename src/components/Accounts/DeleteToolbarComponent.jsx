import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertDialog from '../Alerts/AlertDialog';

const DeleteToolbarComponent = ({ selectedRows, usernames }) => {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, title: 'Are you sure you want to delete the following accounts? This action is irreversible.', description: '' });
    const description = usernames.join('\n');

    return (
        <>
            <Button
                color='secondary'
                size='small'
                startIcon={<DeleteOutlineIcon />}
                sx={{ fontWeight: 'bold' }}
                onClick={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: true, description: description }))}
                disabled={!selectedRows.length}
            >
                DELETE
            </Button>
            <AlertDialog alertDialog={deleteDialog} handleClose={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }))} />
        </>
    );
};

export default DeleteToolbarComponent;