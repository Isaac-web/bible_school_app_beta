import React, { useState, useEffect } from "react";
import {
  Avatar,
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Toolbar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Home,
  Menu,
  Logout,
  Login,
  GolfCourse,
  LibraryBooks,
  Analytics,
  FeaturedPlayList,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation, Link } from "react-router-dom";

import * as authService from "../services/authService";
import { logoutUser } from "../store/auth";
import logo from "../assets/images/logo.png";

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);

  return (
    <>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
        <Toolbar sx={{ color: (theme) => theme.palette.primary.main }}>
          <Link to="/home">
            <img src={logo} alt="Logo" style={{ width: 50, height: 50 }} />
          </Link>

          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <AuthBox />
            <IconButton onClick={handleOpenDrawer}>
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MenuDrawer
        open={open}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
      />
      <Box style={{ paddingBottom: "4em" }} className={classes.appbarMargin} />
    </>
  );
};

const AuthBox = () => {
  const location = useLocation();

  const user = authService.getCurrentUser();

  useEffect(() => {}, [location.pathname]);

  if (!user) return null;
  return (
    <>
      <Box style={{ marginLeft: "auto" }}>
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid item>
            <Avatar src={user.imageUri} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const MenuDrawer = ({ open, onClose, onOpen }) => {
  const classes = useStyles();
  const user = authService.getCurrentUser();
  const userStatus = user?.status || "normal";
  const history = useHistory();

  const defaultMenu = [
    { label: "Home", link: "/", Icon: <Home /> },
    { label: "Courses", link: "/courses", Icon: <GolfCourse /> },
  ];

  if (user)
    defaultMenu.push({
      label: "My Enrollments",
      link: "/enrollments",
      Icon: <LibraryBooks />,
    });
  if (user)
    defaultMenu.push({
      label: "Profile",
      link: "/profile",
      Icon: <LibraryBooks />,
    });

  const coordinatorMenu = [
    { label: "Course", link: "/coordinator/course", Icon: <Analytics /> },
    {
      label: "Enrollments",
      link: "/coordinator/enrollments",
      Icon: <FeaturedPlayList />,
    },
    {
      label: "Login As Admin",
      link: "/login",
      Icon: <FeaturedPlayList />,
    },
  ];

  const adminMenu = [
    { label: "Courses (Admin)", link: "/admin/courses", Icon: <Analytics /> },
    {
      label: "Enrollments",
      link: "/admin/enrollments",
      Icon: <FeaturedPlayList />,
    },
  ];

  const redirect = () => {
    history.replace("/login");
  };

  const handleLogout = () => {
    logoutUser(redirect);
    onClose();
  };

  return (
    <SwipeableDrawer
      className={classes.menuDrawer}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      anchor="right"
    >
      <Box sx={{ width: 240 }}>
        {user && (
          <Box sx={{ padding: "1em 0" }}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  src={user.imageUri}
                  sx={{ height: "3em", width: "3em" }}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ marginTop: (theme) => theme.spacing(0.5) }}
                  label={user?.email}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <Divider />
        <MenuList onItemClick={onClose} menu={defaultMenu} />
        <Divider />
        {userStatus === "coordinator" && (
          <MenuList onItemClick={onClose} menu={coordinatorMenu} />
        )}
        <Divider />
        {userStatus === "admin" && (
          <MenuList onItemClick={onClose} menu={adminMenu} />
        )}
      </Box>

      <Box sx={{ marginTop: "2em" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            {!user && (
              <Button
                sx={{ width: 150 }}
                onClick={() => onClose()}
                component={Link}
                to="/login"
                endIcon={<Login />}
              >
                Login
              </Button>
            )}
            {user && (
              <Button
                sx={{ width: 150 }}
                endIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
};

const MenuList = ({ menu = [], onItemClick = () => {} }) => {
  return (
    <List>
      {menu?.map((item) => (
        <Link
          key={item.link}
          onClick={onItemClick}
          to={item.link || "/"}
          style={{ textDecoration: "none" }}
        >
          <ListItem>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText button="true" primary={item.label} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

const useStyles = () =>
  makeStyles((theme) => ({
    appbarMargin: {
      ...theme.mixins.tootlbar,
    },
    menuDrawer: {
      zIndex: theme.zIndex.drawer + 10,
    },
  }));

export default Header;
