// src/components/ConfirmDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog/index.js';
import DialogActions from '@mui/material/DialogActions/index.js';
import DialogContent from '@mui/material/DialogContent/index.js';
import DialogContentText from '@mui/material/DialogContentText/index.js';
import DialogTitle from '@mui/material/DialogTitle/index.js';
import Button from '@mui/material/Button/index.js';


const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
