import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

import * as enrollmentService from "../services/enrollmentService";
import * as currentModuleActions from "../store/currentModule";

const slice = createSlice({
  name: "modules",
  initialState: {
    awaiting: false,
    loading: false,
    lastFetched: null,
    data: [],
  },
  reducers: {
    addModuleStarted: (modules, action) => {
      modules.awating = true;
    },
    moduleAdded: (modules, action) => {
      modules.data.push(action.payload);
      modules.awaiting = false;
    },
    addModuleFailed: (modules, action) => {
      modules.awaiting = false;
    },

    deleteModuleStarted: (modules, action) => {
      modules.awating = true;
      console.log("Hello World");
    },
    moduleDeleted: (modules, action) => {
      console.log("Hello World", modules.data[0]);
    },
    deleteMOduleFailed: (modules, action) => {
      modules.awaiting = false;
    },
    loadModulesStarted: (modules, action) => {
      modules.loading = true;
    },
    modulesLoaded: (modules, action) => {
      modules.data = action.payload;
      modules.loading = false;
    },
    loadModulesFailed: (modules, action) => {
      modules.loading = false;
    },
  },
});

export default slice.reducer;
const {
  modulesLoaded,
  loadModulesStarted,
  loadModulesFailed,
  moduleAdded,
  moduleDeleted,
} = slice.actions;

export const loadModules = (id) => (dispatch) => {
  const enrollment = enrollmentService.getcurrentEnrollment();
  const course = enrollment?.course;

  dispatch(
    apiRequest({
      url: `/modules/all/${id || course?._id}`,
      onStart: loadModulesStarted.type,
      onSuccess: modulesLoaded.type,
      onError: loadModulesFailed.type,
    })
  );
};

export const addModule = (data) => (dispatch) => {
  console.log(data);

  dispatch(
    apiRequest({
      url: "/modules/",
      method: "post",
      data,
      onSuccess: moduleAdded.type,
    })
  );
};

export const removeModuleFromList = (id) => (dispatch) => {
  dispatch(moduleDeleted(id));
};

