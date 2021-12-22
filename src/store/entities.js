import { combineReducers } from "redux";
import courses from "./courses";
import courseDetails from "./courseDetails";

const entites = combineReducers({ courses, courseDetails });

export default entites;
