import React, { useEffect, useRef, useState } from 'react';
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
import { useOutletContext } from 'react-router-dom';
import AlertDialog from '../Alerts/AlertDialog';

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
const TableRowComponent = ({ account, handleEditAccount, handleDeleteDialog }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleCloseMenu();
        handleDeleteDialog(account.id, account.username);
    };

    const editAccount = () => {
        handleCloseMenu();
        handleEditAccount(account);
    };

    return (
        <TableRow key={account.id}>
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
                    <MenuItem onClick={editAccount}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

const Accounts = () => {
    const [editModalOpen, setEditModalOpen] = useState(false); // State to control the edit modal
    const [editAccount, setEditAccount] = useState({}); // State to store edited account data
    const deleteAccount = useRef({ id: 0, username: "" });
    const [accounts, setAccounts] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, title: "Delete Account", description: "" })
    const [token] = useOutletContext();

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch("http://localhost:8000/v1/api/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        }
        fetchAccounts();
    }, []);

    const handleEditAccount = (account) => {
        setEditAccount(account);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleDeleteDialog = (id, username) => {
        deleteAccount.current = { id, username };
        setDeleteDialog((deleteDialog) => (
            {
                ...deleteDialog,
                description: `Are you sure you want to delete "${username}" account?\nThis action is irreversible.`,
                open: true,
            }
        ));
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setDeleteDialog((deleteDialog) => (
            {
                ...deleteDialog,
                open: false,
            }
        ));
        console.log(deleteAccount.current.username);
    }

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
                                        key={account.id}
                                        account={account}
                                        handleEditAccount={handleEditAccount}
                                        handleDeleteDialog={handleDeleteDialog}
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
                    account={editAccount}
                    setAccounts={setAccounts}
                    token={token}
                />
            )}
            <AlertDialog
                alertDialog={deleteDialog}
                handleClose={() => setDeleteDialog(deleteDialog => ({ ...deleteDialog, open: false }))}
                handleConfirm={handleDeleteAccount} />
        </div>
    );
};

export default Accounts;