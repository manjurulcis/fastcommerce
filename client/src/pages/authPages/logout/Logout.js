import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import { logout } from "@actions/authActions";
import DialogTitle from "@components/layouts/DialogTitle";

const Logout = ({ history }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle onClose={handleClose}>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          No, Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Yes, Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
