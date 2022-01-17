import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import useReactRouter from "use-react-router";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import PersonalInfoEditForm from "./components/PersonalInfoEditForm";
import Sidebar from "../Sidebar";
import { phone_number_reg } from "@pages/authPages/regexes";
import { updateUser } from "@actions/authActions";

const validationSchema = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required(),
  national_code: Yup.number(),
  email: Yup.string().email()
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  wrapper: {
    padding: theme.spacing(2)
  },
  button: {
    padding: theme.spacing(1.3)
  },
  iconButton: {
    margin: theme.spacing(1)
  }
}));

const PersonalInfoEdit = () => {
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    phone_number,
    national_code,
    email
  } = useSelector(state => state.auth.user);
  const classes = useStyles();
  const { history } = useReactRouter();

  const values = {
    first_name: first_name || "",
    last_name: last_name || "",
    phone_number: phone_number || "",
    national_code: national_code || "",
    email: email || ""
  };

  const handleSubmit = (user, { setErrors }) => {
    dispatch(updateUser(user, setErrors, history));
  };

  return (
    <Sidebar activeItem="personalInfo">
      <Paper className={classes.root}>
        <IconButton
          color="inherit"
          component={Link}
          to="/profile/personal-info"
          className={classes.iconButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography display="inline" variant="h5">
          Edit Personal info
        </Typography>
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => <PersonalInfoEditForm classes={classes} {...props} />}
        </Formik>
      </Paper>
    </Sidebar>
  );
};

export default PersonalInfoEdit;
