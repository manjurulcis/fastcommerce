import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import LoginForm from "./components/LoginForm";
import { login } from "@actions/authActions";
import { phone_number_or_email_reg } from "../regexes";

const validationSchema = Yup.object({
  phone_number_or_email: Yup.string()
    .matches(phone_number_or_email_reg, "Invalid phone number or email")
    .required("Required field"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field")
});

const Login = () => {
  const values = { phone_number_or_email: "", password: "" };
  const dispatch = useDispatch();

  const handleSubmit = (
    { phone_number_or_email, password },
    { setErrors, resetForm }
  ) => {
    const user = {
      phone_number_or_email,
      password
    };
    dispatch(login(user, setErrors, resetForm));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => <LoginForm {...props} />}
    </Formik>
  );
};

export default Login;
