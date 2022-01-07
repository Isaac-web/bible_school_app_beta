import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { ArrowForward } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

import config from "../config.json";
import topBannerSvg from "../assets/images/topBannerSVGImage.svg";
import coursesSVG from "../assets/images/courseSVGImage.svg";

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  const navigateToRegisterPage = () => {
    history.push("/register");
  };

  return (
    <Container>
      <Box sx={{ height: "60vh", backgroundColor: "", paddingTop: "3em" }}>
        <Grid
          container
          justifyContent={matchesSM ? "center" : "space-between"}
          alignItems="center"
          spacing={3}
        >
          <Grid item sm={12} lg={6} sx={{}}>
            <Typography variant="h6" align={matchesSM ? "center" : "left"}>
              GNAAS KNUST
            </Typography>
            <Typography
              variant="h3"
              align={matchesSM ? "center" : "left"}
              sx={{ margin: 0, color: "black" }}
            >
              Bible School
            </Typography>
            <Typography variant="body1" align={matchesSM ? "center" : "left"}>
              Are you looking to learn more about the word of God?{" "}
              {!matchesSM && <br />}
              If so, you are at the right place.
            </Typography>

            <Grid
              container
              justifyContent={matchesSM ? "center" : "flex-start"}
            >
              <Grid item>
                <Button
                  sx={{
                    padding: "0.8em 1.5em",
                    borderRadius: "0.8em",
                    margin: "0.8em 0",
                  }}
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  onClick={navigateToRegisterPage}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} lg={6} sx={{}}>
            <Grid
              container
              justifyContent={matchesSM ? "center" : "space-around"}
            >
              <Box sx={{ backgroundColor: "" }}>
                <img
                  style={{ width: `${matchesSM ? "15em" : "27em"}` }}
                  src={topBannerSvg}
                  alt="Banner SVG"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: "3em" }}>
        <Container>
          <Grid
            container
            flexDirection={matchesSM && "column-reverse"}
            justifyContent={matchesSM ? "center" : "space-around"}
            alignItems="center"
          >
            <Grid item sm={12} lg={6}>
              <Grid
                container
                justifyContent={matchesSM ? "center" : "space-around"}
              >
                <Box sx={{ backgroundColor: "" }}>
                  <img
                    style={{ width: `${matchesSM ? "15em" : "27em"}` }}
                    src={coursesSVG}
                    alt="Couses SVG"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Typography
                variant="h5"
                sx={{ color: "black" }}
                align={matchesSM ? "center" : "left"}
              >
                Courses
              </Typography>
              <Typography variant="body1" align={matchesSM ? "center" : "left"}>
                Courses come with resources and quizes that actually help you
                {!matchesSM && <br />}
                learn.
              </Typography>
              <Grid
                container
                justifyContent={matchesSM ? "center" : "flex-start"}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    sx={{ padding: "0.6em", margin: "1em 0", borderRadius: 3 }}
                    onClick={() => history.push("/courses")}
                  >
                    View Courses
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* <Box>Call to Action</Box> */}
    </Container>
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
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)))`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  },
  topBannerText: {
    marginTop: "3em",
  },
}));

export default Home;
