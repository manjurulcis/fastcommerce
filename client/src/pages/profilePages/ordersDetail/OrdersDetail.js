import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { fetchOrder } from "@actions/profileActions/orderActions";
import CartItemsSummary from "@pages/checkoutPages/cart/components/CartItems";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(theme => ({
  header: {
    margin: "10px 0",
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2)
  },
  iconButton: {
    marginRight: theme.spacing(1)
  },
  subtitle: {
    display: "block",
    fontSize: ".857rem"
  }
}));

const OrdersDetail = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const order = useSelector(state => state.profile.orders.order);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch]);

  return (
    <Sidebar activeItem="orders">
      <div className={classes.header}>
        <IconButton
          color="inherit"
          component={Link}
          to="/profile/orders"
          className={classes.iconButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography display="inline" variant="h5">
          Order {order.code}
          <span className={classes.subtitle}>
            Ordered at {moment(order.created_at).format("MMM Do YY")}
          </span>
        </Typography>
      </div>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Reciver:</Typography>
            <Typography variant="h6">
              {order.reciver && order.reciver.full_name}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Reciver phone number:</Typography>
            <Typography variant="h6">
              {order.reciver && order.reciver.phone_number}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Reciver postal address:</Typography>
            <Typography variant="h6">
              {order.reciver && order.reciver.address}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Items count:</Typography>
            <Typography variant="h6">
              {order.cart && order.cart.items_count}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Shpping status:</Typography>
            <Typography variant="h6">{order.shipping_status}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Ordered at:</Typography>
            <Typography variant="h6">
              {moment(order.created_at).format("MMM Do YY")}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Purchase invoice:</Typography>
            <Typography variant="h6">
              {order.purchase_invoice ? "yes" : "no"}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body2">Total price:</Typography>
            <Typography variant="h6">
              {order.cart && order.cart.total_price}$
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {order.cart && <CartItemsSummary items={order.cart.items} />}
    </Sidebar>
  );
};

export default OrdersDetail;
