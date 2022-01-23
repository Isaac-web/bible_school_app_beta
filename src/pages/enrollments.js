import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles, useTheme } from "@mui/styles";
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
import Empty from "../components/Empty";
import bookShelfImage from "../assets/images/book-shelf.png";

const Enrollments = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
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
            padding: `${matchesSM ? "6em 4em" : "8em"}`,
            marginTop: "10px",
            backgroundColor: config.colors.light,
            borderRadius: `${matchesSM ? 0 : "1em"}`,
          }}
        >
          <Empty imagePath={bookShelfImage} title={"No enrollments yet"} />
        </Container>
        {courses.length && (
          <Container sx={{ marginTop: "5em" }}>
            <Typography variant="h5" gutterBottom>
              Available Courses
            </Typography>
            <Grid container spacing={4}>
              {courses.slice(0, 6).map((item) => (
                <CourseCard
                  component={Link}
                  to={`/courses/details/${item._id}`}
                  title={item.title}
                  imageUri={item.imageUri}
                  coordinatorName={`${item.coordinator.firstname} ${item.coordinator.lastname}`}
                  coordinatorImageUri={item.coordinator?.imageUri}
                  numberOfEnrollments={item.enrollments}
                />
              ))}
            </Grid>
            {courses.length > 5 && (
              <Button component={Link} to="/courses" sx={{ margin: "1em 0" }}>
                All Courses
              </Button>
            )}
          </Container>
        )}
      </>
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
