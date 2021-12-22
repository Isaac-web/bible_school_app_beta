import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    errorMessage: "",
    data: {},
  },
  reducers: {
    userLoginStarted: (state, action) => {
      state.loading = true;
    },
    userLoggedIn: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.loading = false;
      state.errorMessage = "";
    },
    userLoginFailed: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const { userLoggedIn, userLoginStarted, userLoginFailed } = slice.actions;

export const logInUser = (data, callback) => (dispatch) => {
  dispatch(
    apiRequest({
      url: "/auth",
      method: "post",
      data,
      onStart: userLoginStarted.type,
      onSuccess: userLoggedIn.type,
      onError: userLoginFailed.type,
    })
  );

  if (typeof callback === "function") callback();
};
