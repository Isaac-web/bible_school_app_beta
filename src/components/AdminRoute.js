import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as authService from "../services/authService";

const AdminRoute = ({ render, component: Component }) => {
  const user = authService.getCurrentUser();

  if (user?.status !== "admin") return <Redirect to="/access-denied" />;
  return <Route component={Component} render={render} />;
};

export default AdminRoute;
