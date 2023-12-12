import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from 'react';
import NewWindow from 'react-new-window';

const AddAccountToolbarComponent = () => {
    const [openAddAccountWindow, setOpenAddAccountWindow] = useState(false);

    return (
        <>
            {openAddAccountWindow && (
                <NewWindow onUnload={() => setOpenAddAccountWindow(false)}>
                    <h1>Save Account</h1>
                </NewWindow>
            )}
            <Button
                color='primary'
                size='small'
                startIcon={<PersonAddIcon />}
                sx={{ fontWeight: 'bold' }}
                onClick={() => setOpenAddAccountWindow(true)}
            >
                ADD ACCOUNT
            </Button>
        </>
    );
};

export default AddAccountToolbarComponent;