import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import RegisterForm from "./components/RegisterForm";
import { register } from "@actions/authActions";
import { phone_number_reg } from "../regexes";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
  phone_number: Yup.string()
    .matches(phone_number_reg, "Invalid phone number")
    .required("Required field"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required field")
});

const Register = () => {
  const values = {
    phone_number: "",
    password: "",
    first_name: "",
    last_name: ""
  };
  const dispatch = useDispatch();

  const handleSubmit = (
    { first_name, last_name, phone_number, password },
    { setErrors, resetForm }
  ) => {
    const user = {
      first_name,
      last_name,
      phone_number,
      password
    };
    dispatch(register(user, setErrors, resetForm));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => <RegisterForm {...props} />}
    </Formik>
  );
};

export default Register;
