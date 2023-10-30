import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const AlertMessage = ({ alertMessage, setAlertMessage }) => {
    return (
        <Collapse in={alertMessage["open"]}>
            <Alert
                severity={alertMessage.severity ? alertMessage.severity : "info"}
                action={
                    <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => setAlertMessage(alert => ({ ...alert, open: false }))}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>}
                sx={{ mb: 2 }}
            >
                <AlertTitle sx={{fontWeight: 'bold'}}>{alertMessage.title}</AlertTitle>
                {alertMessage.description}
            </Alert>
        </Collapse>
    )
}

export default AlertMessage