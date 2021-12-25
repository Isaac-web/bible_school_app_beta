import { combineReducers } from "redux";

import entities from "./entities";
import auth from "./auth";
import currentModule from "./currentModule";
import quiz from "./quiz";

const reducer = combineReducers({ entities, auth, currentModule, quiz });

export default reducer;
