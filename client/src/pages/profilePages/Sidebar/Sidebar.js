import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useReactRouter from "use-react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import ShopingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonIcon from "@material-ui/icons/PersonOutline";
import StarIcon from "@material-ui/icons/StarBorder";
import AddressIcon from "@material-ui/icons/RoomOutlined";
import PersonalInfoIcon from "@material-ui/icons/PortraitOutlined";
import ChangePasswordIcon from "@material-ui/icons/LockOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import ListItemLink from "./ListItemLink";
import ExpansionPanel from "@components/layouts/MyExpansionPanel";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  detail: {
    padding: theme.spacing(1)
  }
}));

const Sidebar = ({ activeItem, children }) => {
  const { location } = useReactRouter();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container spacing={2}>
      <Grid item md="auto" xs={12} className={classes.root}>
        <ExpansionPanel
          defaultExpanded={location.pathname === "/profile" ? true : matches}
          detailClass={classes.detail}
          title="Your account"
        >
          <List style={{ width: "100%" }}>
            <ListItemLink selected={activeItem === "profile"} to="/profile">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemLink>
            <ListItemLink
              selected={activeItem === "orders"}
              to="/profile/orders"
            >
              <ListItemIcon>
                <ShopingCartIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="All orders" />
            </ListItemLink>
            <ListItemLink
              selected={activeItem === "favProducts"}
              to="/profile/favorite-products"
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Favorite Products" />
            </ListItemLink>
            <ListItemLink
              selected={activeItem === "addresses"}
              to="/profile/addresses"
            >
              <ListItemIcon>
                <AddressIcon />
              </ListItemIcon>
              <ListItemText primary="Addresses" />
            </ListItemLink>
            <ListItemLink
              selected={activeItem === "personalInfo"}
              to="/profile/personal-info"
            >
              <ListItemIcon>
                <PersonalInfoIcon />
              </ListItemIcon>
              <ListItemText primary="Personal Info" />
            </ListItemLink>
            <ListItemLink to="/change-password">
              <ListItemIcon>
                <ChangePasswordIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItemLink>
            <ListItemLink to="/logout">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemLink>
          </List>
        </ExpansionPanel>
      </Grid>
      <Grid item md xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
