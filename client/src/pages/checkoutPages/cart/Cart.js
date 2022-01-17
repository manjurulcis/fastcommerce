import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { fetchCart } from "@actions/cartActions";
import CartItems from "./components/CartItems";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import LoadingButton from "@components/loading/LoadingButton";

const useStyles = makeStyles(theme => ({
  sticky: {
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
  price: {
    float: "right",
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto"
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  mb1: {
    marginBottom: theme.spacing(1)
  }
}));

const Cart = () => {
  const {
    cart,
    ui: { loadingUI }
  } = useSelector(state => state);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loadingUI === true) {
    return null;
  }

  if (cart.items_count === 0) {
    return <EmptyCart />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={8} xs={12}>
        <CartItems items={cart.items} editable />
        <Box
          className={classes.sticky}
          boxShadow={3}
          bgcolor="background.paper"
        >
          <LoadingButton
            className={classes.button}
            component={Link}
            to={"/order"}
            variant="contained"
            color="primary"
            size="large"
            display="inline"
          >
            Continue shopping
          </LoadingButton>
          <Typography
            variant="subtitle1"
            display="flex"
            className={classes.price}
          >
            {cart.total_price}$
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={4} xs={12} className={classes.mb1}>
        <CartSummary cart={cart} />
      </Grid>
    </Grid>
  );
};

export default Cart;
