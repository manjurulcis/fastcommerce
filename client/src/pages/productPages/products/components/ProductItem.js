import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    height: "365px"
  },
  height: {
    height: "100%"
  },
  image: {
    objectFit: "contain",
    maxHeight: "200px",
    maxWidth: "100%",
    height: "100%",
    width: "100%"
  }
}));

const ProductItem = ({ product, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card
        className={classes.height}
        onClick={() => history.push(`/products/${product.slug}`)}
      >
        <CardActionArea className={classes.height}>
          <div className={classes.imageWrap}>
            <CardMedia
              component="img"
              className={classes.image}
              src={product.photo_main}
              title={product.title}
            />
          </div>
          <CardContent>
            <Typography noWrap gutterBottom variant="subtitle1" component="h2">
              {product.title}
            </Typography>
            {product.available === false ? (
              <Typography
                gutterBottom
                color="error"
                variant="h5"
                component="h2"
              >
                unavailable
              </Typography>
            ) : (
              <React.Fragment>
                {product.discount_price ? (
                  <React.Fragment>
                    <Typography
                      gutterBottom
                      variant="h6"
                      color="error"
                      component="h2"
                    >
                      {product.discount_percent}%
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      <del>{product.price}</del> {product.discount_price}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.price}
                  </Typography>
                )}
              </React.Fragment>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductItem;
