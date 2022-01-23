import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
      <Grid
        container
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="body1" align="center" fontWeight={200}>
            A platform to enrich yourself with biblical knowledge
          </Typography>
        </Grid>
        <br />
        <Grid item>
          <Typography>copyright@2022</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
