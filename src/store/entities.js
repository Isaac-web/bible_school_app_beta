import { combineReducers } from "redux";
import courses from "./courses";
import courseDetails from "./courseDetails";
import enrollments from "./enrollments";
import modules from "./modules";
import users from "./users";

const entites = combineReducers({
  courses,
  courseDetails,
  enrollments,
  modules,
  users,
});

export default entites;
