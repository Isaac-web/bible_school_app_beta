import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Courses from "./pages/courses";
import CourseDetails from "./pages/courseDetails";
import Header from "./components/Header";
import Login from "./pages/login";
import Register from "./pages/register";
import Enrollments from "./pages/enrollments";
import CurrentCourse from "./pages/currentCourse";
import Coordinator from "./pages/coordinator";
import Admin from "./pages/admin";
import Home from "./pages/home";
import { hideToast } from "./store/toast";
import NotFound from "./components/NotFound";
import AccessDenied from "./components/AccessDenied";
import AdminRoute from "./components/AdminRoute";
import CoordinatorRoute from "./components/CoordinatorRoute";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <>
      <Snackbar
        message={message}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
      />
      <CssBaseline />
      <Header />
      <Switch>
        <CoordinatorRoute path="/coordinator" component={Coordinator} />
        <Route path="/courses/take/:id" component={CurrentCourse} />
        <Route path="/courses/details/:id" component={CourseDetails} />
        <Route path="/courses/" component={Courses} />
        <Route path="/enrollments" component={Enrollments} />
        <AdminRoute path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/access-denied" component={AccessDenied} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
      <Footer/>
    </>
  );
};

export default App;
