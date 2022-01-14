import React, { useEffect } from "react";
import { Fade } from "@mui/material";

import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CourseDetailsComponent from "../components/CourseDetails";
import Loading from "../components/Loading";
import * as authService from "../services/authService";
import { loadCourseDetails } from "../store/courseDetails";
import * as enrollmentActions from "../store/enrollments";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { data: course, loading } = useSelector(
    (state) => state.entities.courseDetails
  );


  
console.log(course.imageUri);


  const handleEnroll = (id) => {
    const user = authService.getCurrentUser();
    if (!user._id) return;

    const data = {
      courseId: id,
      userId: user._id,
    };

    dispatch(
      enrollmentActions.createEnrollment(data, () =>
        history.push("/enrollments")
      )
    );
  };

  useEffect(() => {
    dispatch(loadCourseDetails(id));
  }, []);

  useEffect(() => {}, [course]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {course && (
        <CourseDetailsComponent
          title={course.title}
          imageUri={course.imageUri}
          numberOfEnrollments={course.enrollments || 0}
          coordinatorName={`${course?.coordinator?.firstname} ${course?.coordinator?.lastname}`}
          coordinatorAddress={course?.coordinator?.address}
          coordinatorPhone={course?.coordinator?.email}
          onEnroll={() => handleEnroll(course._id)}
        />
      )}
    </>
  );
};

export default CourseDetails;
