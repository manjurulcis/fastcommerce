import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useReactRouter from "use-react-router";
import queryString from "query-string";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      border: "1px solid gray"
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    margin: "1px"
  },
  form: {
    width: "100%",
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 0)
    }
  }
}));

const Search = () => {
  const { history, location } = useReactRouter();
  const parsed = queryString.parse(location.search);
  const [value, setValue] = useState(parsed.search || "");
  const [clear, setClear] = useState(false);
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/products/?search=${value}`);
  };

  return (
    <form
      onMouseEnter={() => setClear(true)}
      onMouseLeave={() => setClear(false)}
      onSubmit={handleSubmit}
      className={classes.form}
    >
      <Paper className={classes.root}>
        {value && clear && (
          <IconButton
            className={classes.iconButton}
            onClick={() => setValue("")}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
        <InputBase
          className={classes.input}
          placeholder="Search in products"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <IconButton className={classes.iconButton} onClick={handleSubmit}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>
    </form>
  );
};

export default Search;
