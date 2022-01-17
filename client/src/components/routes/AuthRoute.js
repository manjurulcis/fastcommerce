import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, to, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Redirect to={to} />
        ) : (
          isAuthenticated === false && <Component {...props} />
        )
      }
    />
  );
};

AuthRoute.defaultProps = {
  to: "/"
};

export default AuthRoute;
