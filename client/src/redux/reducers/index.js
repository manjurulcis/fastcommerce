import { combineReducers } from "redux";

import authReducer from "./authReducer";
import notiferReducer from "./notifReducer";
import uiReducer from "./uiReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  auth: authReducer,
  notif: notiferReducer,
  ui: uiReducer,
  profile: profileReducer,
  products: productReducer,
  cart: cartReducer
});
