import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import EditAccount from './EditAccount';

const headerCellStyle = {
    backgroundColor: '#333',
    color: 'white',
    fontSize: '16px',
    textAlign: 'center',
};

const contentCellStyle = {
    fontSize: '14px',
};

// Create a separate TableRowComponent
const TableRowComponent = ({ account, handleEditAccount }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow key={account.username}>
            <TableCell style={contentCellStyle}>{account.username}</TableCell>
            <TableCell style={contentCellStyle}>{account.password}</TableCell>
            <TableCell style={contentCellStyle}>{account.recovery_email}</TableCell>
            <TableCell style={contentCellStyle}>{account.name}</TableCell>
            <TableCell style={contentCellStyle}>{account.date_of_birth}</TableCell>
            <TableCell style={contentCellStyle}>{account.gender}</TableCell>
            <TableCell style={contentCellStyle}>{account.mobile_no}</TableCell>
            <TableCell style={contentCellStyle}>{account.account_url}</TableCell>
            <TableCell style={contentCellStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenMenu}
                >
                    Actions
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => handleEditAccount(account)}>Edit</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

const Accounts = () => {
    const [editModalOpen, setEditModalOpen] = useState(false); // State to control the edit modal
    const [editedAccount, setEditedAccount] = useState({}); // State to store edited account data
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch("http://localhost:8000/v1/api/accounts", { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        }
        fetchAccounts();
    }, []);

    const handleEditAccount = (account) => {
        setEditedAccount(account);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleSaveEdit = (editedData) => {
        // Handle saving the edited account data here
        // You can update the account data in your accounts array or send it to a server API
        // For this example, we'll simply close the modal
        handleCloseEditModal();
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="Account table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerCellStyle}>Username</TableCell>
                            <TableCell style={headerCellStyle}>Password</TableCell>
                            <TableCell style={headerCellStyle}>Recovery Email</TableCell>
                            <TableCell style={headerCellStyle}>Name</TableCell>
                            <TableCell style={headerCellStyle}>Date of Birth</TableCell>
                            <TableCell style={headerCellStyle}>Gender</TableCell>
                            <TableCell style={headerCellStyle}>Mobile Number</TableCell>
                            <TableCell style={headerCellStyle}>Profile URL</TableCell>
                            <TableCell style={headerCellStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length ?
                            accounts.map((account) => {
                                return (
                                    <TableRowComponent
                                        key={account.username}
                                        account={account}
                                        handleEditAccount={handleEditAccount}
                                    />
                                );
                            }) :
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Typography textAlign={'center'} fontStyle={'italic'}>No available accounts.</Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {editModalOpen && (
                <EditAccount
                    open={editModalOpen}
                    onClose={handleCloseEditModal}
                    account={editedAccount}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default Accounts;
