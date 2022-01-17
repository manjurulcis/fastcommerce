import axios from "axios";

import { addNotif } from "../notifActions";
import {
  FETCH_FAVORITE_PRODUCTS,
  UPDATE_FAVORITE_PRODUCTS,
  START_LOADING_UI,
  STOP_LOADING_UI
} from "../../types";

export const fetchFavoriteProducts = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.get("/api/user/favorites-products/").then(response => {
    dispatch({ type: FETCH_FAVORITE_PRODUCTS, payload: response.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

export const updateFavoriteProducts = id => dispatch => {
  axios.post(`/api/user/favorites-products/update/${id}/`).then(response => {
    dispatch({ type: UPDATE_FAVORITE_PRODUCTS, payload: response.data });
    response.data.is_favorite_product
      ? dispatch(
          addNotif({
            message: "Added to your favorites",
            options: { variant: "info" }
          })
        )
      : dispatch(
          addNotif({
            message: "Removed from your favorites",
            options: { variant: "error" }
          })
        );
  });
};
