import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";
import * as enrollmentService from "../services/enrollmentService";

const slice = createSlice({
  name: "quiz",
  initialState: {
    loading: false,
    submitted: false,
    data: null,
  },
  reducers: {
    loadQuizResultsStarted: (quiz, action) => {
      quiz.loading = true;
    },
    quizResultsLoaded: (quiz, action) => {
      enrollmentService.setEnrollment(action.payload.enrollment);
      quiz.submitted = true;
      quiz.data = action.payload;
      quiz.loading = false;
    },
    loadQuizResultsFailed: (quiz, action) => {
      quiz.loading = false;
      quiz.sumitted = false;
    },
    resultCleared: (quiz, action) => {
      quiz.data = action.payload;
      quiz.submitted = false;
      quiz.loading = false;
    },
  },
});

export default slice.reducer;
const {
  loadQuizResultsStarted,
  quizResultsLoaded,
  loadQuizResultsFailed,
  resultCleared,
} = slice.actions;

export const submitQuiz = (data) =>
  apiRequest({
    url: "/quizes",
    method: "post",
    data,
    onStart: loadQuizResultsStarted.type,
    onSuccess: quizResultsLoaded.type,
    onError: loadQuizResultsFailed.type,
  });

export const clearQuizResults = () => resultCleared();
