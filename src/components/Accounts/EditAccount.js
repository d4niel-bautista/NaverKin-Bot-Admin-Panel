import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

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
        <TextField
          label="Username"
          fullWidth
          value={editedAccount.username || ''}
          onChange={(e) => handleFieldChange('username', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          value={editedAccount.password || ''}
          onChange={(e) => handleFieldChange('password', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Recovery Email"
          fullWidth
          value={editedAccount.recoveryEmail || ''}
          onChange={(e) => handleFieldChange('recoveryEmail', e.target.value)}
          margin="normal"
        />
        {/* Add more fields for editing other account details */}
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
