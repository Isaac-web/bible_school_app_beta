import {
  Container,
  Grid,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logInUser } from "../store/auth";
import AppTextField from "../components/form/AppTextField";
import * as authService from "../services/authService";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Username"),
  password: Yup.string().min(7).max(30).required().label("Password"),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loginErrorMessage: errorMessage, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = () => {
    const { status } = authService.getCurrentUser();
    if (!status) return;

    let path = "";
    switch (status) {
      case "admin":
        path = "/admin";
        break;
      case "coordinator":
        path = "/coordinator";
        break;

      default:
        path = "/enrollments";
        break;
    }

    history.replace(path);
  };

  const handleSubmit = (data) => {
    dispatch(logInUser(data, redirect));
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Grid container justifyContent="center" alignItems={"center"}>
            <Grid item direction="column" container sm={5} xs={12} spacing={3}>
              <Grid item>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Grid>
              <Grid item>
                <AppTextField
                  autoFocus
                  fullWidth
                  name="email"
                  label="Email"
                  required
                />
              </Grid>
              <Grid item>
                <AppTextField
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button onClick={handleSubmit} fullWidth>
                  {loading && (
                    <CircularProgress sx={{ color: "white" }} size={"1.7em"} />
                  )}
                  {!loading && "Login"}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => history.push("/register")}
                >
                  Dont have an account?
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}));

export default Login;
