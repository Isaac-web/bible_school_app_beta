import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "summery",
  initialState: {
    loading: false,
    errorMessage: "",
    data: {},
  },
  reducers: {
    summeryLoaded: (summery, action) => {
      summery.errorMessage = "";
      summery.data = action.payload;
    },
    errorMessageSet: (summery, action) => {
      summery.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;
const { summeryLoaded, errorMessageSet } = slice.actions;

export const loadSummery = () => (dispatch) => {
  dispatch(
    apiRequest({
      url: "/admin/summery",
      onSuccess: summeryLoaded.type,
      onError: errorMessageSet.type,
    })
  );
};
