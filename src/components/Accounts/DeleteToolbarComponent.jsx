import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertDialog from '../Alerts/AlertDialog';
import { useOutletContext } from 'react-router-dom';
import { SERVER } from '../../App';

const DeleteToolbarComponent = ({ selectedRows, usernames, accounts, setAccounts, setSnackbar }) => {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, title: 'Are you sure you want to delete the following accounts? This action is irreversible.', description: '' });
    const [token] = useOutletContext();
    const description = usernames.join('\n');

    const handleDelete = async () => {
        const response = await fetch(SERVER + "/delete_account", {
            method: "DELETE",
            body: JSON.stringify(selectedRows),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        const data = await response.json();
        if (response.ok) {
            if (data.failed_delete.length > 0) {
                const failed_delete = data.failed_delete.join(', ');
                setSnackbar({
                    open: true,
                    severity: "error",
                    description: "Failed to delete: " + failed_delete
                });
            } else {
                const success_delete = data.success_delete.length;
                setSnackbar({
                    open: true,
                    severity: "success",
                    description: "Successfully deleted " + success_delete.toString() + " account" + (success_delete > 1 ? "s" : "") + "."
                });
            }
        } else if (response.status === 404) {
            setSnackbar({
                open: true,
                severity: "error",
                description: data.detail
            });
        }

        setAccounts(accounts.filter((account) => !selectedRows.includes(account.id)));
        setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }));
    };

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
            <AlertDialog alertDialog={deleteDialog} handleClose={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }))} handleConfirm={handleDelete} />
        </>
    );
};

export default DeleteToolbarComponent;