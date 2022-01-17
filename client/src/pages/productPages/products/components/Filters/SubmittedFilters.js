import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useReactRouter from "use-react-router";
import queryString from "query-string";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";

import { removeQuery } from "./utils";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: "4px"
  },
  padding: {
    padding: theme.spacing(1)
  },
  mb1: {
    marginBottom: theme.spacing(1)
  },
  remove: {
    float: "right",
    marginRight: theme.spacing(1),
    cursor: "pointer",
    fontWeight: "bold"
  }
}));

const SubmittedFilters = () => {
  const { history, location } = useReactRouter();
  const { available, min_price, max_price, search } = queryString.parse(
    location.search
  );
  const classes = useStyles();

  if (available || min_price || max_price || search) {
    return (
      <Paper className={classes.mb1}>
        <div className={classes.padding}>
          <Typography display="inline" variant="subtitle1">
            Submitted Filters:
          </Typography>
          <Typography
            onClick={() => history.push("/products")}
            color="error"
            display="inline"
            variant="subtitle1"
            className={classes.remove}
          >
            remove
          </Typography>
          <Divider />
        </div>
        {available === "true" && (
          <Button
            onClick={() => history.push(removeQuery(location, "available"))}
            className={classes.margin}
            size="small"
            variant="outlined"
          >
            Only available products
            <CloseIcon fontSize="small" color="action" />
          </Button>
        )}
        {min_price && max_price && (
          <Button
            onClick={() =>
              history.push(removeQuery(location, ["min_price", "max_price"]))
            }
            className={classes.margin}
            size="small"
            variant="outlined"
          >
            from {min_price}$ to {max_price}$
            <CloseIcon fontSize="small" color="action" />
          </Button>
        )}
        {search && (
          <Button
            onClick={() => history.push(removeQuery(location, "search"))}
            className={classes.margin}
            size="small"
            variant="outlined"
          >
            {search}
            <CloseIcon fontSize="small" color="action" />
          </Button>
        )}
      </Paper>
    );
  }
  return null;
};

export default SubmittedFilters;
