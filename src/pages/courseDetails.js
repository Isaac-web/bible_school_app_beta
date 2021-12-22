import React, { useEffect } from "react";
import { Fade } from "@mui/material";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CourseDetailsComponent from "../components/CourseDetails";
import Loading from "../components/Loading";

import { loadCourseDetails } from "../store/courseDetails";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: course, loading } = useSelector(
    (state) => state.entities.courseDetails
  );

  const handleEnroll = (id) => {
    console.log(id);
  };

  useEffect(() => {
    dispatch(loadCourseDetails(id));
  }, []);

  useEffect(() => {
    console.log(course);
  }, [course]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {course && (
        <Fade>
          <CourseDetailsComponent
            title={course.title}
            coordinatorName={`${course?.coordinator?.firstname} ${course?.coordinator?.lastname}`}
            coordinatorAddress={course?.coordinator?.address}
            coordinatorPhone={course?.coordinator?.email}
            onEnroll={() => handleEnroll(course._id)}
          />
        </Fade>
      )}
    </>
  );
};

export default CourseDetails;
