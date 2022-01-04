import { combineReducers } from "redux";

import entities from "./entities";
import auth from "./auth";
import currentModule from "./currentModule";
import quiz from "./quiz";
import toast from "./toast";
import summery from "./summery";

const reducer = combineReducers({
  entities,
  auth,
  currentModule,
  quiz,
  summery,
  toast,
});

export default reducer;
