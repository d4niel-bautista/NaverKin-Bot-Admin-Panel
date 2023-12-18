import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from 'react';
import SaveAccount from './SaveAccount';
import MUINewWindow from '../MUINewWindow/MUINewWindow';

const AddAccountToolbarComponent = ({ categories, token, serverAPI, setAccounts }) => {
    const [openAddAccountWindow, setOpenAddAccountWindow] = useState(false);

    return (
        <>
            {openAddAccountWindow && (
                <MUINewWindow onClose={() => setOpenAddAccountWindow(false)}>
                    <SaveAccount action="add" categories={categories} token={token} serverAPI={serverAPI} setAccounts={setAccounts} />
                </MUINewWindow>
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