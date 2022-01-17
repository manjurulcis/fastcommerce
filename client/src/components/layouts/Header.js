import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "@material-ui/icons/ShoppingCart";
import ProfileIcon from "@material-ui/icons/Person";

import Search from "@pages/productPages/products/components/Filters/Search";

const useStyles = makeStyles(theme => ({
  rightItems: {
    marginLeft: "auto",
    display: "flex"
  },
  shopButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    marginRight: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const authNav = (
    <div className={classes.rightItems}>
      <IconButton component={RouterLink} to="/profile" color="inherit">
        <ProfileIcon />
      </IconButton>
      <IconButton component={RouterLink} to="/cart" color="inherit">
        <Badge color="secondary" badgeContent={user && user.cart_items_count}>
          <CartIcon />
        </Badge>
      </IconButton>
    </div>
  );

  const guestNav = (
    <div className={classes.rightItems}>
      <Button component={RouterLink} to="/login" color="inherit">
        Login
      </Button>
      <Button component={RouterLink} to="/register" color="inherit">
        Register
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Link
            component={RouterLink}
            to="/products"
            variant="h6"
            color="inherit"
            className={classes.title}
            underline={"none"}
          >
            Products
          </Link>
          {!matches && <Search />}
          {isAuthenticated === false ? guestNav : authNav}
        </Toolbar>
      </AppBar>
      {matches && <Search />}
    </React.Fragment>
  );
};

export default Header;
