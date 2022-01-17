import axios from "axios";

import {
  FETCH_ADDRESSES,
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  START_LOADING_UI,
  STOP_LOADING_UI,
  START_LOADING_BUTTON,
  STOP_LOADING_BUTTON
} from "../../types";
import { addNotif } from "../notifActions";

export const fetchAddresses = () => dispatch => {
  dispatch({ type: START_LOADING_UI });
  axios.get("/api/user/addresses/").then(response => {
    dispatch({ type: FETCH_ADDRESSES, payload: response.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

export const createAddress = (address, setErrors, handleClose) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .post("/api/user/addresses/", address)
    .then(response => {
      dispatch({ type: CREATE_ADDRESS, payload: response.data });
      handleClose();
      dispatch(addNotif({ message: "Address has been created" }));
      dispatch({ type: STOP_LOADING_BUTTON });
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};

export const deleteAddress = (id, handleClose) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios.delete(`/api/user/addresses/${id}/`).then(() => {
    dispatch({ type: DELETE_ADDRESS, payload: id });
    dispatch({ type: STOP_LOADING_BUTTON });
    handleClose();
    dispatch(
      addNotif({
        message: "Address has been deleted",
        options: { variant: "error" }
      })
    );
  });
};

export const updateAddress = (
  address,
  id,
  setErrors,
  handleClose
) => dispatch => {
  dispatch({ type: START_LOADING_BUTTON });
  axios
    .put(`/api/user/addresses/${id}/`, address)
    .then(response => {
      dispatch({ type: UPDATE_ADDRESS, id, payload: response.data });
      dispatch({ type: STOP_LOADING_BUTTON });
      handleClose();
      dispatch(
        addNotif({
          message: "Address was updated",
          options: { variant: "info" }
        })
      );
    })
    .catch(error => {
      setErrors(error.response.data);
      dispatch({ type: STOP_LOADING_BUTTON });
    });
};
