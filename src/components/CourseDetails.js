import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { LocalLibrary, LockClock } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

import AutoScrollContainer from "./AutoScrollContainer";
import config from "../config.json";
import * as authService from "../services/authService";
import TitleBanner from "../components/TitleBanner";

const CouseDetails = ({
  title,
  imageUri,
  coordinatorName,
  coordinatorAddress,
  coordinatorPhone,
  onEnroll,
  numberOfEnrollments,
  description,
  modules,
}) => {
  const classes = useStyles();
  const user = authService.getCurrentUser();
  const { loading } = useSelector((state) => state.entities.modules);

  console.log(loading);

  const descriptionText = "No description yet.";

  return (
    <AutoScrollContainer>
      <Box style={{ marginBottom: "2em" }}>
        <TitleBanner title={title} hideSubtitle backgroundImageUri={imageUri} />

        <Container maxWidth="sm" sx={{ padding: `2em 1em` }}>
          <Box style={{ marginBottom: "2em" }}>
            {description?.startsWith(descriptionText) &&
            description.length === descriptionText.length
              ? ""
              : description}
          </Box>

          <Box style={{marginBottom: "2em"}}>
            {loading ? (
              <Grid
                container
                justifyContent="center"
                alignItems={"center"}
                style={{ padding: "1em 0" }}
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            ) : (
              <>
                {modules?.length ? (
                  <Box style={{ margin: "1em 0" }}>
                    <Typography variant="h6">
                      Modules on this course:{" "}
                    </Typography>

                    {modules.map((m, index) => (
                      <Box
                        key={index}
                        sx={{
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          padding: 1,
                          borderRadius: 1,
                          marginBottom: 1,
                        }}
                      >
                        {index + 1}. {m.title}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="subtitle1" align="center">
                    There are no modules on this course yet.
                  </Typography>
                )}
              </>
            )}
          </Box>

          <Box className={classes.descriptionBox}>
            <Typography varaint="body1" align="center">
              {user
                ? "Click on the enroll button below to get started in this course."
                : "Please create an account to get started."}
            </Typography>
          </Box>

          <Box className={classes.coordinatorInfoBox}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Avatar sx={{ width: "5em", height: "5em" }}></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5" align="center" fontWeight="600">
                  {coordinatorName}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {coordinatorAddress}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {coordinatorPhone}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  (Coordinator)
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container>
              <Grid item sx={{ flex: 0.5 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <LockClock />
                  </Grid>
                  <Grid item>
                    <Grid>
                      <Typography
                        varaint="subtitle1"
                        sx={{ color: config.dark }}
                      >
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ flex: 0.5 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <LocalLibrary />
                  </Grid>
                  <Grid item>
                    <Grid>
                      <Typography
                        varaint="subtitle1"
                        sx={{ color: config.dark }}
                      >
                        {numberOfEnrollments}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.enrollmentButtonBox}>
            {user && <Button onClick={onEnroll}>Enroll Now</Button>}
          </Box>
        </Container>
      </Box>
    </AutoScrollContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  coordinatorInfoBox: {
    backgroundColor: config.colors.light,
    padding: theme.spacing(5),
    borderRadius: 10,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  descriptionBox: {},
  enrollmentButtonBox: {
    paddingTop: theme.spacing(3),
    paddingButton: theme.spacing(3),
  },
}));

export default CouseDetails;
