import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

const NotFound = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "2em 0" }}
      spacing={1}
    >
      <Grid item>
        <Typography>403</Typography>
      </Grid>
      <Grid item>|</Grid>
      <Grid item>
        <Typography>Access Denied</Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
