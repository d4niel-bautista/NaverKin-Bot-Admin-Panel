import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useRef, useState } from 'react'
import AccountsSelectionDetails from './AccountsSelectionDetails';

const AccountsSelection = ({ open, handleClose, formType, handleSubmit }) => {
    const [alert, setAlert] = useState({ display: 'none', severity: "", text: "" });
    const selectedAccounts = useRef({ 'question': 0, 'answer_advertisement': 0, 'answer_exposure': 0 });
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    const onSubmit = (e) => {
        handleClose();
        handleSubmit(e, selectedAccounts.current);
    };

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
                <AccountsSelectionDetails selectedAccounts={selectedAccounts} formType={formType} setAlert={setAlert} setDisableSubmitButton={setDisableSubmitButton} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    disabled={alert.severity === "error" || disableSubmitButton ? true : false}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountsSelection