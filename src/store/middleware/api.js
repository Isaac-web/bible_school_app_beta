import axios from "axios";
import * as authService from "../../services/authService";

import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiRequest.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onError,
      includeHeaderToken,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      axios.defaults.headers.common["x-auth-token"] = authService.getToken();
      const response = await axios.request({
        baseURL: "http://localhost:5000/api",
        url,
        method,
        data,
      });

      let payload = {};

      if (includeHeaderToken) {
        const token = response.headers["x-auth-token"];
        payload = { token, data: response.data };
      } else {
        payload = response.data;
      }

      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload });
    } catch (error) {
      dispatch(actions.apiCallFailure(error.message));
      if (onError) {
        let message = "";
        if (error?.response?.data) message = error.response.data;
        else message = error.message;
        console.log(message);
        dispatch({ type: onError, payload: message });
      }
    }
  };

export default api;
