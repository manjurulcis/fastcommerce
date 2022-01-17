import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import useReactRouter from "use-react-router";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { appendQuery } from "./utils";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const SearchInResults = () => {
  const classes = useStyles();
  const { history, location } = useReactRouter();
  const parsed = queryString.parse(location.search);
  const [value, setValue] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    history.push(
      appendQuery(location, {
        search: parsed.search ? `${parsed.search} ${value}` : value,
        page: "1"
      })
    );
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search in results"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <IconButton className={classes.iconButton} onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

export default SearchInResults;
