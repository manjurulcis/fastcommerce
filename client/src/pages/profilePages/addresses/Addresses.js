import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AddressItem from "./components/AddressItem";
import CreateAddress from "./components/CreateAddress";
import CreateAddressButton from "./components/CreateAddress/CreateAddressButton";
import { fetchAddresses } from "@actions/profileActions/AddressActions";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

const Addresses = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.profile.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <Sidebar activeItem="addresses">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <div style={{ height: "280px" }}>
              <CreateAddressButton setOpen={setOpen} />
              <CreateAddress open={open} handleClose={() => setOpen(false)} />
            </div>
          </Grid>
          {addresses.map(address => (
            <Grid key={address.id} item md={6} xs={12}>
              <AddressItem address={address} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Sidebar>
  );
};

export default Addresses;
