import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SnackbarProvider } from "notistack";
import axios from "axios";

import Routes from "./Routes";
import Notifer from "./components/layouts/Notifer";
import { loadUser } from "@actions/authActions";

// Set csrf token
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <SnackbarProvider preventDuplicate>
      <Router>
        <Notifer />
        <Routes />
      </Router>
    </SnackbarProvider>
  );
};

export default App;
