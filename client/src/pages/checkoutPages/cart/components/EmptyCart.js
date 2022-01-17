import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EmptyCart = () => {
  return (
    <Paper style={{ textAlign: "center" }}>
      <Typography style={{ padding: "30px" }} variant="h3">
        Your cart is empty
      </Typography>
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        color="secondary"
        component={Link}
        to="/products"
        size="large"
      >
        products
      </Button>
    </Paper>
  );
};

export default EmptyCart;
