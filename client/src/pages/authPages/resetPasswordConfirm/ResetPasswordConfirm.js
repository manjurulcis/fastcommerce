import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import ResetPasswordConfirmForm from "./components/ResetPasswordConfirmForm";
import { resetPasswordConfirm } from "@actions/authActions";
import { addNotif } from "@actions/notifActions";

const validationSchema = Yup.object({
  new_password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field"),
  new_password2: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Does not match")
    .required("Required field")
});

const ResetPassword = ({ match, history }) => {
  const values = { new_password: "", new_password2: "" };
  const { token } = match.params;
  const dispatch = useDispatch();

  const validateToken = () => {
    axios
      .post("/api/auth/reset-password/verify_token/", { token })
      .then(() => {})
      .catch(() => {
        history.push("/reset-password");
        dispatch(
          addNotif({
            message: "Link expired request new one",
            options: { variant: "error" }
          })
        );
      });
  };

  useEffect(() => {
    validateToken();
  });

  const handleSubmit = ({ new_password }, { setErrors }) => {
    validateToken();
    dispatch(resetPasswordConfirm(new_password, token, setErrors, history));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => <ResetPasswordConfirmForm {...props} />}
    </Formik>
  );
};

export default ResetPassword;
