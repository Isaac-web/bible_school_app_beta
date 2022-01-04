import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";
import * as authService from "../services/authService";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loginErrorMessage: "",
    registrationErrorMessage: "",
    data: {},
  },
  reducers: {
    userLoginStarted: (state, action) => {
      state.loginErrorMessage = "";
      state.loading = true;
    },
    userLoggedIn: (state, action) => {
      const { token } = action.payload;
      authService.storeToken(token);

      state.data = authService.getCurrentUser();
      state.loading = false;
      state.loginErrorMessage = "";
    },
    userLoginFailed: (state, action) => {
      state.loading = false;
      state.loginErrorMessage = action.payload;
    },
    userRegistrationStarted: (state, action) => {
      state.registrationErrorMessage = ""
      state.loading = true;
    },

    userRegistered: (state, action) => {
      state.registrationErrorMessage = "";
      state.loading = false;
    },
    userRegistrationFailed: (state, action) => {
      state.loading = false;
      state.registrationErrorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const {
  userLoggedIn,
  userLoginStarted,
  userLoginFailed,
  userRegistrationStarted,
  userRegistrationFailed,
  userRegistered,
} = slice.actions;

export const logInUser = (data, callback) => async (dispatch, getState) => {
  await dispatch(
    apiRequest({
      url: "/auth",
      method: "post",
      data,
      onStart: userLoginStarted.type,
      onSuccess: userLoggedIn.type,
      onError: userLoginFailed.type,
    })
  );

  const { auth } = getState();
  if (!auth.loginErrorMessage && typeof callback === "function") callback();
};

export const registerUser = (data, callback) => async (dispatch, getState) => {
  await dispatch(
    apiRequest({
      url: "/users",
      method: "post",
      data,
      includeHeaderToken: true,
      onStart: userRegistrationStarted.type,
      onSuccess: userRegistered.type,
      onError: userRegistrationFailed.type,
      callback,
    })
  );

  const { auth } = getState();
  if (!auth.registrationErrorMessage && typeof callback === "function")
    callback();
};


export const logoutUser = (callback) => {
  authService.clear();

  callback();
};