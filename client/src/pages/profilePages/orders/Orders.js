import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import OrderItem from "./components/OrderItem";
import { fetchOrders } from "@actions/profileActions/orderActions";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
    overflowX: "auto"
  },
  header: {
    color: "black"
  }
}));

const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.profile.orders.orders);
  const loading = useSelector(state => state.ui.loadingUI);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  if (orders.length < 1) {
    return (
      <Typography className={classes.root} variant="h5">
        Your orders is empty
      </Typography>
    );
  }

  return (
    <Sidebar activeItem="orders">
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>id</TableCell>
              <TableCell className={classes.header} align="center">
                Order number
              </TableCell>
              <TableCell className={classes.header} align="center">
                Ordered at
              </TableCell>
              <TableCell className={classes.header} align="center">
                Total price
              </TableCell>
              <TableCell className={classes.header} align="center">
                Items count
              </TableCell>
              <TableCell className={classes.header} align="center">
                Shipping status
              </TableCell>
              <TableCell align="center" className={classes.header}>
                More detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Sidebar>
  );
};

export default Orders;
