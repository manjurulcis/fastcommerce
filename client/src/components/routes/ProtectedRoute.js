import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, to, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Redirect to={to} />
        ) : (
          isAuthenticated === true && <Component {...props} />
        )
      }
    />
  );
};

ProtectedRoute.defaultProps = {
  to: "/login"
};

export default ProtectedRoute;
