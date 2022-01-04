import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const NoMatchFound = () => {
  return (
    <Box>
      <Grid
        container
        sx={{ height: "30vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">Nothing Yet</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoMatchFound;
