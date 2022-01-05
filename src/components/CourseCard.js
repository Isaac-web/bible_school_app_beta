import React from 'react'
import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { LocalLibrary } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { getFilePath } from "../utils/filePath";

const CourseCard = ({
  title,
  imageUri,
  coordinatorName,
  coordinatorImageUri,
  numberOfEnrollments,
  ...rest
}) => {
  const classes = useStyles();
  const imagePath = getFilePath(imageUri);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ cursor: "pointer" }} {...rest}>
        <CardMedia className={classes.cardMedia} image={imagePath || "/none"} />
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item container>
              <Grid
                className={classes.coordinatorInfoContainer}
                item
                container
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    sx={() => ({ height: 25, width: 25 })}
                    src={coordinatorImageUri}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">{coordinatorName}</Typography>
                </Grid>
              </Grid>
              <Grid
                className={classes.enrollmentInfoContainer}
                item
                container
                justifyContent={"center"}
                alignItems="center"
              >
                <Grid item>
                  <LocalLibrary
                    sx={(theme) => ({
                      height: 18,
                      width: 18,
                      color: "rgba(0, 0, 0, 0.4)",
                    })}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {numberOfEnrollments}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: "14em",
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  coordinatorInfoContainer: {
    flex: 0.8,
  },
  enrollmentInfoContainer: {
    flex: 0.2,
  },
}));

export default CourseCard
