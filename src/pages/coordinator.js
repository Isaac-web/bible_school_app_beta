import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ViewModule, Subscriptions } from "@mui/icons-material";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as modulesActions from "../store/modules";
import * as authService from "../services/authService";

import CoordinatorModules from "../components/CoordinatorModules";
import CoordinatorEnrollments from "../components/CoordinatorEnrollments";

const Coordinator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const coordinator = authService.getCurrentUser();

    if (!coordinator) return;

    dispatch(modulesActions.loadModules(coordinator.courseId));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Switch>
        <Route path="/coordinator/course" component={CoordinatorModules} />
        <Redirect from="/coordinator" exact to="/coordinator/course" />
        <Route
          path="/coordinator/enrollments"
          component={CoordinatorEnrollments}
        />
      </Switch>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  drawerListItem: {
    cursor: "pointer",
  },
  activeDrawerListItem: {
    "& .MuiListItem-root": {},
  },
}));

export default Coordinator;
