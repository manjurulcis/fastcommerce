import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  button: {
    position: "relative"
  },
  progress: {
    position: "absolute"
  }
}));

const LoadingButton = ({ children, ...rest }) => {
  const loading = useSelector(state => state.ui.loadingButton);
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      {...rest}
      disabled={rest.disabled || loading}
    >
      {children}
      {loading && (
        <CircularProgress
          size={30}
          color={rest.color}
          className={classes.progress}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
