import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@components/layouts/DialogTitle";
import CreateAddress from "@pages/profilePages/addresses/components/CreateAddress";
import AddressItem from "@pages/profilePages/addresses/components/AddressItem";
import CreateAddressButton from "@pages/profilePages/addresses/components/CreateAddress/CreateAddressButton";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    "&:last-child": {
      marginBottom: theme.spacing(5)
    }
  },
  button: {
    borderWidth: "1px 0 0 0",
    border: "solid #e0e0e0"
  },
  createAddress: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const ChangeAddress = ({ setOpen, addresses, setAddress, open }) => {
  const [create, setCreate] = useState(false);
  const classes = useStyles();

  const handleClick = address => {
    setAddress(address);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullScreen
      PaperProps={{ style: { backgroundColor: "#f4f4f4" } }}
    >
      <Paper>
        <DialogTitle onClose={() => setOpen(false)}>Change address</DialogTitle>
      </Paper>
      <Paper className={classes.createAddress}>
        <CreateAddressButton noIcon setOpen={setCreate} />
        <CreateAddress open={create} handleClose={() => setCreate(false)} />
      </Paper>
      {addresses.map(address => (
        <Paper className={classes.paper}>
          <AddressItem address={address} />
          <Button
            onClick={() => handleClick(address)}
            className={classes.button}
            variant="outlined"
            fullWidth
          >
            Select this address
          </Button>
        </Paper>
      ))}
    </Dialog>
  );
};

export default ChangeAddress;
