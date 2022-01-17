import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { removeNotif } from "@actions/notifActions";

const Notifier = () => {
  const notifications = useSelector(store => store.notif.notifications);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = key => {
    closeSnackbar(key);
    dispatch(removeNotif(key));
  };

  const action = key => (
    <IconButton
      key="close"
      aria-label="close"
      color="inherit"
      onClick={() => handleClick(key)}
    >
      <CloseIcon style={{ fontSize: 20 }} />
    </IconButton>
  );

  useEffect(() => {
    notifications.forEach(({ message, options = {} }) => {
      enqueueSnackbar(message, {
        action,
        ...options,
        onClose: (event, reason, key) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }
          dispatch(removeNotif(key));
        }
      });
    });
  });

  return null;
};

export default Notifier;
