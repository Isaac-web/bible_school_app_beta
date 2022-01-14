import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

import * as enrollmentService from "../services/enrollmentService";

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
      modules.awaiting = false;
      modules.data.push(action.payload);
    },
    addModuleFailed: (modules, action) => {
      modules.awaiting = false;
    },

    deleteModuleStarted: (modules, action) => {
      modules.awating = true;
    },
    moduleDeleted: (modules, action) => {
      // modules.data = modules.data.filter(
      //   (item) => item._id !== action.payload._id
      // );

      console.log.apply(modules.data);
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

export const addModule = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: "/modules/",
      method: "post",
      data,
      onSuccess: moduleAdded.type,
      toastOnError: true,
    })
  );

  if (typeof callback === "function") callback();
};

export const deleteModule = (id) => (dispatch) => {
  dispatch(moduleDeleted({ _id: id }));
};
