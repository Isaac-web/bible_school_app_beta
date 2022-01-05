import React from "react";
import { Box, Grid } from "@mui/material";
import config from "../config.json";

const Footer = () => {
  return (
    <Box sx={{ padding: "1.5em", backgroundColor: config.colors.light }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>Copyright@2021</Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
