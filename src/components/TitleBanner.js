import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const TitleBanner = () => {
  const classes = useStyles();
  const { data: currentModuleDetails } = useSelector(
    (state) => state.currentModule
  );
  return (
    <Box className={classes.banner}>
      <Typography variant="h4" align="center">
        {currentModuleDetails.title}
      </Typography>
      <Typography variant="h6" align="center">
        {currentModuleDetails.subtitle}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  banner: {
    padding: "4em 0",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

export default TitleBanner;
