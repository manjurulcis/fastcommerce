import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useReactRouter from "use-react-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import CartIcon from "@material-ui/icons/ShoppingCart";

import ShopIcon from "../icons/Shop";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    zIndex: 9,
    width: "100%",
    marginLeft: "-8px",
    backgroundColor: "#f4f4f4",
    borderTop: "1px solid #bdbdbd"
  }
});

const MobileNavigation = () => {
  const classes = useStyles();
  const { history, location } = useReactRouter();

  return (
    <BottomNavigation
      value={location.pathname}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        onClick={() => history.push("/cart")}
        value="/cart"
        label="Cart"
        icon={<CartIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/products")}
        value="/products"
        label="Products"
        icon={<ShopIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/profile")}
        value="/profile"
        label="Profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default MobileNavigation;
