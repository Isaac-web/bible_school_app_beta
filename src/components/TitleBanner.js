import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import config from "../config.json";

const TitleBanner = ({ backgroundImageUri }) => {
  const classes = useStyles();
  const { data: currentModuleDetails } = useSelector(
    (state) => state.currentModule
  );

  backgroundImageUri = backgroundImageUri?.replaceAll("\\", "/");
  const filesBaseURL = config.api.filesBaseURL;
  const imagePath = `${filesBaseURL}${backgroundImageUri}`;

  useEffect(() => {}, [currentModuleDetails]);
  return (
    <Box
      className={classes.banner}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" align="center" className={classes.title}>
        {currentModuleDetails.title}
      </Typography>
      <Typography variant="h6" align="center" className={classes.subtitle}>
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
  subtitle: {
    color: "white",
  },
  title: {
    color: "white",
  },
}));

export default TitleBanner;
