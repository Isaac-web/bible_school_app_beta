import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowForward } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

import config from "../config.json";
import topBannerImage from "../assets/images/topBannerImage.jpg";

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToCoursesPage = () => {
    history.push("/courses");
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.topBanner}>
        <Container sx={{ paddingTop: 15 }}>
          <Typography variant="h2" align="center">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </Typography>
        </Container>
      </Box>
      <Box style={{ padding: "10em 0" }}>
        <Grid container>
          <Grid item xs={12} sm={6} style={{ marginBottom: 20 }}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item>
                <Typography variant="h6" align="center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente, sit.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} style={{ marginBottom: 20 }}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item>
                <Button
                  onClick={navigateToCoursesPage}
                  sx={{ padding: 2, borderRadius: 10 }}
                  endIcon={<ArrowForward />}
                >
                  View Couses
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    // backgroundColor: "tomato",
  },
  footer: {
    padding: "5em 0",
    backgroundColor: config.colors.light,
  },
  topBanner: {
    height: "90vh",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${topBannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  },
  topBannerText: {
    marginTop: "3em",
  },
}));

export default Home;
