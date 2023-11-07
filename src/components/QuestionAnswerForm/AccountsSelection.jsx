import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import AccountsSelectionDetails from './AccountsSelectionDetails';

const AccountsSelection = ({ open, handleClose, formType }) => {
    const [alert, setAlert] = useState({ display: 'none', severity: "", text: "" });
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    return (
        <Dialog open={open} maxWidth="50%">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                Accounts Selection
            </DialogTitle>
            <DialogContent>
                <Alert
                    severity={alert.severity !== "" ? alert.severity : "info"}
                    sx={{ display: alert.display }}
                >
                    {alert.text.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            {index !== alert.text.split("\n").length - 1 && <br />}
                        </span>
                    ))}
                </Alert>
                <AccountsSelectionDetails formType={formType} setAlert={setAlert} setDisableSubmitButton={setDisableSubmitButton} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    disabled={alert.severity === "error" || disableSubmitButton ? true : false}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountsSelection