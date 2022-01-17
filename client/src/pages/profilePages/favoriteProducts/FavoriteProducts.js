import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { fetchFavoriteProducts } from "@actions/profileActions/FavoriteProductsActions";
import ProductItem from "@pages/productPages/products/components/ProductItem";
import Sidebar from "../Sidebar";

const FavoriteProducts = ({ history }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.profile.favoriteProducts);
  const loading = useSelector(state => state.ui.loadingUI);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  if (products.length < 1) {
    return (
      <Typography style={{ marginTop: "10px" }} variant="h5">
        Your favorite product is empty
      </Typography>
    );
  }

  return (
    <Sidebar activeItem="favProducts">
      <div style={{ marginTop: "30px" }}>
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid key={product.id} item md={3} xs={12}>
              <ProductItem product={product} history={history} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Sidebar>
  );
};

export default FavoriteProducts;
