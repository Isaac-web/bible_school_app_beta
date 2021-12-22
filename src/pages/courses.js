import { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  InputBase,
  Grid,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Search } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/CourseCard";
import AutoScrollContainer from "../components/AutoScrollContainer";
import { loadCourses } from "../store/courses";

const data = [
  {
    _id: "1",
    title: "Course Title",
    imageUri: "not-provided",
    numberOfEnrollments: 122,
    coordinatorName: "John Doe",
    coordinatorImageUri: "coordinator image",
  },
  {
    _id: "2",
    title: "Course Title",
    imageUri: "not-provided",
    numberOfEnrollments: 122,
    coordinatorName: "John Doe",
    coordinatorImageUri: "coordinator image",
  },
  {
    _id: "3",
    title: "Course Title",
    imageUri: "not-provided",
    numberOfEnrollments: 122,
    coordinatorName: "John Doe",
    coordinatorImageUri: "coordinator image",
  },
  {
    _id: "4",
    title: "Course Title",
    imageUri: "not-provided",
    numberOfEnrollments: 122,
    coordinatorName: "John Doe",
    coordinatorImageUri: "coordinator image",
  },
];

const Courses = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: courses } = useSelector((state) => state.entities.courses);

  const handleRouteChange = (courseId) => {
    history.push(`courses/${courseId}`);
  };

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  return (
    <AutoScrollContainer>
      <Box>
        <Box className={classes.searchAreaTextBox}>
          <Grid container justifyContent="center">
            <Grid item sm={12}>
              <Grid container justifyContent={"center"}>
                <Grid item xs={12} sm={5}>
                  <InputBase
                    className={classes.searchInput}
                    fullWidth
                    placeholder="Search courses by title..."
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="center"
                className={classes.searchAreaTextGrid}
              >
                <Grid item>
                  <Typography variant="h4" align="center">
                    All Courses
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    10 courses to explore, enroll and complete
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {courses.map((item) => (
              <CourseCard
                key={item._id}
                title={item.title}
                imageUri={item.imageUri || "not-provided"}
                numberOfEnrollments={item.enrollments}
                coordinatorName={`${item.coordinator.firstname} ${item.coordinator.lastname}`}
                coordinatorImageUri={
                  item.coordinator.imageUri || "coordinator image"
                }
                onClick={() => handleRouteChange(item._id)}
              />
            ))}
          </Grid>
        </Container>
      </Box>
    </AutoScrollContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  searchInput: {
    padding: "0.8em",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  searchAreaTextBox: {
    padding: "3em 0",
  },
  searchAreaTextGrid: {
    padding: "0.8em 0",
  },
}));

export default Courses;
