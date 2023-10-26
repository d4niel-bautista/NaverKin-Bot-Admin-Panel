import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import AccountDetails from './AccountDetails';

const EditAccount = ({ open, onClose, account, onSave }) => {
  const [editedAccount, setEditedAccount] = useState(account);

  const handleFieldChange = (field, value) => {
    setEditedAccount({ ...editedAccount, [field]: value });
  };

  const handleSave = () => {
    onSave(editedAccount);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent>
        <AccountDetails account={editedAccount} onChange={handleFieldChange} />
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
