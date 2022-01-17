import axios from "axios";

import { addNotif } from "./notifActions";
import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  START_LOADING_UI,
  STOP_LOADING_UI,
  START_LOADING_BUTTON,
  STOP_LOADING_BUTTON
} from "../types";

export const fetchCart = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.get("/api/cart/").then(response => {
    dispatch({ type: FETCH_CART, payload: response.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

export const addToCart = (productId, sizeId, history) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post("/api/cart/", { product: productId, size: sizeId })
    .then(response => {
      dispatch({ type: ADD_TO_CART, payload: response.data });
      dispatch(fetchCart());
      dispatch({ type: STOP_LOADING_BUTTON });
      history.push("/cart");
      dispatch(
        addNotif({
          message: "Item has been added to your cart",
          options: { variant: "info" }
        })
      );
    });
};

export const removeFromCart = (id, handleClose) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios.delete(`/api/cart/${id}/`).then(response => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    dispatch(fetchCart());
    dispatch({ type: STOP_LOADING_BUTTON });
    handleClose();
    dispatch(
      addNotif({
        message: "Item has been removed",
        options: { variant: "error" }
      })
    );
  });
};

export const updateQuantity = (id, quantity) => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.put(`/api/cart/${id}/`, { quantity }).then(response => {
    dispatch(fetchCart());
  });
};
