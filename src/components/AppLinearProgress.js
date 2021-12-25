import React from "react";
import { Grid, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import config from "../config.json";

const AppLinearProgress = ({ progress = 0 }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={10}>
        <LinearProgress
          className={classes.LinearProgress}
          variant="determinate"
          value={progress}
        />
      </Grid>
      <Grid item xs={2} container justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" align="center" fontWeight="bold">
          {progress}%
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
  },
  cardMedia: {
    height: "12em",
    backgroundColor: config.colors.medium,
    borderRadius: `${theme.spacing(2)}px 0`,
  },
  cardContent: {
    padding: 5,
    paddingRight: 8,
  },
  linearProgress: {
    display: "none",
  },
  paper: {
    borderRadius: theme.spacing(2),
  },
}));

export default AppLinearProgress;
