import axios from "axios";

import { addNotif } from "../notifActions";
import {
  FETCH_ORDERS,
  FETCH_ORDER,
  CREATE_ORDER,
  START_LOADING_UI,
  STOP_LOADING_UI,
  START_LOADING_BUTTON,
  STOP_LOADING_BUTTON
} from "../../types";

export const fetchOrders = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.get("/api/orders/").then(response => {
    dispatch({ type: FETCH_ORDERS, payload: response.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

export const fetchOrder = id => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.get(`/api/orders/${id}/`).then(response => {
    dispatch({ type: FETCH_ORDER, payload: response.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

export const createOrder = (order, history) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios.post("/api/orders/", order).then(response => {
    dispatch({ type: CREATE_ORDER, payload: response.data });
    dispatch({ type: STOP_LOADING_BUTTON });
    history.push(`/profile/orders/${response.data.id}`);
    dispatch(
      addNotif({
        message: "Your order has been compeleted"
      })
    );
  });
};
