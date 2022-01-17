import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2),
    position: "-webkit-sticky",
    position: "sticky",
    top: theme.spacing(1)
  },
  right: {
    float: "right"
  },
  divider: {
    margin: theme.spacing(1)
  },
  control: {
    marginBottom: theme.spacing(2)
  }
}));

const CartSummary = ({ cart }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.control}>
        <Typography display="inline">
          Products price ({cart.items_count} product)
        </Typography>
        <Typography display="inline" className={classes.right}>
          {(cart.total_price + cart.total_customer_profit).toFixed(2)}$
        </Typography>
      </div>
      <div className={classes.control}>
        <Typography color="primary" display="inline">
          Products profit
        </Typography>
        <Typography color="primary" display="inline" className={classes.right}>
          {cart.total_customer_profit}$
        </Typography>
      </div>
      <div className={classes.control}>
        <Typography display="inline">Total price</Typography>
        <Typography display="inline" className={classes.right}>
          {cart.total_price}$
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div>
        <Typography variant="h6" align="center">
          The amount payable:
        </Typography>
        <Typography variant="h6" align="center">
          {cart.total_price}$
        </Typography>
      </div>
    </Paper>
  );
};

export default CartSummary;
