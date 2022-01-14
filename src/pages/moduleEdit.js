import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as currentModuleActions from "../store/currentModule";
import * as authService from "../services/authService";
import config from "../config.json";

const ModuleEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ title: "", content: "" });

  const { data: currentModule } = useSelector((state) => state.currentModule);

  const handleEffect = async () => {
    if (!currentModule || !currentModule._id) return;

    await dispatch(currentModuleActions.loadCurrentModule(currentModule._id));
    setData({
      ...data,
      title: currentModule.title,
      content: currentModule.content,
    });
  };

  useEffect(() => handleEffect(), []);

  const clear = () => {
    history.push("/coordinator/course");
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmitContent = (e) => {
    e.preventDefault();
    const { content, title } = data;

    if (!content.length && !title.length) return;

    dispatch(
      currentModuleActions.updateModule(
        currentModule._id,
        { content, title },
        clear
      )
    );
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        spacing={3}
        style={{ paddingTop: "1em" }}
      >
        <Grid item>
          <Typography variant="h4">Edit Module</Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <InputBase
                className={classes.inputBase}
                fullWidth
                placeholder="Title"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <InputBase
                className={classes.inputBase}
                fullWidth
                multiline
                rows={15}
                placeholder="Content"
                value={data.content}
                name="content"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="flex-end"
            spacing={3}
            style={{ marginTop: "0.5em" }}
          >
            <Grid item>
              <Button style={{ width: 100 }} onClick={clear} variant="outlined">
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button style={{ width: 100 }} onClick={handleSubmitContent}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  inputBase: {
    backgroundColor: config.colors.light,
    padding: "0.8em 1em",
    color: config.colors.dark,
    borderRadius: theme.spacing(1),
  },
}));

export default ModuleEdit;
