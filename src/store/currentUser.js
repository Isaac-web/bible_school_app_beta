import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "currentUser",
  initialState: {
    loading: false,
    errorMessage: "",
    data: {},
  },
  reducers: {
    currentUserLoadStarted: (user, action) => {
      user.loading = true;
      user.errorMessage = "";
    },
    currentUserLoaded: (user, action) => {
      user.loading = false;
      user.errorMessage = false;
      user.data = action.payload;
    },
    currentUserLoadFailed: (user, action) => {
      user.loading = false;
      user.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const { currentUserLoaded, currentUserLoadStarted, currentUserLoadFailed } =
  slice.actions;

export const loadCurrentUser = () =>
  apiRequest({
    url: "/users/me",
    onStart: currentUserLoadStarted.type,
    onSuccess: currentUserLoaded.type,
    onError: currentUserLoadFailed.type,
    toastOnError: true,
  });
