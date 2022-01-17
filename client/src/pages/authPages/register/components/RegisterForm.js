import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import MUILink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import useStyles from "../../AuthFromsStyles";
import LoadingButton from "@components/loading/LoadingButton";

const RegisterForm = props => {
  const {
    values: { first_name, last_name, phone_number, password },
    errors,
    handleSubmit,
    handleChange,
    isValid
  } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                name="first_name"
                variant="outlined"
                fullWidth
                id="first_name"
                label="First Name"
                helperText={errors.first_name}
                error={
                  Boolean(errors.first_name) || Boolean(errors.non_field_errors)
                }
                value={first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                helperText={errors.last_name}
                error={
                  Boolean(errors.last_name) || Boolean(errors.non_field_errors)
                }
                value={last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                label="Phone Number"
                name="phone_number"
                helperText={errors.phone_number}
                error={
                  Boolean(errors.phone_number) ||
                  Boolean(errors.non_field_errors)
                }
                value={phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={errors.password}
                error={
                  Boolean(errors.password) || Boolean(errors.non_field_errors)
                }
                value={password}
                onChange={handleChange}
              />
            </Grid>
            {errors.non_field_errors && (
              <Typography
                variant="body1"
                className={classes.customError}
                color="error"
              >
                {errors.non_field_errors}
              </Typography>
            )}
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
          >
            Register
          </LoadingButton>
          <MUILink component={Link} to="/login" variant="body2">
            {"You already have an account? Log In"}
          </MUILink>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
