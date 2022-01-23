import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import Empty from "./Empty";
import NoMatchFoundIcon from "../assets/images/no-search-icon.png";

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
          <Empty
            imagePath={NoMatchFoundIcon}
            imageSize="medium"
            title="No match found"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoMatchFound;
