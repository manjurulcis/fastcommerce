import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import CartItem from "./CartItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

const CartItems = ({ items, editable }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {items.map(item => (
        <CartItem key={item.id} item={item} editable={editable} />
      ))}
    </Paper>
  );
};

CartItems.defaultProps = {
  editable: false
};

export default CartItems;
