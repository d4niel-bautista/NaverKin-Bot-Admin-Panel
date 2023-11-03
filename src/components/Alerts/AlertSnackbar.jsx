import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const AlertSnackbar = ({ open, onClose, autoHideDuration = 6000, severity = "info", description }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                sx={{ width: '40vw', maxWidth: '600px' }}
                severity={severity ? severity : 'info'}
                onClose={onClose}
            >
                {description}
            </Alert>
        </Snackbar>
    )
};

export default AlertSnackbar;