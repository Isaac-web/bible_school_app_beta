import React from "react";
import { Switch, Route } from "react-router-dom";

import Courses from "./pages/courses";
import CourseDetails from "./pages/courseDetails";
import Header from "./components/Header";
import Login from "./pages/login";
import Register from "./pages/register";
import Enrollments from "./pages/enrollments";
import CurrentCourse from "./pages/currentCourse";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/courses/take/:id" component={CurrentCourse} />
        <Route path="/courses/:id" component={CourseDetails} />
        <Route path="/courses/" component={Courses} />
        <Route path="/enrollments" component={Enrollments} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  );
};

export default App;
