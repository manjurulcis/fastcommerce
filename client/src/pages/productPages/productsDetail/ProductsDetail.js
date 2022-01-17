import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Clipboard from "react-clipboard.js";
import CloseIcon from "@material-ui/icons/Close";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import teal from "@material-ui/core/colors/teal";

import { fetchProduct } from "@actions/productActions";
import { addToCart } from "@actions/cartActions";
import { updateFavoriteProducts } from "@actions/profileActions/FavoriteProductsActions";
import { addNotif } from "@actions/notifActions";
import LoadingButton from "@components/loading/LoadingButton";
import ProductImages from "./components/ProductImages";
import SizeGuide from "./components/SizeGuide";

const useStyles = makeStyles(theme => ({
  mt1: {
    marginTop: theme.spacing(1)
  },
  button: {
    width: "98%",
    [theme.breakpoints.down("sm")]: {
      width: "93%"
    }
  },
  buttonGreen: {
    color: theme.palette.common.white,
    backgroundColor: teal[500],
    "&:hover": {
      backgroundColor: teal[600]
    }
  },
  description: {
    whiteSpace: "pre-line"
  },
  sizeButton: {
    marginLeft: theme.spacing(1)
  },
  mb2: {
    marginBottom: theme.spacing(2)
  },
  img: {
    border: "1px solid gray",
    padding: "5px",
    marginRight: "10px",
    objectFit: "contain"
  },
  fixed: {
    position: "fixed",
    zIndex: 10,
    display: "flex",
    bottom: 0,
    left: 0,
    padding: "12px",
    width: "100%"
  },
  right: {
    float: "right"
  }
}));

const ProductsDetail = ({ match, history }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const {
    product,
    product: { colors, sizes }
  } = useSelector(state => state.products);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [orderSize, setOrderSize] = useState();
  const classes = useStyles();
  // Size guide dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOrderSize(product.default_size);
  }, [product]);

  useEffect(() => {
    dispatch(fetchProduct(slug));
  }, [dispatch, slug]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart(product.id, orderSize, history));
      return;
    }
    history.push("/login");
  };

  const handleAddToFavProducts = () => {
    if (isAuthenticated) {
      dispatch(updateFavoriteProducts(product.id));
      return;
    }
    history.push("/login");
  };

  return (
    <div className={classes.mt1}>
      <Clipboard
        onSuccess={() =>
          dispatch(
            addNotif({
              message: "product link copied",
              options: {
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center"
                }
              }
            })
          )
        }
        component={IconButton}
        data-clipboard-text={window.location.href}
      >
        <FileCopyIcon />
      </Clipboard>
      <IconButton onClick={handleAddToFavProducts} color="secondary">
        {product.is_favorite_product === false ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon />
        )}
      </IconButton>
      <IconButton onClick={() => history.goBack()} className={classes.right}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} className={classes.mb2}>
          <ProductImages product={product} />
        </Grid>
        <Grid item md xs={12} className={classes.mb2}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          {product.available === false ? (
            <Typography gutterBottom color="error" variant="h5" component="h2">
              unavailable
            </Typography>
          ) : (
            <div className={classes.mb2}>
              {product.discount_price ? (
                <React.Fragment>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="error"
                    component="h2"
                  >
                    {product.discount_percent}%
                  </Typography>
                  <Typography gutterBottom variant="h4" component="h2">
                    <del>{product.price}</del> {product.discount_price}
                  </Typography>
                </React.Fragment>
              ) : (
                <Typography gutterBottom variant="h4" component="h2">
                  {product.price}
                </Typography>
              )}
            </div>
          )}
          {sizes.length !== 0 && (
            <div className={classes.mb2}>
              <Typography display="inline" variant="h6">
                sizes:
              </Typography>
              <Button
                onClick={() => setOpen(true)}
                className={classes.right}
                variant="outlined"
              >
                Size Guide
              </Button>
              <SizeGuide open={open} setOpen={setOpen} sizes={sizes} />
              <div className={classes.mt1}>
                {sizes.map(size => (
                  <Button
                    className={classes.sizeButton}
                    key={size.id}
                    variant={orderSize === size.id ? "contained" : "outlined"}
                    size="small"
                    color="secondary"
                    onClick={() => setOrderSize(size.id)}
                    disabled={!size.available}
                  >
                    {size.size}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(colors) && colors.length ? (
            <div className={classes.mb2}>
              <Typography variant="h6">colors:</Typography>
              {colors.map(color => (
                <Link key={color.id} to={`/products/${color.slug}`}>
                  <img
                    className={classes.img}
                    height="80px"
                    width="70px"
                    src={color.photo_main}
                    alt={color.title}
                  />
                </Link>
              ))}
            </div>
          ) : null}
          {product.available === true && (
            <Paper className={classes.fixed}>
              <LoadingButton
                fullWidth
                className={`${classes.button} ${classes.buttonGreen}`}
                onClick={handleAddToCart}
                variant="contained"
                size="large"
              >
                Add to cart
              </LoadingButton>
            </Paper>
          )}
          <Typography className={classes.description}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsDetail;
