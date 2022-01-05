import React from "react";
import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

import config from "../config.json";

const Footer = () => {
  const location = useLocation();

  const showFooter =
    location.pathname.includes("/home") ||
    (location.pathname.includes("/courses") &&
      !location.pathname.includes("/courses/take"));

  if (!showFooter) return null;

  return (
    <Box
      sx={{
        padding: "1.5em",
        marginTop: "1em",
        backgroundColor: config.colors.light,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>Copyright@2021</Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
