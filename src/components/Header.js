import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar>Header</Toolbar>
      </AppBar>
      <Box style={{ paddingBottom: "4em" }} className={classes.appbarMargin} />
    </>
  );
};

const useStyles = () =>
  makeStyles((theme) => ({
    appbarMargin: {
      ...theme.mixins.tootlbar,
    },
  }));

export default Header;
