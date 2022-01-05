import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import * as apiActions from "./api";

const slice = createSlice({
  name: "courses",
  initialState: {
    awaiting: false,
    errorMessage: "",
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
    courseAdded: (courses, action) => {
      courses.awaiting = false;
      courses.data.push(action.payload);
    },
    courseAddStarted: (courses, action) => {
      courses.errorMessage = "";
      courses.awaiting = true;
    },
    courseAddFailed: (courses, action) => {
      courses.awaiting = false;
      courses.errorMessage = action.payload;
    },
    courseDeleted: (courses, action) => {
      courses.awaiting = false;
      courses.data = courses.data.filter(
        (item) => item._id !== action.payload.id
      );
    },
    courseRemoved: (courses, action) => {
      const id = action.payload.id
      const index = courses.data.findIndex(item => item._id === id);
      courses.data.splice(index, 1); 
    },
    courseDeleteStarted: (courses, action) => {
      courses.errorMessage = "";
      courses.awaiting = true;
    },
    courseDeleteFailed: (courses, action) => {
      courses.awaiting = false;
      courses.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const {
  coursesLoaded,
  coursesLoadStarted,
  courseAddStarted,
  courseAdded,
  courseAddFailed,
  courseRemoved,
  courseDeleted,
} = slice.actions;

export const loadCourses = () => (dispatch, getState) => {
  // const lastFetched = getState();
  // if (lastFetched) {
  //   const timeDiff = moment().diff(moment(lastFetched), "minutes");
  // }

  dispatch(
    apiActions.apiRequest({
      url: "/courses",
      onStart: coursesLoadStarted.type,
      onSuccess: coursesLoaded.type,
    })
  );
};

export const addCourse = (data, callback) => async (dispatch) => {
  const formatedData = {
    title: data.title,
    coordinator: data.coordinatorId,
  };

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coordinator", data.coordinatorId);
  formData.append("image", data.image);

  await dispatch(
    apiActions.apiRequest({
      url: "/courses",
      method: "post",
      data: formData,
      onStart: courseAddStarted.type,
      onSuccess: courseAdded.type,
      onError: courseAddFailed.type,
    })
  );

  if (typeof callback === "function") callback();
};

export const deleteCourse = (id, index) => (dispatch) => {
  dispatch(courseRemoved(id));

  dispatch(
    apiActions.apiRequest({
      url: `/courses/${id}`,
      method: "delete",
      onSuccess: courseDeleted.type,
      onError: courseAddFailed.type
    })
  );
};





