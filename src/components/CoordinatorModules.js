import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add, Save, Delete } from "@mui/icons-material";

import config from "../config.json";
import * as currentmoduleActions from "../store/currentModule";
import TitleBanner from "./TitleBanner";
import AppDialog from "./AppDialog";
import QuestionBox from "./QuestionBox";

const CoordinatorModules = () => {
  const drawerWidth = 240;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    objectives: "",
  });

  const {
    data: currentModule,
    isSaved,
    awaiting,
  } = useSelector((state) => state.currentModule);

  const dialogActions = [
    {
      content: () => (
        <Button
          variant="outlined"
          onClick={handleCloseDialog}
          sx={{ width: 100 }}
        >
          Cancel
        </Button>
      ),
    },
    {
      content: () => (
        <Button onClick={handleSubmit} sx={{ width: 100 }}>
          Save
        </Button>
      ),
    },
  ];

  const handleSaveChanges = () => {
    const invalidQuestions = currentModule.questions.filter((q) => !q.ans);
    if (invalidQuestions.length) return;

    dispatch(currentmoduleActions.saveChanges());
  };

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const handleAnswerChange = (ans, index) => {
    dispatch(currentmoduleActions.changeAnswer(ans, index));
  };

  const handleDeleteQuestion = (questionId, index) => {
    dispatch(currentmoduleActions.deleteQuestion(questionId, index));
  };

  const handleChange = ({ target: input }) => {
    setQuestionData({ ...questionData, [input.name]: input.value });
  };

  const handleSubmit = () => {
    if (!currentModule._id) return;
    if (questionData.question.length < 3 || questionData.objectives.length < 3)
      return;

    const objectives = questionData.objectives.split(",");
    const question = questionData.question;

    const data = { objectives, question, ans: "" };
    dispatch(currentmoduleActions.addQuestion(data));

    clear();
  };

  const clear = () => {
    setQuestionData({ question: "", objectives: "" });
    handleCloseDialog();
  };

  return (
    <Container
      style={{ paddingLeft: drawerWidth + 10 }}
      className={classes.container}
    >
      <Box className={classes.main}>
        <TitleBanner />
        <div>File Box</div>
        <Paper elevation={2}>
          {currentModule.questions?.map((item, index) => (
            <Box sx={{ position: "relative" }}>
              <QuestionBox
                question={item.question}
                objectives={item.objectives}
                answer={item.ans}
                onAnswerChange={(ans) => handleAnswerChange(ans, index)}
              />
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() =>
                  handleDeleteQuestion(item._id, index, currentModule)
                }
              >
                <Delete size="small" />
              </IconButton>
            </Box>
          ))}

          <Box>
            <Grid
              container
              justifyContent="center"
              alignItems={"center"}
              spacing={2}
            >
              <Grid item>
                <Button
                  startIcon={<Add />}
                  sx={{ width: 150 }}
                  onClick={handleOpenDialog}
                >
                  Add Question
                </Button>
              </Grid>
              <Grid item>
                <Button
                  endIcon={<Save />}
                  sx={{ width: 150 }}
                  onClick={handleSaveChanges}
                  variant="outlined"
                  disabled={isSaved}
                >
                  {awaiting ? <CircularProgress size={25} /> : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <AppDialog
          dialogActions={dialogActions}
          open={open}
          onClose={handleCloseDialog}
          title="Add a question"
        >
          <form onSubmit={() => console.log("Handle Submit")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label="Question"
                  value={questionData.question}
                  onChange={handleChange}
                  name="question"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Objectives"
                  value={questionData.objectives}
                  onChange={handleChange}
                  name="objectives"
                />
              </Grid>
            </Grid>
          </form>
        </AppDialog>
      </Box>

      <Box className={classes.sidebar}>
        <ModuleListBox />
      </Box>
    </Container>
  );
};

const ModuleListBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: currentModule } = useSelector((state) => state.currentModule);
  const currentItem = currentModule._id;
  const {
    data: { modules },
  } = useSelector((state) => state.entities.modules);

  const handleLoadCurrentModule = (id) => {
    dispatch(currentmoduleActions.loadCurrentModule(id));
  };

  return (
    <Box>
      <List>
        {modules?.map((m) => (
          <ListItem
            key={m._id}
            className={`${classes.sidebarListItem} ${
              currentItem === m._id ? classes.activeSidebarListItem : ""
            }`}
            onClick={() => handleLoadCurrentModule(m._id)}
          >
            <ListItemText
              primary={m.title}
              classes={{
                primary: `${classes.sidebarListItemPrimaryText} ${
                  currentItem === m._id
                    ? classes.activeSidebarListItemPrimaryText
                    : ""
                }`,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    height: `calc(100vh - 5em)`,
  },
  main: {
    flex: 0.7,
    height: `calc(100vh - 5em)`,
    overflow: "auto",
  },
  sidebar: {
    flex: 0.3,
    padding: "0 0.5em",
    boxSizing: "border-box",
  },
  sidebarListItem: {
    color: "white",
    padding: 0,
    cursor: "pointer",
    paddingLeft: 10,
    "&:hover": {
      backgroundColor: config.colors.light,
    },
  },
  activeSidebarListItem: {
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    backgroundColor: "rgba(0, 100, 255, 0.1)",
  },
  activeSidebarListItemPrimaryText: {
    color: theme.palette.primary.main,
  },
}));

export default CoordinatorModules;
