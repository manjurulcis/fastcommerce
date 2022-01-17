import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

import { createOrder } from "@actions/profileActions/orderActions";
import { fetchCart } from "@actions/cartActions";
import { fetchAddresses } from "@actions/profileActions/AddressActions";
import SelectAddress from "./components/SelectAddress";
import CartItemsSummary from "../cart/components/CartItems";
import CartSummary from "../cart/components/CartSummary";
import LoadingButton from "@components/loading/LoadingButton";

const useStyles = makeStyles(theme => ({
  mt1: {
    marginTop: theme.spacing(1)
  },
  m1: {
    margin: theme.spacing(1)
  },
  sticky: {
    marginTop: "8px",
    position: "-webkit-sticky",
    position: "sticky",
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      zIndex: 9,
      display: "flex",
      width: "100%",
      marginLeft: "-8px",
      bottom: "56px"
    }
  },
  button: {
    margin: theme.spacing(1),
    float: "right"
  },
  right: {
    marginLeft: "auto"
  }
}));

const Order = ({ history }) => {
  const {
    cart,
    ui: { loadingUI },
    profile: { addresses }
  } = useSelector(state => state);
  const [address, setAddress] = useState(addresses[0] || "");
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (cart.items_count === 0) {
      history.push("/cart");
    }
  }, [cart.items_count]);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    setAddress(addresses[0] || "");
  }, [addresses]);

  const handleClick = () => {
    const order = {
      reciver: {
        full_name: address.reciver_full_name,
        phone_number: address.reciver_phone_number,
        address: `${address.state} ${address.city} ${address.postal_address} ${address.postal_code}`
      },
      purchase_invoice: checked
    };
    dispatch(createOrder(order, history));
  };

  if (loadingUI === true) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={8} xs={12}>
        <SelectAddress
          setAddress={setAddress}
          address={address}
          addresses={addresses}
        />
        <CartItemsSummary items={cart.items} />
        <Paper className={classes.mt1}>
          <FormControlLabel
            className={classes.m1}
            control={
              <Checkbox
                color="primary"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />
            }
            label="Send purchase invoice"
          />
        </Paper>
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          className={classes.sticky}
        >
          <Grid container spacing={1}>
            <Grid item md={3}>
              <Button
                className={classes.m1}
                component={Link}
                to="/cart"
                variant="outlined"
              >
                Back to cart
              </Button>
            </Grid>
            <Grid item md={5} xs className={classes.right}>
              <LoadingButton
                className={classes.button}
                variant="contained"
                onClick={handleClick}
                color="primary"
                fullWidth
              >
                Check out
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <CartSummary cart={cart} />
      </Grid>
    </Grid>
  );
};

export default Order;
