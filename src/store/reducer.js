import { combineReducers } from "redux";

import entities from "./entities";
import auth from "./auth";
import currentModule from "./currentModule";
import quiz from "./quiz";
import toast from "./toast";
import summery from "./summery";
import currentUser from "./currentUser";

const reducer = combineReducers({
  entities,
  auth,
  currentModule,
  quiz,
  summery,
  toast,
  currentUser,
});

export default reducer;
