import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from 'react';
import NewWindow from 'react-new-window';
import SaveAccount from './SaveAccount';

const AddAccountToolbarComponent = ({ categories }) => {
    const [openAddAccountWindow, setOpenAddAccountWindow] = useState(false);

    return (
        <>
            {openAddAccountWindow && (
                <NewWindow onUnload={() => setOpenAddAccountWindow(false)}>
                    <SaveAccount categories={categories} />
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