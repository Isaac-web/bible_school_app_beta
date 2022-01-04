import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toast",
  initialState: {
    open: false,
    message: "",
  },
  reducers: {
    toastOpened: (toast, action) => {
      toast.open = true;
      toast.message = action.payload;
    },
    toastClosed: (toast, action) => {
      toast.open = false;
    },
  },
});

export default slice.reducer;
export const { toastOpened, toastClosed } = slice.actions;

export const showToast = (message) => (dispatch) => {
  dispatch(toastOpened(message));
};

export const hideToast = () => (dispatch) => {
  dispatch(toastClosed());
};
