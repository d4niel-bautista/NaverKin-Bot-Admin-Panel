import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import AccountDetails from './AccountDetails';

const EditAccount = ({ open, onClose, account, setAccounts }) => {
  const [editAccount, setEditAccount] = useState(account);

  const handleFieldChange = (field, value) => {
    setEditAccount({ ...editAccount, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/v1/api/update_account", {
      method: "PATCH", body: JSON.stringify(editAccount),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      const data = await response.json();
      setAccounts(accounts => {
        const updatedAccountIndex = accounts.findIndex(account => account.id === editAccount.id);
        if (updatedAccountIndex !== -1) {
          accounts[updatedAccountIndex] = editAccount;
        }
        return [...accounts]
      });
      console.log(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent>
        <AccountDetails account={editAccount} onChange={handleFieldChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
