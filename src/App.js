import React from "react";
import { Switch, Route } from "react-router-dom";

import Courses from "./pages/courses";
import CourseDetails from "./pages/courseDetails";
import Header from "./components/Header";
import Login from "./pages/login";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/courses/:id" component={CourseDetails} />
        <Route path="/courses/" component={Courses} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
