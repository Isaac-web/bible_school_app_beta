import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

import * as enrollmentService from "../services/enrollmentService";

const slice = createSlice({
  name: "modules",
  initialState: {
    loading: false,
    lastFetched: null,
    data: [],
  },
  reducers: {
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
const { modulesLoaded, loadModulesStarted, loadModulesFailed } = slice.actions;

export const loadModules = (id) => (dispatch) => {
  const enrollment = enrollmentService.getcurrentEnrollment();
  const course = enrollment.course;

  dispatch(
    apiRequest({
      url: `/modules/all/${id || course._id}`,
      onStart: loadModulesStarted.type,
      onSuccess: modulesLoaded.type,
      onError: loadModulesFailed.type,
    })
  );
};
