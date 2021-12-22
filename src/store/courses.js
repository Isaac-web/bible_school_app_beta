import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import * as apiActions from "./api";

const slice = createSlice({
  name: "courses",
  initialState: {
    loading: false,
    lastFetched: null,
    data: [],
  },
  reducers: {
    coursesLoadStarted: (courses, action) => {
      courses.loading = true;
    },
    coursesLoaded: (courses, action) => {
      courses.loading = false;
      courses.data = action.payload;
      courses.lastFetched = Date.now();
    },
  },
});

export default slice.reducer;
const { coursesLoaded, coursesLoadStarted } = slice.actions;

export const loadCourses = () => (dispatch, getState) => {
  const lastFetched = getState();
  if (lastFetched) {
    const timeDiff = moment().diff(moment(lastFetched), "minutes");
    console.log(timeDiff);
  }

  dispatch(
    apiActions.apiRequest({
      url: "/courses",
      onStart: coursesLoadStarted.type,
      onSuccess: coursesLoaded.type,
    })
  );
};
