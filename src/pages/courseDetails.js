import React, { useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CourseDetailsComponent from "../components/CourseDetails";
import Loading from "../components/Loading";
import * as authService from "../services/authService";
import { loadCourseDetails } from "../store/courseDetails";
import * as enrollmentActions from "../store/enrollments";
import * as moduleActions from "../store/modules";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { data: course, loading } = useSelector(
    (state) => state.entities.courseDetails
  );

  const {
    data: { modules },
  } = useSelector((state) => state.entities.modules);

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
    dispatch(moduleActions.loadModules(id));
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
          modules={modules}
          description={course.description}
        />
      )}
    </>
  );
};

export default CourseDetails;
