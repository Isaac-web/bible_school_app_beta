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
  Alert,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import config from "../config.json";
import * as coursesActions from "../store/courses";
import { loadCourses } from "../store/courses";
import * as usersActions from "../store/users";
import NoMatchFound from "../components/NoMatchFound";
import Empty from "../components/Empty";
import UsersDialog from "./UsersDialog";
import Loading from "./Loading";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleCourseDelete = (item, index) => {
    dispatch(coursesActions.deleteCourse(item._id, index));
  };

  const handleSearch = ({ target: input }) => {
    setSearchInput(input.value);
    const results = courses.filter((item) =>
      item.title.toLowerCase().trim().includes(input.value.trim().toLowerCase())
    );

    setSearchResults(results);
  };

  const finalData = searchResults.length ? searchResults : courses;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Button onClick={() => setOpen(true)} sx={{ marginBottom: "1.5em" }}>
        New Course
      </Button>
      {errorMessage && (
        <Alert sx={{ marginBottom: "1em" }} severity="error">
          {errorMessage}
        </Alert>
      )}
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
      <Paper>
        {!searchResults.length && searchInput ? (
          <NoMatchFound />
        ) : (
          <AppList
            loading={loading}
            data={finalData}
            onItemSelect={handleCourseDelete}
            secondaryAction={
              <Button size="small" variant="outlined">
                Delete
              </Button>
            }
          />
        )}
      </Paper>
      <NewCourseDialog open={open} onClose={handleCloseDialog} />
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
  ...rest
}) => {
  if (loading) return <Loading />;

  if (!data.length) return <Empty />;

  return data?.map((item, index) => (
    <List dense {...rest}>
      {item && (
        <ListItem key={item?._id || index} {...rest} sx={{ cursor: "pointer" }}>
          <ListItemText
            primary={item?.title}
            secondary={item?.subtitle}
            {...rest}
          />
          {secondaryAction && (
            <ListItemSecondaryAction onClick={() => onItemSelect(item, index)}>
              {secondaryAction}
            </ListItemSecondaryAction>
          )}
        </ListItem>
      )}
    </List>
  ));
};

export default AdminCourses;
