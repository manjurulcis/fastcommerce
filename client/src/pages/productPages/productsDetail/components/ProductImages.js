import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const useStyles = makeStyles(theme => ({
  image: {
    width: "100%",
    height: "100%",
    maxHeight: "500px",
    display: "block",
    margin: "0 auto",
    objectFit: "contain"
  }
}));

const ProductImages = ({ product }) => {
  const classes = useStyles();

  // List of just available product photos (remove nulls)
  const photos = [
    product.photo_main,
    product.photo_1,
    product.photo_2,
    product.photo_3,
    product.photo_4
  ].filter(Boolean);

  const params = {
    spaceBetween: 30,
    rebuildOnUpdate: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };

  return (
    <Swiper {...params}>
      {photos.map(photo => (
        <div key={product.id}>
          <img src={photo} alt={product.title} className={classes.image} />
        </div>
      ))}
    </Swiper>
  );
};

export default ProductImages;
