import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../store/middleware/api";
import error from "../store/middleware/error";
import reducer from "./reducer";

const configureStoreFuction = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api],
  });
};

export default configureStoreFuction;
