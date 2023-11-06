import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import AccountsSelectionDetails from './AccountsSelectionDetails';

const AccountsSelection = ({ open, handleClose, formType }) => {
    const [alert, setAlert] = useState({ severity: "", text: "" });

    return (
        <Dialog open={open} maxWidth="50%">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                Accounts Selection
            </DialogTitle>
            <DialogContent>
                <Alert
                    severity={alert.severity ? alert.severity : "info"}
                    sx={{ marginBottom: '2em' }}
                >
                    {alert.text}
                </Alert>
                <AccountsSelectionDetails formType={formType} setAlert={setAlert} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountsSelection