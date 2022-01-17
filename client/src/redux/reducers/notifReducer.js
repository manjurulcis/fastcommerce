import { ADD_NOTIF, REMOVE_NOTIF } from "../types";

const initialState = {
  notifications: []
};

const defaultOptions = {
  variant: "success",
  key: new Date().getTime() + Math.random()
};

export default (state = initialState, action) => {
  const { type, notification, key } = action;

  switch (type) {
    case ADD_NOTIF:
      // make sure notification have a key
      notification.options &&
        (notification.options.key = new Date().getTime() + Math.random());
      return {
        notifications: [
          ...state.notifications,
          {
            options: { ...defaultOptions, ...notification.options },
            ...notification
          }
        ]
      };
    case REMOVE_NOTIF:
      return {
        notifications: state.notifications.filter(
          notification => notification.options.key !== key
        )
      };
    default:
      return state;
  }
};
