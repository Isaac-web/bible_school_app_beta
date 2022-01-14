import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  Skeleton,
  Fab,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { Feed, Quiz, ArrowDropUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";


import * as actions from "../store/modules";
import * as enrollmentService from "../services/enrollmentService";
import AppLinearProgress from "../components/AppLinearProgress";
import * as currentModuleActions from "../store/currentModule";
import PromptDialog from "../components/PromptDialog";
import QuizBox from "../components/QuizBox";
import MobileDrawer from "../components/MobileDrawer";
import QuizResult from "../components/QuizResult";
import TitleBanner from "../components/TitleBanner";
import * as downloadService from "../services/downloadService";
import { getFileName, getFilePath } from "../utils/filePath";
import ModuleContentText from "../components/ModuleContentText";

const CurrentCourse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { course, currentModule, progress } =
    enrollmentService.getcurrentEnrollment();
  const {
    data: { modules },
  } = useSelector((state) => state.entities.modules);

  const { data: currentModuleDetails } = useSelector(
    (state) => state.currentModule
  );

  const handleChangeModule = (moduleId) => {
    setShowQuiz(false);
    closeMobileSidebar();
    dispatch(currentModuleActions.loadCurrentModule(moduleId));
  };

  const handleShowQuiz = () => setShowQuiz(true);
  const handleHideQuiz = () => setShowQuiz(false);

  const openDialog = () => setQuizDialogOpen(true);
  const closeDialog = () => setQuizDialogOpen(false);
  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  useEffect(() => {
    dispatch(actions.loadModules());
    dispatch(currentModuleActions.loadCurrentModule(currentModule));
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.main} xs={12}>
            <MainComponent
              moduleDetails={currentModuleDetails}
              onOpenDialog={openDialog}
              onCloseDialog={closeDialog}
              quizDialogOpen={quizDialogOpen}
              showQuiz={showQuiz}
              onShowQuiz={handleShowQuiz}
              onHideQuiz={handleHideQuiz}
            />
          </Grid>
          <Grid item className={classes.sidebar} xs={12}>
            <Sidebar
              title={course.title}
              modules={modules}
              currentModuleId={currentModuleDetails._id || currentModule}
              progress={progress || 0}
              onModuleChange={handleChangeModule}
              mobileDrawerOpen={mobileSidebarOpen}
              onMobileDrawerOpen={openMobileSidebar}
              onMobileDrawerClose={closeMobileSidebar}
            />
          </Grid>
        </Grid>
      </Container>
      {matchesSM && (
        <Fab
          size="small"
          onClick={openMobileSidebar}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
          }}
        >
          <ArrowDropUp color="primary" />
        </Fab>
      )}
    </>
  );
};

const Sidebar = ({
  title,
  progress,
  modules,
  currentModuleId,
  onModuleChange,
  mobileDrawerOpen,
  onMobileDrawerOpen,
  onMobileDrawerClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { loading: modulesLoading } = useSelector(
    (state) => state.entities.modules
  );

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const ModuleSkeleton = () => (
    <Box>
      <Skeleton style={{ margin: "2px 5px", height: "2.5em" }} />
      <Skeleton style={{ margin: "2px 5px", height: "2.5em" }} />
      <Skeleton style={{ margin: "2px 5px", height: "2.5em" }} />
      <Skeleton style={{ margin: "2px 5px", height: "2.5em" }} />
    </Box>
  );

  const sidebarContent = (
    <Grid container direction="column">
      <Box className={classes.sidebarTopBox}>
        <Box className={classes.sidebarTopText}>
          <Typography variant="h6">{title}</Typography>
          <AppLinearProgress progress={progress} />
        </Box>
        <Divider variant="middle" />
      </Box>
      <Box className={classes.sidebarListBox}>
        {modulesLoading ? (
          <ModuleSkeleton />
        ) : (
          <Box className={classes.moduleListBox}>
            <List>
              {modules?.map((item, index) => (
                <ListItem
                  key={item._id}
                  style={{
                    padding: "0 0.5em",
                    backgroundColor:
                      currentModuleId === item._id &&
                      theme.palette.primary.light,
                  }}
                  className={classes.moduleListItem}
                  onClick={() => onModuleChange(item._id)}
                >
                  <ListItemText
                    primary={`Module ${index + 1} - ${item.title}`}
                    classes={{
                      primary:
                        currentModuleId === item._id
                          ? classes.moduleListItemPrimaryText
                          : "",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Grid>
  );

  if (matchesSM)
    return (
      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={onMobileDrawerClose}
        onOpen={onMobileDrawerOpen}
      >
        {sidebarContent}
      </MobileDrawer>
    );

  return (
    <Paper variant="outlined" className={classes.paper}>
      {sidebarContent}
    </Paper>
  );
};

const MainComponent = ({
  moduleDetails,
  onOpenDialog,
  showQuiz,
  onCloseDialog,
  onShowQuiz,
  onHideQuiz,
  quizDialogOpen,
}) => {
  const classes = useStyles();
  const currentEnrollment = enrollmentService.getcurrentEnrollment();
  const { data: currentModule, loading } = useSelector(
    (state) => state.currentModule
  );
  const { data: quizResults } = useSelector((state) => state.quiz);

  const handleDownload = () => {
    const path = getFilePath(currentModule?.fileUri);
    const filename = getFileName(currentModule?.fileUri);
    if (!path || !filename) return;

    downloadService.downloadFile(path, filename);
  };

  let isModuleCovered =
    currentEnrollment.coveredModules.indexOf(currentModule._id) > -1
      ? true
      : false;

  const moduleDenied =
    isModuleCovered || currentEnrollment.currentModule === currentModule._id;

  if (quizResults) return <QuizResult onNextModule={onHideQuiz} />;

  if (loading)
    return (
      <Box>
        <Skeleton variant="rectangular" height="12em" />
        <Grid container style={{ margin: "1em 0" }} justifyContent={"center"}>
          <Grid item style={{ margin: 5 }}>
            <Skeleton variant="rectangular" height={40} width={100} />
          </Grid>
          <Grid item style={{ margin: 5 }}>
            <Skeleton variant="rectangular" height={40} width={100} />
          </Grid>
        </Grid>
      </Box>
    );

  if (showQuiz)
    return (
      <Container>
        <QuizBox
          question="This is a question"
          objectives={["ans1", "ans2", "ans3", "ans4"]}
          answer="ans2"
        />
      </Container>
    );

  return (
    <Box style={{ margin: "0 3px" }}>
      <TitleBanner
        backgroundImageUri={currentModule.imageUri}
        title={currentModule.title}
        hideSubtitle
      />

      {moduleDenied ? (
        <Box>
          <Paper style={{ margin: "1em 0" }}>
            <ModuleContentText hideTitle contentText={currentModule.content} />
          </Paper>

          <Grid
            container
            justifyContent="center"
            spacing={2}
            className={classes.moduleButtonsWrapper}
          >
            <Grid item>
              <Button startIcon={<Feed />} onClick={handleDownload}>
                Download
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                endIcon={<Quiz />}
                onClick={onOpenDialog}
                disabled={isModuleCovered || !currentModule.questions.length}
              >
                Start Quiz
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <ModuleDenied />
      )}
      <PromptDialog
        open={quizDialogOpen}
        onClose={onCloseDialog}
        onAccept={onShowQuiz}
        title="Start Quiz?"
        message="Are you ready to start this timed quiz?"
        acceptLabel="Yes"
        declineLabel="No"
      />
    </Box>
  );
};

const ModuleDenied = () => {
  const dispatch = useDispatch();
  const { currentModule } = enrollmentService.getcurrentEnrollment();

  const handleLoadCurrentModule = () => {
    dispatch(actions.loadModules(currentModule));
  };

  return (
    <Box>
      <Grid container justifyContent="center" style={{ margin: "2em 0" }}>
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Please complete the previous modules
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  banner: {
    padding: "4em 0",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  main: {
    [theme.breakpoints.up("sm")]: {
      flex: 0.7,
      height: "90vh",
      overflowY: "auto",
    },
  },
  moduleButtonsWrapper: {
    padding: "2em 0",
  },
  moduleListItemPrimaryText: {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  sidebar: {
    [theme.breakpoints.up("sm")]: {
      flex: 0.3,
    },
  },
  sidebarTopText: {
    padding: "1em",
    height: "20%",
  },
  moduleListBox: {
    padding: "1em",
    flex: 1,
  },
  moduleListItem: {
    padding: `${theme.spacing(1)}px`,
    paddintTop: 0,
    paddingBottom: 0,
    borderRadius: theme.spacing(1),
    cursor: "pointer",
  },
  sidebarListBox: {
    height: "76vh",
    overflowY: "auto",
  },
  paper: {
    height: "100%",
  },
  sidebarTopBox: {},
}));

export default CurrentCourse;
