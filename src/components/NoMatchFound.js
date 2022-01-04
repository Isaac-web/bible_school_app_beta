import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const NoMatchFound = () => {
  return (
    <Box>
      <Grid
        container
        sx={{ height: "20vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="body1">No Match Found</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoMatchFound;
