import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import * as currentModuleActions from "../store/currentModule";
import * as enrollmentService from "../services/enrollmentService";

const QuizResult = ({ onNextModule }) => {
  const dispatch = useDispatch();
  const { currentModule } = enrollmentService.getcurrentEnrollment();
  const { data } = useSelector((state) => state.quiz);

  const formattedScore = data?.score?.toFixed(1) * 100 || 0;

  const score = data?.score > 0 ? data?.score?.toFixed(1) : 0;

  const handleNextModule = () => {
    onNextModule();
    dispatch(currentModuleActions.loadCurrentModule(currentModule));
  };

  return (
    <Box style={{ margin: "5em 0" }}>
      <Grid
        container
        direction="column"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <Typography gutterBottom variant="h4">
            {formattedScore}%
          </Typography>
        </Grid>
        {score >= 0.7 && (
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography gutterBottom variant="body1">
                  Good job. Continue on the next module
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleNextModule}
                  endIcon={<ArrowForward />}
                  variant="outlined"
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}

        {score < 0.7 && (
          <Grid item>
            <Typography gutterBottom variant="body1">
              Your score is below the passmark (70%)
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="body2"
              style={{ color: "rgba(0, 0, 0, 0.3)" }}
            >
              Refresh to retry
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default QuizResult;
