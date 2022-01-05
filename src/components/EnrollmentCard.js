import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "../config.json";
import AppLinearProgress from "./AppLinearProgress";
import { getFilePath } from "../utils/filePath";

const EnrollmentCard = ({ title, progress, imageUri, ...rest }) => {
  const classes = useStyles();

  const imagePath = getFilePath(imageUri);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        variant="outlined"
        classes={{ root: classes.paper }}
        className={classes.card}
        {...rest}
      >
        <CardMedia
          className={classes.cardMedia}
          image={imagePath || "/no-image"}
        />
        <CardContent className={classes.cardContent}>
          <AppLinearProgress progress={progress} />
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
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

export default EnrollmentCard;
