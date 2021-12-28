import React, { useEffect } from "react";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ViewModule, Subscriptions } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as modulesActions from "../store/modules";

import CoordinatorModules from "../components/CoordinatorModules";

const menuList = [
  { title: "Course", path: "/coordinator/course", Icon: <ViewModule /> },
  {
    title: "Enrolments",
    path: "/coordinator/enrollments",
    Icon: <Subscriptions />,
  },
];

const Coordinator = () => {
  const classes = useStyles();
  const drawerWidth = 240;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleNavigate = (path) => {
    history.push(path);
  };

  useEffect(() => {
    dispatch(modulesActions.loadModules());
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            flexShrink: 0,
          },
        }}
      >
        <Box sx={{ paddingTop: (theme) => theme.spacing(8), overflow: "auto" }}>
          <Toolbar>
            <Typography variant="h6" fontWeight={"bold"}>
              Course Title
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {menuList.map((m) => (
              <ListItem
                key={m.path}
                className={`${classes.drawerListItem} ${classes.activeDrawerListItem}`}
                onClick={() => handleNavigate(m.path)}
              >
                <ListItemIcon>{m.Icon}</ListItemIcon>
                <ListItemText primary={m.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <CoordinatorModules />
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
