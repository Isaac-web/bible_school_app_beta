import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const SummeryCard = ({ title, subtitle, onClick, link, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.container} onClick={onClick} {...rest}>
      <Grid
        component={Link}
        to={link}
        container
        className={classes.textGrid}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography variant="h3" color="primary">
            {title}
          </Typography>
          <Typography variant="body1">{subtitle}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "8em",
    height: "7em",
    cursor: "pointer",
    textDecoration: "none",
  },
  textGrid: {
    height: "100%",
    textDecoration: "none",
  },
}));

export default SummeryCard;
