import {
  START_LOADING_UI,
  STOP_LOADING_UI,
  START_LOADING_BUTTON,
  STOP_LOADING_BUTTON
} from "../types";

const initialState = {
  loadingUI: null,
  loadingButton: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_UI:
      return { ...state, loadingUI: true };
    case STOP_LOADING_UI:
      return { ...state, loadingUI: false };
    case START_LOADING_BUTTON:
      return { ...state, loadingButton: true };
    case STOP_LOADING_BUTTON:
      return { ...state, loadingButton: false };
    default:
      return state;
  }
}
