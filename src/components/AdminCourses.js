import React, { useEffect, useState } from "react";
import AppDialog from "./AppDialog";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputBase,
  InputAdornment,
  Paper,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useTheme} from "@mui/styles";

import config from "../config.json";
import * as coursesActions from "../store/courses";
import { loadCourses } from "../store/courses";
import * as usersActions from "../store/users";
import NoMatchFound from "../components/NoMatchFound";
import Empty from "../components/Empty";
import UsersDialog from "./UsersDialog";
import Loading from "./Loading";
import * as textFormat from "../utils/textFormat";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogInput, setDeleteDialogInput] = useState("");
  const [courseToBeDeleted, setCourseToBeDeleted] = useState({
    courseId: "",
    title: "",
    index: -1,
  });

  const { data, errorMessage, awaiting, loading } = useSelector(
    (state) => state.entities.courses
  );

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const mapToViewModel = (data) => {
    return data.map((item) => {
      const title = item.title;
      const coordinatorName = `${item.coordinator.firstname} ${item.coordinator.lastname}`;
      const subtitle = `${coordinatorName} (${item.enrollments})`;
      const _id = item._id;
      return { _id, title, subtitle };
    });
  };

  const courses = mapToViewModel(data);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCourseDelete = () => {
    dispatch(
      coursesActions.deleteCourse(
        courseToBeDeleted.courseId,
        courseToBeDeleted.index
      )
    );
    closeDeleteDialog();
  };

  const handleSearch = ({ target: input }) => {
    setSearchInput(input.value);
    const results = courses.filter((item) =>
      item.title.toLowerCase().trim().includes(input.value.trim().toLowerCase())
    );

    setSearchResults(results);
  };

  const openDelteDialog = (course, index) => {
    setDeleteDialogOpen(true);

    setCourseToBeDeleted({
      courseId: course._id,
      title: course.title,
      index: index,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);

    setCourseToBeDeleted({
      courseId: "null",
      title: "",
      index: -1,
    });

    setDeleteDialogInput("");
  };

  const finalData = searchResults.length ? searchResults : courses;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      {Boolean(courses.length) && (
        <Typography variant="subtitle1" gutterBottom>
          There {courses.length > 1 ? "are" : "is"} {courses.length} course
          {courses.length > 1 && "s"} in the database.
        </Typography>
      )}
      <Button onClick={() => setOpen(true)} sx={{ marginBottom: "1.5em" }}>
        New Course
      </Button>
      <InputBase
        component={"paper"}
        fullWidth
        elevation={1}
        onChange={handleSearch}
        placeholder="Search by title..."
        startAdornment={
          <InputAdornment position="start" sx={{ padding: "0 0.3em" }}>
            <Search />
          </InputAdornment>
        }
        sx={{
          padding: 1,
          marginBottom: 2,
          backgroundColor: config.colors.light,
          borderRadius: "3px",
        }}
      />

      {!searchResults.length && searchInput ? (
        <NoMatchFound />
      ) : (
        <Paper>
          <AppList
            loading={loading}
            data={finalData}
            onSecondaryAction={openDelteDialog}
            secondaryAction={
              <Button
                sx={{ color: "rgba(255, 0, 0, 0.8)" }}
                size="small"
                variant="outlined"
              >
                Delete
              </Button>
            }
          />
        </Paper>
      )}

      <NewCourseDialog open={open} onClose={handleCloseDialog} />

      <AppDialog
        title="Delete course?"
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        maxWidth="xs"
      >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography>
              To delete{" "}
              <strong style={{ color: "black" }}>
                {courseToBeDeleted.title}
              </strong>
              , confirm by typing the title.
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              autoFocus
              value={deleteDialogInput}
              onChangeCapture={({ target: input }) =>
                setDeleteDialogInput(input.value)
              }
              label="Course Title"
            />
          </Grid>

          <Grid item container justifyContent={"flex-end"} spacing={2}>
            <Grid item>
              <Button onClick={closeDeleteDialog} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  backgroundColor: "rgba(225, 0, 0, 0.7)",
                  "&:hover": { backgroundColor: "rgba(225, 0, 0, 0.9)" },
                }}
                disabled={deleteDialogInput !== courseToBeDeleted.title}
                onClick={handleCourseDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </AppDialog>
    </Box>
  );
};

const NewCourseDialog = ({ open: dialogOpen, onClose: onDialogClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    username: "",
    coordinatorId: "",
    image: null,
  });

  const { awaiting } = useSelector((state) => state.entities.courses);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const clear = () => {
    setData({
      title: "",
      username: "",
      coordinatorId: "",
    });
  };

  const handleCloseCourseDialog = () => {
    onDialogClose();
  };

  const handleUserSelect = (item) => {
    delete item.title;
    setData({ ...data, username: item.subtitle, coordinatorId: item._id });
    handleCloseDialog();
  };

  const handleSave = () => {
    dispatch(coursesActions.addCourse(data, handleCloseCourseDialog));
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, title: input.value });
  };

  const handleFileChange = ({ target: input }) => {
    setData({ ...data, image: input.files[0] });
  };

  return (
    <>
      <UsersDialog
        open={open}
        onClose={handleCloseDialog}
        onUserSelect={handleUserSelect}
      />
      <AppDialog
        open={dialogOpen}
        onClose={onDialogClose}
        title="New Course"
        maxWidth="xs"
      >
        <Box>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField autoFocus label="Title" onChange={handleChange} />
            </Grid>
            <Grid item>
              <Button
                disabled={!data.title.length}
                variant="outlined"
                onClick={() => setOpen(true)}
              >
                {data.username || "Select Coordinator"}
              </Button>
            </Grid>
            <Grid item>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSave}
                disabled={!data.title.length || !data.coordinatorId.length}
              >
                {awaiting ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </AppDialog>
    </>
  );
};

const AppList = ({
  data = [],
  onItemSelect,
  secondaryAction,
  loading = false,
  onSecondaryAction,
  ...rest
}) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) return <Loading />;

  if (!data.length) return <Empty />;

  return data?.map((item, index) => (
    <List dense {...rest}>
      {item && (
        <ListItem key={item?._id || index} {...rest} sx={{ cursor: "pointer" }}>
          <ListItemText
            primary={textFormat.abbreviate(item?.title, matchesSM ? 25 : 80)}
            secondary={textFormat.abbreviate(item?.subtitle, matchesSM ? 25 : 80)}
            {...rest}
          />
          {secondaryAction && (
            <ListItemSecondaryAction>
              <Grid container spacing={1}>
                <Grid item>
                  <Box>
                    <Button
                      component={Link}
                      to={`/admin/courses/${item._id}/edit`}
                      size="small"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </Box>
                </Grid>

                <Grid item>
                  <Box onClick={() => onSecondaryAction(item, index)}>
                    {secondaryAction}
                  </Box>
                </Grid>
              </Grid>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      )}
    </List>
  ));
};

export default AdminCourses;
