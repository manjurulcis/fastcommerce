import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "../../AuthFromsStyles";
import LoadingButton from "@components/loading/LoadingButton";

const ResetPasswordForm = props => {
  const {
    values: { email },
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Request reset password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            helperText={errors.email}
            error={Boolean(errors.email)}
            value={email}
            onChange={handleChange}
            autoFocus
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
          >
            Send password reset email
          </LoadingButton>
        </form>
      </div>
    </Container>
  );
};

export default ResetPasswordForm;
