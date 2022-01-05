import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../services/authService";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "enrollments",
  initialState: {
    awaiting: false,
    loading: false,
    lastFetched: null,
    data: [],
  },
  reducers: {
    enrollmentsLoadStared: (enrollments, action) => {
      enrollments.loading = true;
    },
    addEnrollmentStarted: (enrollments, action) => {
      enrollments.awaiting = true;
    },
    enrollmentAdded: (enrollments, action) => {
      enrollments.data.push(action.payload);
      enrollments.awaiting = false;
    },
    addEnrollmentFailed: (enrollments, action) => {
      enrollments.awaiting = false;
    },
    enrollmentsLoaded: (enrollments, action) => {
      enrollments.data = action.payload;
      enrollments.loading = false;
    },
    enrollmentsLoadFailed: (enrollments, action) => {
      enrollments.loading = false;
    },
  },
});

export default slice.reducer;
const { enrollmentsLoadStared, enrollmentsLoaded, enrollmentsLoadFailed, enrollmentAdded, addEnrollmentFailed, addEnrollmentStarted } =
  slice.actions;

export const loadEnrollments = (userId) => (dispatch) => {
    if (!userId) return;

  dispatch(
    apiRequest({
      url: `/enrollments/${userId}`,
      onStart: enrollmentsLoadStared.type,
      onSuccess: enrollmentsLoaded.type,
      onError: enrollmentsLoadFailed.type,
    })
  );
};

export const loadAllEnrollments = () => (dispatch) => {
  dispatch(
    apiRequest({
      url: `/enrollments`,
      onStart: enrollmentsLoadStared.type,
      onSuccess: enrollmentsLoaded.type,
      onError: enrollmentsLoadFailed.type,
    })
  );
};

export const getCoordinatorEnrollments = () => (dispatch) => {
  const { courseId } = authService.getCurrentUser();

  dispatch(
    apiRequest({
      url: `/enrollments/coordinators/${courseId}`,
      onStart: enrollmentsLoadStared.type,
      onSuccess: enrollmentsLoaded.type,
      onError: enrollmentsLoadFailed.type,
    })
  );
};

export const createEnrollment = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: `/enrollments`,
      method: "post",
      data,
      onStart: addEnrollmentStarted.type,
      onError: addEnrollmentFailed.type, 
      toastOnError: true,
    })
  );

  if (typeof callback === "function") callback();
};;


