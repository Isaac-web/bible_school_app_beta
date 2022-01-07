import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add, Save, Delete, Image, InsertDriveFile } from "@mui/icons-material";

import config from "../config.json";
import * as currentmoduleActions from "../store/currentModule";
import modules, * as modulesActions from "../store/modules";
import TitleBanner from "./TitleBanner";
import AppDialog from "./AppDialog";
import QuestionBox from "./QuestionBox";
import Loading from "./Loading";
import PromptDialog from "./PromptDialog";

const CurrentModuleContainer = () => {
  const dispatch = useDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [bgDialogOpen, setBgDialogOpen] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [imagePrview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    objectives: "",
  });

  const {
    data: currentModule,
    loading,
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

  const handleBackgroundFileChange = ({ target: input }) => {
    const file = input.files[0];
    setBackgroundFile(file);
  };

  const handleSubmitBackgroundFile = () => {
    const formData = new FormData();
    formData.append("imageUpload", backgroundFile);

    dispatch(currentmoduleActions.uploadBackgroundImage(formData));
    handleCloseBgDialog();
  };

  const handleSubmitFile = () => {
    const formData = new FormData();
    formData.append("fileUpload", file);

    dispatch(currentmoduleActions.uploadDocument(formData));
    handleCloseFileDialog();
  };

  const handleOpenBgDialog = () => setBgDialogOpen(true);

  const handleCloseBgDialog = () => {
    setBgDialogOpen(false);
    setBackgroundFile(null);
  };

  const handleFileChange = ({ target: input }) => {
    const file = input.files[0];
    setFile(file);
  };

  const handleOpenFileDialog = () => setFileDialogOpen(true);

  const handleCloseFileDialog = () => {
    setFileDialogOpen(false);
    setFile(null);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteModule = () => {
    // const removeModuleFromList = dispatch(
    //   modulesActions.removeModuleFromList(currentModule._id)
    // );
    // dispatch(
    //   currentmoduleActions.deleteCurrentModule(
    //     currentModule._id,
    //     removeModuleFromList
    //   )
    // );
  };

  if (loading) return <Loading />;

  if (!currentModule._id) return <NoModuleComponent />;

  return (
    <Box>
      <>
        <TitleBanner backgroundImageUri={currentModule.imageUri} />
        <Box>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            sx={{ padding: "2em" }}
          >
            <Grid item>
              <Tooltip
                title={`${currentModule.imageUri || "No background yet"}`}
              >
                <IconButton onClick={handleOpenBgDialog}>
                  <Image />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={`${currentModule.fileUri || "No file yet."}`}>
                <IconButton onClick={handleOpenFileDialog}>
                  <InsertDriveFile />
                </IconButton>
              </Tooltip>
            </Grid>

            {/* <Grid item>
              <Tooltip title={`Delete`}>
                <IconButton onClick={handleOpenDeleteDialog}>
                  <Delete sx={{ color: "rgba(225, 0, 0, 0.7)" }} />
                </IconButton>
              </Tooltip>
            </Grid> */}
          </Grid>
          <Paper>
            <AppDialog
              title="Update Background"
              open={bgDialogOpen}
              onClose={handleCloseBgDialog}
              maxWidth={"xs"}
            >
              <Grid container direction="column">
                <Grid item>
                  <input type="file" onChange={handleBackgroundFileChange} />
                  <Button
                    disabled={!backgroundFile}
                    onClick={handleSubmitBackgroundFile}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </AppDialog>

            <AppDialog
              title="Upload file"
              open={fileDialogOpen}
              onClose={handleCloseFileDialog}
              maxWidth={"xs"}
            >
              <Grid container direction="column">
                <Grid item>
                  <input type="file" onChange={handleFileChange} />
                  <Button disabled={!file} onClick={handleSubmitFile}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </AppDialog>

            <PromptDialog
              open={deleteDialogOpen}
              title={"Delete Module?"}
              message="Are you sure you want to delete this module? This action cannot be undone."
              onAccept={handleDeleteModule}
              onClose={handleCloseDeleteDialog}
            />
          </Paper>
          <Paper elevation={2}>
            {!currentModule.questions?.length && (
              <Box style={{ padding: "5em 0" }}>
                <Typography variant="h6" align="center">
                  No questions yet
                </Typography>
              </Box>
            )}
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

            <Box style={{ padding: "2em 0" }}>
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
        </Box>
      </>

      <AppDialog
        dialogActions={dialogActions}
        open={open}
        onClose={handleCloseDialog}
        title="Add a question"
      >
        <form>
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
  );
};

const NoModuleComponent = () => (
  <Box
    style={{
      padding: "5em",
      backgroundColor: config.colors.light,
    }}
  >
    <Typography variant="body1" align="center">
      No module Selected
    </Typography>
  </Box>
);

const useStyles = makeStyles((theme) => ({
  addFab: {
    color: theme.palette.primary.main,
    backgroundcolor: "white",
    position: "absolute",
    bottom: 5,
    right: 5,
  },
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
    position: "relative",
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

export default CurrentModuleContainer;
