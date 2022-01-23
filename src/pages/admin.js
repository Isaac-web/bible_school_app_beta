import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";

import SummeryCard from "../components/SummeryCard";
import * as summeryActions from "../store/summery";
import AdminCourses from "../components/AdminCourses";
import AdminEnrollments from "../components/AdminEnrollments";
import UsersDialog from "../components/UsersDialog";
import * as courseDetailsActions from "../store/courseDetails";
import Loading from "../components/Loading";

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
      <Box style={{ marginTop: "2em" }}>
        <Switch>
          <Route path="/admin/courses/:id/edit" component={EditCourse} />
          <Route path="/admin/courses" component={AdminCourses} />
          <Route path="/admin/enrollments" render={AdminEnrollments} />
          <Route path="/admin/admins" render={() => <>Admins</>} />
          <Redirect to="/admin/courses" />
        </Switch>
      </Box>
    </Container>
  );
};

const EditCourse = () => {
  const history = useHistory();
  const { id: courseId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { data: courseDetails, loading } = useSelector(
    (state) => state.entities.courseDetails
  );

  const [data, setData] = useState({
    title: "",
    groupLink: "",
    // image: null,
    coordinatorName: "",
    coordinator: "",
  });

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleFileChange = ({ target: input }) => {
    // setData({ ...data, image: input.files[0] });
  };

  const handleUserSelect = (user) => {
    const userFullName = `${user.firstname} ${user.lastname}`;
    setData({ ...data, coordinatorName: userFullName, coordinator: user._id });
    handleCloseDialog();
  };

  const redirect = () => {
    history.goBack();
  };

  const handleSave = () => {
    delete data.coordinatorName;
    dispatch(
      courseDetailsActions.updateCourseDetails(courseId, data, redirect)
    );
  };

  const initialializeCurrentCourse = async () => {
    await dispatch(courseDetailsActions.loadCourseDetails(courseId));

    console.log("Course Loaded...");

    setData({
      ...data,
      title: courseDetails?.title,
      groupLink: courseDetails?.groupLink,
      description: courseDetails?.description || "No description yet.",
      coordinator: courseDetails?.coordinator?._id,
    });
  };

  useEffect(() => initialializeCurrentCourse(), [courseDetails._id, window.location.pathname]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Course
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange}
            label="Title"
            name="title"
            value={data.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange}
            label="Course Group Link"
            name="groupLink"
            value={data.groupLink}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange}
            multiline
            maxRows={5}
            label="Description"
            name="description"
            value={data.description}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleOpenDialog}>
            {data.coordinatorName || "Change Coordinator"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Grid>

        <Grid item container spacing={1} justifyContent={"flex-end"}>
          <Grid item>
            <Button
              onClick={redirect}
              variant="outlined"
              style={{ width: 100 }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button style={{ width: 100 }} onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <UsersDialog
        open={open}
        onClose={handleCloseDialog}
        onUserSelect={handleUserSelect}
      />
    </Container>
  );
};

export default Admins;
