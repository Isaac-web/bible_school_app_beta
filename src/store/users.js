import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    usersLoadStarted: (users, action) => {
      users.loading = true;
    },
    usersLoaded: (users, action) => {
      users.loading = false;
      users.data = action.payload;
    },
    usersLoadFailed: (users, action) => {
      users.loading = false;
      users.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const { usersLoadStarted, usersLoaded, usersLoadFailed } = slice.actions;

export const loadUsers = () =>
  apiRequest({
    url: "/users",
    onStart: usersLoadStarted.type,
    onSuccess: usersLoaded.type,
    onError: usersLoadFailed.type,
  });

export const searchUsers = (username) =>
  apiRequest({
    url: `/users/search?username=${username}`,
    onStart: usersLoadStarted.type,
    onSuccess: usersLoaded.type,
    onError: usersLoadFailed.type,
  });
