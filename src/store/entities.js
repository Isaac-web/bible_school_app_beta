import { combineReducers } from "redux";
import courses from "./courses";
import courseDetails from "./courseDetails";
import enrollments from "./enrollments";
import modules from "./modules";

const entites = combineReducers({
  courses,
  courseDetails,
  enrollments,
  modules,
});

export default entites;
