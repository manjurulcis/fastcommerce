import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import useReactRouter from "use-react-router";
import * as Yup from "yup";

import ChangePasswordForm from "./components/ChangePasswordForm";
import { changePassword } from "@actions/authActions";

const validationSchema = Yup.object({
  old_password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field"),
  new_password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field"),
  new_password2: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Does not match")
    .required("Required field")
});

const ChangePassword = () => {
  const values = { old_password: "", new_password: "", new_password2: "" };
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  const handleSubmit = (
    { old_password, new_password },
    { setErrors, resetForm }
  ) => {
    const data = {
      old_password,
      new_password: new_password
    };
    dispatch(changePassword(data, setErrors, resetForm, history));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => <ChangePasswordForm {...props} />}
    </Formik>
  );
};

export default ChangePassword;
