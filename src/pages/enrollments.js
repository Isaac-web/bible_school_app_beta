import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import EnrollmentCard from "../components/EnrollmentCard";
import { loadEnrollments } from "../store/enrollments";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Loading from "../components/Loading";
import config from "../config.json";
import * as enrollmentSerivce from "../services/enrollmentService";
import * as authService from "../services/authService";

const Enrollments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);
  const { data: enrollments, loading } = useSelector(
    (state) => state.entities.enrollments
  );

  const formatSearchText = (str) => {
    return str.trim().toLowerCase();
  };

  const handleSearch = ({ target: input }) => {
    if (enrollments.length <= 1) return;

    const clonedEnrollments = [...enrollments];
    const results = clonedEnrollments.filter((enrollment) =>
      formatSearchText(enrollment.course.title).includes(
        formatSearchText(input.value)
      )
    );
    setSearchResults(results);
  };

  const handleResumeCourse = (enrollment) => {
    enrollmentSerivce.setEnrollment(enrollment);

    history.push(`/courses/take/${enrollment?.course?._id}`);
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    dispatch(loadEnrollments(user?._id));
  }, []);

  if (loading) return <Loading />;

  if (!enrollments.length)
    return (
      <Container sx={{ paddingTop: "3em" }}>
        <Typography align="center" variant="h5">
          No Enrollment Yet
        </Typography>
        <Typography align="center" variant="body2">
          <Link to="/courses">Visit the courses page to enroll</Link>
        </Typography>
      </Container>
    );

  const finalData = searchResults.length ? searchResults : enrollments;
  return (
    <Container>
      <Grid container className={classes.topContainer} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">My Courses</Typography>
          <Typography variant="subtitle2" component={Link} to="/courses">
            View all courses
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputBase
            placeholder="Search course by title..."
            fullWidth
            className={classes.searchInput}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {finalData.map((e) => (
          <EnrollmentCard
            key={e._id}
            title={e.course.title}
            progress={e.progress}
            onClick={() => handleResumeCourse(e)}
          />
        ))}
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  topContainer: { padding: "2em 0" },
  searchInput: {
    backgroundColor: config.colors.light,
    padding: "0.7em",
    borderRadius: 10,
  },
}));

export default Enrollments;
