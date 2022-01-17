import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { fetchProducts } from "@actions/productActions";
import ProductItem from "./components/ProductItem";
import Pagination from "./components/Pagination";
import Ordering from "./components/Ordering";
import Filters from "./components/Filters";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

const Products = ({ history, location }) => {
  const products = useSelector(state => state.products.products);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(location.search));
  }, [location.search, dispatch]);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item md={3} xs={12}>
        <Filters />
      </Grid>
      <Grid item md xs={12}>
        <Ordering location={location} />
        <Grid container spacing={1}>
          {products.map(product => (
            <Grid key={product.id} item md={3} xs={12}>
              <ProductItem product={product} history={history} />
            </Grid>
          ))}
        </Grid>
        <Pagination location={location} />
      </Grid>
    </Grid>
  );
};

export default Products;
