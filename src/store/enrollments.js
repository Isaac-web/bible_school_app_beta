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
    enrollmentAdded: (enrollments) => {
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
const { enrollmentsLoadStared, enrollmentsLoaded, enrollmentsLoadFailed } =
  slice.actions;

export const loadEnrollments = (userId) => (dispatch) => {
  console.log(userId);

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
      toastOnError: true,
    })
  );

  if (typeof callback === "function") callback();
};


