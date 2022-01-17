import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ArrowIcon from "@material-ui/icons/ArrowForward";

const CartItem = ({ order }) => {
  return (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell align="center">{order.code}</TableCell>
      <TableCell align="center">
        {moment(order.created_at).format("MMM Do YY")}
      </TableCell>
      <TableCell align="center">{order.total_price}$</TableCell>
      <TableCell align="center">{order.items_count}</TableCell>
      <TableCell align="center">{order.shipping_status}</TableCell>
      <TableCell align="center">
        <IconButton component={Link} to={`/profile/orders/${order.id}`}>
          <ArrowIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
