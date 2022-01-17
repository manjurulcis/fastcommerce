import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import UpdateCartItem from "./UpdateCartItem";

const useStyles = makeStyles(theme => ({
  img: {
    width: "125px",
    height: "125px",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      width: "104px",
      height: "104px"
    }
  },
  m2: {
    margin: theme.spacing(2)
  },
  mt1: {
    marginTop: theme.spacing(1)
  },
  link: {
    textDecoration: "none"
  },
  price: {
    float: "right"
  },
  quantity: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 3, 2)
    }
  }
}));

const getPrice = product => (
  <React.Fragment>
    {product.discount_price ? (
      <Typography display="inline" variant="body1">
        <del style={{ color: "grey" }}>{product.price}$</del>{" "}
        {product.discount_price}$
      </Typography>
    ) : (
      <Typography display="inline" variant="body1">
        {product.price}$
      </Typography>
    )}
  </React.Fragment>
);

const CartItem = ({ editable, item, item: { product } }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const QuantityAndPrice = () => (
    <div className={classes.quantity}>
      {editable ? (
        <UpdateCartItem
          id={item.id}
          available_count={item.size.available_count}
          quantity={item.quantity}
        />
      ) : (
        <Typography display="inline">Quantity: {item.quantity}</Typography>
      )}
      <Typography className={classes.price} variant="h6" display="inline">
        {item.total_price}$
      </Typography>
    </div>
  );

  return (
    <React.Fragment>
      <Grid container>
        <Grid className={classes.m2} alignContent="center" item md={2}>
          <Link to={`/products/${product.slug}`}>
            <img
              alt={product.slug}
              className={classes.img}
              src={product.photo_main}
            />
          </Link>
        </Grid>
        <Grid className={classes.m2} item md xs>
          <Typography
            className={classes.link}
            color="inherit"
            component={Link}
            to={`/products/${product.slug}`}
          >
            {product.title}
          </Typography>
          <Typography className={classes.mt1} variant="subtitle1">
            Size: {item.size.size}
          </Typography>
          <Typography className={classes.mt1} variant="subtitle1">
            Price: {getPrice(product)}
          </Typography>
          {!matches && <QuantityAndPrice />}
        </Grid>
      </Grid>
      {matches && <QuantityAndPrice />}
      <Divider />
    </React.Fragment>
  );
};

export default CartItem;
