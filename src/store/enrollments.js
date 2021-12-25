import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../services/authService";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "enrollments",
  initialState: {
    loading: false,
    lastFetched: null,
    data: [],
  },
  reducers: {
    enrollmentsLoadStared: (enrollments, action) => {
      enrollments.loading = true;
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

export const loadEnrollments = () => (dispatch) => {
  const user = authService.getCurrentUser();

  dispatch(
    apiRequest({
      url: `/enrollments/${user._id}`,
      onStart: enrollmentsLoadStared.type,
      onSuccess: enrollmentsLoaded.type,
      onError: enrollmentsLoadFailed.type,
    })
  );
};
