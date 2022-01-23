import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete, ArrowUpward } from "@mui/icons-material";

import config from "../config.json";
import * as currentmoduleActions from "../store/currentModule";
import * as moduleActions from "../store/modules";
import AppDialog from "./AppDialog";
import * as authService from "../services/authService";
import CurrentModuleContainer from "./CurrentModuleContainer";
import Empty from "./Empty";
import * as textFormat from "../utils/textFormat";
import PromptDialog from "../components/PromptDialog";
import emptyIcon from "../assets/images/empty-folder-icon.png";
import MobileDrawer from "./MobileDrawer";

const CoordinatorModules = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data: currentModule,
    isSaved,
    awaiting,
  } = useSelector((state) => state.currentModule);

  return (
    <Container className={classes.container}>
      <Box className={classes.main} style={{ flex: matchesSM ? 1 : 7 }}>
        <CurrentModuleContainer />
      </Box>

      <Box className={classes.sidebar} style={{ flex: matchesSM ? 0 : 3 }}>
        <ModuleListBox />
      </Box>
    </Container>
  );
};

const ModuleListBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [moduleDrawerOpen, setModuleDrawerOpen] = useState(false);
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const { data: currentModule } = useSelector((state) => state.currentModule);
  const currentItem = currentModule._id;
  const {
    data: { modules },
    loading,
  } = useSelector((state) => state.entities.modules);

  const handleLoadCurrentModule = (id) => {
    dispatch(currentmoduleActions.loadCurrentModule(id));
    closeModuleDrawer();
  };

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const openDeletePrompt = (id) => {
    setDeletePromptOpen(true);
    setModuleToDelete(id);
  };

  const closeDeletePrompt = () => {
    setDeletePromptOpen(false);
    setModuleToDelete(null);
  };

  const handleDeleteModule = (id) => {
    dispatch(currentmoduleActions.deleteCurrentModule(id));

    window.location.reload();
  };

  const closeModuleDrawer = () => {
    setModuleDrawerOpen(false);
  };

  const openModuleDrawer = () => {
    setModuleDrawerOpen(true);
  };

  const moduleContainerContent = loading ? (
    <Grid
      sx={{ paddingTop: 2 }}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <Paper
      variant="elevation"
      sx={{ marginTop: 1, height: "89vh", padding: "2px" }}
    >
      <Box>
        {!modules?.length ? (
          <Empty
            imagePath={emptyIcon}
            title="No module yet"
            subtitle="Click on the add button to add a new module"
          />
        ) : (
          <List>
            {modules?.map((m, index) => {
              return (
                <ListItem
                  key={m._id}
                  className={`${classes.sidebarListItem} ${
                    currentItem === m._id ? classes.activeSidebarListItem : ""
                  }`}
                  onClick={() => handleLoadCurrentModule(m._id)}
                >
                  <ListItemText
                    primary={`Module ${index + 1} - ${textFormat.abbreviate(
                      m.title,
                      20
                    )}`}
                    classes={{
                      primary: `${classes.sidebarListItemPrimaryText} ${
                        currentItem === m._id
                          ? classes.activeSidebarListItemPrimaryText
                          : ""
                      }`,
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => openDeletePrompt(m._id)}
                      size={"small"}
                      sx={{ "&:hover": { color: "rgba(225, 0, 0, 0.6)" } }}
                    >
                      <Delete
                        sx={{
                          fontSize: "1em",
                          color: "rgba(0, 0, 0, 0.4)",
                          "&:hover": { color: "rgba(225, 0, 0, 0.6)" },
                        }}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}

        <Fab
          className={classes.addFab}
          size={"small"}
          onClick={handleOpenDialog}
        >
          <Add />
        </Fab>

        <CreateModuleDialog open={open} onClose={handleCloseDialog} />
        <DeleteModulePrompt
          open={deletePromptOpen}
          onDelete={() => handleDeleteModule(moduleToDelete)}
          onClose={closeDeletePrompt}
        />
      </Box>
    </Paper>
  );

  const mobileScreen = (
    <>
      <MobileDrawer
        open={moduleDrawerOpen}
        onOpen={openModuleDrawer}
        onClose={closeModuleDrawer}
      >
        {moduleContainerContent}
      </MobileDrawer>
      <Fab
        size="small"
        sx={{
          color: (theme) => theme.palette.primary.main,
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onClick={openModuleDrawer}
      >
        <ArrowUpward />
      </Fab>
    </>
  );

  return <>{matchesSM ? <>{mobileScreen}</> : <>{moduleContainerContent}</>}</>;
};

const DeleteModulePrompt = ({ onDelete, onCancel, ...rest }) => {
  return (
    <PromptDialog
      title="Delete Module?"
      message="Are you sure you want to delete this module?"
      onAccept={onDelete}
      onDecline={onCancel}
      {...rest}
    />
  );
};

const CreateModuleDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ title: "" });
  const { awaiting } = useSelector((state) => state.entities.modules);
  const createModuleDialogActions = [
    {
      content: () => (
        <Button variant="outlined" onClick={handleCancel} sx={{ width: 100 }}>
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

  const handleSubmit = () => {
    const { courseId } = authService.getCurrentUser();

    if (!courseId) return;

    data.courseId = courseId;
    dispatch(moduleActions.addModule(data, () => window.location.reload()));

    clear();
  };

  const handleCancel = () => {
    clear();
  };

  const clear = () => {
    setData({ title: "" });
    onClose();
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <AppDialog
      title="Add a new module"
      open={open}
      dialogActions={createModuleDialogActions}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name="title"
              onChange={handleChange}
              value={data.title}
              label="Title"
            />
          </Grid>
        </Grid>
      </form>
    </AppDialog>
  );
};

const useStyles = makeStyles((theme) => ({
  addFab: {
    color: theme.palette.primary.main,
    backgroundcolor: "white",
    position: "absolute",
    bottom: 15,
    right: 20,
  },
  container: {
    display: "flex",
    alignItems: "stretch",
    height: `calc(100vh - 5em)`,
  },
  main: {
    flex: 1,
    height: `calc(100vh - 5em)`,
    overflow: "auto",
  },
  sidebar: {
    // flex: 0.3,
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

export default CoordinatorModules;
