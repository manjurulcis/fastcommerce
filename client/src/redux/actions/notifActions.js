import { ADD_NOTIF, REMOVE_NOTIF } from "../types";

export const addNotif = notification => {
  return {
    type: ADD_NOTIF,
    notification: {
      ...notification
    }
  };
};

export const removeNotif = key => {
  return {
    type: REMOVE_NOTIF,
    key
  };
};
