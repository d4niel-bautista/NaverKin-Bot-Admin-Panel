import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'

const AlertDialog = ({ handleClose, alertDialog, handleConfirm }) => {
  const descriptionLines = alertDialog.description.split('\n');

  return (
    <Dialog
      open={alertDialog.open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {alertDialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {descriptionLines.length > 0 && (
            <>
              {descriptionLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== descriptionLines.length - 1 && <br />}
                </span>
              ))}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog