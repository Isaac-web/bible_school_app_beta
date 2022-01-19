import { useEffect } from "react";
import { Container, Typography, Avatar, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EnrollmentCard from "../components/EnrollmentCard";

import * as userActions from "../store/currentUser";
import * as enrollmentActions from "../store/enrollments";
import Empty from "../components/Empty";
import Loading from "../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.currentUser);
  const { data: enrollments } = useSelector(
    (state) => state.entities.enrollments
  );

  useEffect(() => {
    dispatch(userActions.loadCurrentUser());
    dispatch(enrollmentActions.loadEnrollments(user._id));
  }, []);

  if (loading) return <Loading />;

  return (
    <Box sx={{ paddingTop: "2em" }}>
      <Container>
        <Box>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Avatar
                sx={{ height: "5em", width: "5em", marginBottom: 2 }}
                src=""
              />
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {user.firstname + " " + user.lastname}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{user.address}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{user.mobile}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Paper style={{ paddingTop: "1em", marginTop: "2em" }}>
          <Typography align="center" gutterBottom variant="h5">
            Enrollments
          </Typography>
          <Box>
            {!enrollments.length ? (
              <Empty />
            ) : (
              <Grid container>
                {enrollments.map((item) => (
                  <EnrollmentCard />
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
