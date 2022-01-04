import { useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import SummeryCard from "../components/SummeryCard";
import * as summeryActions from "../store/summery";
import AdminCourses from "../components/AdminCourses";
import AdminEnrollments from "../components/AdminEnrollments";

const Admins = () => {
  const dispatch = useDispatch();

  const { data: summery } = useSelector((state) => state.summery);

  useEffect(() => {
    dispatch(summeryActions.loadSummery());
  }, []);

  const handleClick = (path) => {
    console.log(path);
  };

  return (
    <Container>
      {/* <Grid container sx={{ paddingTop: (theme) => theme.spacing(2) }}>
        <Grid container justifyContent="space-between">
          <SummeryCard
            link="/admin/courses"
            onClick={() => handleClick("/courses")}
            title={summery.coursesCount}
            subtitle={"Courses"}
          />
          <SummeryCard
            link="/admin/enrollments"
            onClick={() => handleClick("/enrollments")}
            title={summery.enrollmentsCount}
            subtitle={"Enrollments"}
          />
          <SummeryCard
            link="/admin/admins"
            onClick={() => handleClick("/admins")}
            title={summery.adminsCount}
            subtitle={"Admins"}
          />
        </Grid>
      </Grid> */}

      <Box style={{ marginTop: "2em" }}>
        <Switch>
          <Route path="/admin/courses" component={AdminCourses} />
          <Route path="/admin/enrollments" render={AdminEnrollments} />
          <Route path="/admin/admins" render={() => <>Admins</>} />
          <Redirect to="/admin/courses" />
        </Switch>
      </Box>
    </Container>
  );
};

export default Admins;
