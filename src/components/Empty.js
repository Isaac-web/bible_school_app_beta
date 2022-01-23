import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Empty = ({ imageSize, imagePath, title, subtitle }) => {
  const getImageSize = () => {
    switch (imageSize) {
      case "small":
        return "2em";
      case "medium":
        return "3em";
      case "large":
        return "5em";
      case "extra-large":
        return "7em";
      default:
        return "5em";
    }
  };

  return (
    <Box>
      <Grid
        container
        sx={{ height: "30vh" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          {imagePath && (
            <img
              style={{ width: getImageSize(), height: getImageSize() }}
              src={imagePath}
              alt="Empty icon"
            />
          )}
        </Grid>
        <Grid item style={{ maxWidth: 250 }}>
          <Typography align="center" variant="h6">
            {title || "Nothing Yet"}
          </Typography>
          <Typography align="center" variant="subtitle1">
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empty;
