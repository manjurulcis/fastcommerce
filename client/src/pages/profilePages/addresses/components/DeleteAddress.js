import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@components/layouts/DialogTitle";
import LoadingButton from "@components/loading/LoadingButton";
import { deleteAddress } from "@actions/profileActions/AddressActions";

const DeleteAddress = ({ classes, id, onClose }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = () => {
    dispatch(deleteAddress(id, handleClose));
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        size="small"
        className={classes.button}
        variant="contained"
        color="secondary"
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle onClose={handleClose}>Delete address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this address?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            No, Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
          >
            Yes, Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteAddress;
