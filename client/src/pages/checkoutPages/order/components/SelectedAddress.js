import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  right: {
    marginLeft: "auto"
  }
}));

const SelectedAddress = ({ address, setChange }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <Typography display="inline">{`Reciver: ${address.reciver_full_name}`}</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            address: {address.state}, {address.city}, {address.postal_address}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>phone number: {address.reciver_phone_number}</Typography>
        </ListItem>
        <ListItem>
          <Typography>postal code: {address.postal_code}</Typography>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => setChange(true)}
            className={classes.right}
            color="secondary"
            size="small"
            variant="outlined"
          >
            Change address
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default SelectedAddress;
