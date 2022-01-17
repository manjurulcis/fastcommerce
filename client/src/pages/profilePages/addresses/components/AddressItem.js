import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneIphoneOutlined";

import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";

const useStyles = makeStyles(theme => ({
  root: {
    height: "280px"
  },
  wrapperAddress: {
    padding: theme.spacing(2),
    minHeight: "120px",
    [theme.breakpoints.down("sm")]: {
      minHeight: 0
    }
  },
  wrapperInfo: {
    borderTop: "1px solid #f4f4f4"
  },
  button: {
    margin: theme.spacing(1)
  },
  list: {
    padding: 0,
    marginTop: theme.spacing(2)
  },
  mt3: {
    marginTop: theme.spacing(3)
  }
}));

const AddressItem = ({ address }) => {
  const [edit, setEdit] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const ListItemActions = () => (
    <ListItemSecondaryAction>
      <Button
        onClick={() => setEdit(true)}
        size="small"
        variant="contained"
        color="primary"
      >
        Edit
      </Button>
      <EditAddress open={edit} setOpen={setEdit} address={address} />
      <DeleteAddress classes={classes} id={address.id} />
    </ListItemSecondaryAction>
  );

  return (
    <Paper className={classes.root}>
      <div className={classes.wrapperAddress}>
        <Typography variant="h5">{address.reciver_full_name}</Typography>
        <Typography variant="subtitle1">
          {address.state} state, {address.city} city, {address.postal_address}
        </Typography>
      </div>
      <div className={classes.wrapperInfo}>
        <List disablePadding={true} className={classes.list}>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={`postal code: ${address.postal_code}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText
              primary={`phone number: ${address.reciver_phone_number}`}
            />
            {!matches && <ListItemActions />}
          </ListItem>
          {matches && (
            <ListItem className={classes.mt3}>
              <ListItemActions />
            </ListItem>
          )}
        </List>
      </div>
    </Paper>
  );
};

export default AddressItem;
