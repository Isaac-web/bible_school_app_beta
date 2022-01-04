import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "courseDetails",
  initialState: {
    loading: false,
    lastFetched: null,
    data: {},
  },
  reducers: {
    courseDetailsLoadStarted: (courseDetails, action) => {
      courseDetails.loading = true;
    },
    courseDetailsLoaded: (courseDetails, action) => {
      courseDetails.data = action.payload;
      courseDetails.loading = false;
    },
    courseLoadFailed: (courseDetails, action) => {
      courseDetails.loading = false;
    },
  },
});

export default slice.reducer;

const { courseDetailsLoaded, courseLoadFailed, courseDetailsLoadStarted } =
  slice.actions;

export const loadCourseDetails = (courseId) =>
  apiRequest({
    url: `/courses/${courseId}`,
    onStart: courseDetailsLoadStarted.type,
    onSuccess: courseDetailsLoaded.type,
    onError: courseLoadFailed.type,
  });


