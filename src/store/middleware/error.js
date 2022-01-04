import { toastOpened } from "../toast";

const error =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== "error") return next(action);

    console.log(action);
    // dispatch({ type: toastOpened.type, payload: action.payload });
  };

export default error;
