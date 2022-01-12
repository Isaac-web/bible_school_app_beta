import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/CourseCard";
import AutoScrollContainer from "../components/AutoScrollContainer";
import { loadCourses } from "../store/courses";
import Loading from "../components/Loading";
import NoMatchFound from "../components/NoMatchFound";

const Courses = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchInput, setsearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: courses, loading } = useSelector(
    (state) => state.entities.courses
  );

  const handleRouteChange = (courseId) => {
    history.push(`courses/details/${courseId}`);
  };

  const handleSearch = ({ target: input }) => {
    setsearchInput(input.value);
    const results = courses.filter((item) =>
      item.title.trim().toLowerCase().includes(input.value.trim().toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  if (loading) return <Loading />;

  const finalData = searchResults.length ? searchResults : courses;
  console.log(finalData);
  

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
                    onChange={handleSearch}
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
                    Courses to explore, enroll and complete
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Container>
          {!searchResults.length && searchInput.length ? (
            <NoMatchFound />
          ) : (
            <Grid container spacing={4}>
              {finalData.map((item) => (
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
          )}
        </Container>
      </Box>
    </AutoScrollContainer>
  );
};;

const useStyles = makeStyles((theme) => ({
  searchInput: {
    padding: "0.8em",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    minWidth: 300,
  },
  searchAreaTextBox: {
    padding: "3em 0",
  },
  searchAreaTextGrid: {
    padding: "0.8em 0",
  },
}));

export default Courses;
