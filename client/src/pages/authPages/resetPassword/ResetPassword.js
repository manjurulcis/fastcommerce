import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import ResetPasswordForm from "./components/ResetPasswordForm";
import { resetPassword } from "@actions/authActions";

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Required field")
});

const ResetPassword = ({ history }) => {
  const values = { email: "" };
  const dispatch = useDispatch();

  const handleSubmit = ({ email }, { setErrors }) => {
    dispatch(resetPassword(email, setErrors, history));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => <ResetPasswordForm {...props} />}
    </Formik>
  );
};

export default ResetPassword;
