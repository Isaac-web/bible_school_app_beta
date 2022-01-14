import React from "react";
import {
  Alert,
  Grid,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import AppTextField from "../components/form/AppTextField";
import { registerUser } from "../store/auth";
import * as authService from "../services/authService";

const validationSchema = Yup.object().shape({
  address: Yup.string().min(3).max(150).required().label("Address"),
  firstname: Yup.string().min(3).max(100).required().label("Firstname"),
  lastname: Yup.string().min(3).max(100).required().label("Lastname"),
  email: Yup.string().email().required().label("Email"),
  mobile: Yup.string().length(10).required().label("Phone"),
  password: Yup.string().min(7).max(150).required().label("Password"),
  confirmPassword: Yup.string()
    .min(7)
    .max(150)
    .required()
    .label("Confirm Password"),
});

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { registrationErrorMessage: errorMessage, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = () => {
    let path = "/login";
    // const user = authService.getCurrentUser();
    // if (user?.status == "admin") path = "/admin";
    // else path = "/enrollments";

    history.push(path);
  };

  const handleSignUp = (data) => {
    dispatch(registerUser(data, redirect));
  };

  return (
    <Container className={classes.container}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>

          <Grid item>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Grid>

          <Formik
            initialValues={{
              address: "",
              firstname: "",
              lastname: "",
              email: "",
              mobile: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleSubmit }) => (
              <Grid container spacing={2} className={classes.formContainerGrid}>
                <Grid item xs={6}>
                  <AppTextField
                    autoFocus
                    name="firstname"
                    label="Firstname"
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppTextField
                    name="lastname"
                    label="Lastname"
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AppTextField name="email" label="Email" required={true} />
                </Grid>
                <Grid item xs={6}>
                  <AppTextField
                    name="mobile"
                    label="Phone"
                    placeholder="Eg. 0550005555"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="address"
                    label="Address"
                    required={true}
                    placeholder="Eg. Victory Towers, Ayeduase"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="password"
                    label="Password"
                    type="password"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Grid item xs={12} sm={4}>
                        <Button fullWidth onClick={handleSubmit}>
                          {loading && (
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={"1.7em"}
                            />
                          )}
                          {!loading && "Sign Up"}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          fullWidth
                          variant="text"
                          onClick={() => history.push("/login")}
                        >
                          Already have an account? Login
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  formContainerGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default Register;
