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
import { loadCourses } from "../store/courses";
import CourseCard from "../components/CourseCard";

const Enrollments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);
  const { data: enrollments, loading } = useSelector(
    (state) => state.entities.enrollments
  );
  const { data: courses } = useSelector((state) => state.entities.courses);

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
    dispatch(loadCourses());
  }, []);

  if (loading) return <Loading />;

  if (!enrollments.length)
    return (
      <>
        <Container
          sx={{
            padding: "8em 0",
            marginTop: "10px",
            backgroundColor: config.colors.light,
          }}
        >
          <Typography align="center" variant="h5">
            No Enrollment Yet
          </Typography>
          <Typography align="center" variant="body2">
            <Link to="/courses">Visit the courses page to enroll</Link>
          </Typography>
        </Container>
        <Container sx={{ marginTop: "10em" }}>
          <Typography variant="h5" gutterBottom>
            Available Courses
          </Typography>
          {courses.map((item) => (
            <Link to={`/courses/details/${item._id}`}>
              <CourseCard
                title={item.title}
                imageUri={item.imageUri}
                coordinatorName={`${item.coordinator.firstname} ${item.coordinator.lastname}`}
                coordinatorImageUri={item.coordinator?.imageUri}
                numberOfEnrollments={item.enrollments}
              />
            </Link>
          ))}
        </Container>
      </>
    );

  // title,
  // imageUri,
  // coordinatorName,
  // coordinatorImageUri,
  // numberOfEnrollments,

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
        {finalData.map((item) => (
          <EnrollmentCard
            key={item._id}
            title={item.course.title}
            imageUri={item.course.imageUri}
            progress={item.progress}
            onClick={() => handleResumeCourse(item)}
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
