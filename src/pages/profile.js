import { useEffect } from "react";
import { Container, Typography, Avatar, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EnrollmentCard from "../components/EnrollmentCard";

import * as userActions from "../store/currentUser";
import * as enrollmentActions from "../store/enrollments";
import Empty from "../components/Empty";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.currentUser);
  const { data: enrollments } = useSelector(
    (state) => state.entities.enrollments
  );

  useEffect(() => {
    dispatch(userActions.loadCurrentUser());
    dispatch(enrollmentActions.loadEnrollments(user._id));
  }, []);

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
      </Container>
    </Box>
  );
};

export default Profile;
