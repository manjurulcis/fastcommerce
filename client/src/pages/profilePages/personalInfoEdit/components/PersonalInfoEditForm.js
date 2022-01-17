import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import LoadingButton from "@components/loading/LoadingButton";

const PersonalInfoEditForm = props => {
  const {
    values: { first_name, last_name, phone_number, national_code, email },
    errors,
    handleSubmit,
    handleChange,
    dirty,
    isValid
  } = props;
  const { loading } = useSelector(state => state.auth);
  const { classes } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} className={classes.wrapper}>
        <Grid item md={6} xs={12}>
          <TextField
            name="first_name"
            label="First name"
            fullWidth
            helperText={errors.first_name}
            error={Boolean(errors.first_name)}
            value={first_name}
            onChange={handleChange}
            autoFocus
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="last_name"
            label="Last name"
            fullWidth
            helperText={errors.last_name}
            error={Boolean(errors.last_name)}
            value={last_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="phone_number"
            label="Phone number"
            fullWidth
            helperText={errors.phone_number}
            error={Boolean(errors.phone_number)}
            value={phone_number}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="national_code"
            label="National code"
            fullWidth
            helperText={errors.national_code}
            error={Boolean(errors.national_code)}
            value={national_code}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            helperText={errors.email}
            error={Boolean(errors.email)}
            value={email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <LoadingButton
        type="submit"
        fullWidth
        color="primary"
        disabled={!dirty || loading || !isValid}
        className={classes.button}
      >
        Update
      </LoadingButton>
    </form>
  );
};

export default PersonalInfoEditForm;
