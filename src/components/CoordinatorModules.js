import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete } from "@mui/icons-material";

import config from "../config.json";
import  * as currentmoduleActions from "../store/currentModule";
import * as moduleActions from "../store/modules";
import AppDialog from "./AppDialog";
import * as authService from "../services/authService";
import CurrentModuleContainer from "./CurrentModuleContainer";
import Empty from "./Empty";

const CoordinatorModules = () => {
  const classes = useStyles();
  const {
    data: currentModule,
    isSaved,
    awaiting,
  } = useSelector((state) => state.currentModule);

  return (
    <Container className={classes.container}>
      <Box className={classes.main}>
        <CurrentModuleContainer />
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
  const [open, setOpen] = useState(false);
  const { data: currentModule } = useSelector((state) => state.currentModule);
  const currentItem = currentModule._id;
  const {
    data: { modules },
    loading,
  } = useSelector((state) => state.entities.modules);

  const handleLoadCurrentModule = (id) => {
    dispatch(currentmoduleActions.loadCurrentModule(id));
  };

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const handleDeleteModule = (id) => {

    dispatch(currentmoduleActions.deleteCurrentModule(id));

    window.location.reload();
  };

  if (loading)
    return (
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
    );

  return (
    <Box>
      {!modules?.length ? (
        <Empty />
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
                  primary={`Module ${index + 1} - ${m.title}`}
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
                    onClick={() => handleDeleteModule(m._id)}
                    size={"small"}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
            // return (
            //   <ListItem
            //     key={m._id}
            //     className={`${classes.sidebarListItem} ${
            //       currentItem === m._id ? classes.activeSidebarListItem : ""
            //     }`}
            //     onClick={() => handleLoadCurrentModule(m._id)}
            //   >
            //     <ListItemText
            //       primary={`Module ${index + 1} - ${m.subtitle}`}
            //       classes={{
            //         primary: `${classes.sidebarListItemPrimaryText} ${
            //           currentItem === m._id
            //             ? classes.activeSidebarListItemPrimaryText
            //             : ""
            //         }`,
            //       }}
            //     />
            //     <ListItemSecondaryAction>
            //       <IconButton
            //         onClick={() => handleDeleteModule(m._id)}
            //         size={"small"}
            //       >
            //         <Delete />
            //       </IconButton>
            //     </ListItemSecondaryAction>
            //   </ListItem>
            // );
          })}
        </List>
      )}

      <Fab className={classes.addFab} size={"small"} onClick={handleOpenDialog}>
        <Add />
      </Fab>

      <CreateModuleDialog open={open} onClose={handleCloseDialog} />
    </Box>
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
  };;

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

export default CoordinatorModules;
