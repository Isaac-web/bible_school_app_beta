import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";
import * as quizActions from "./quiz";

const slice = createSlice({
  name: "currentModule",
  initialState: {
    loading: false,
    data: {
      id: undefined,
    },
  },
  reducers: {
    currentModuleLoadStarted: (currentModule, action) => {
      currentModule.loading = true;
    },
    currentModuleLoaded: (currentModule, action) => {
      currentModule.data = action.payload;
      currentModule.loading = false;
    },
    currentModuleLoadFailed: (currentModule, action) => {
      currentModule.loading = false;
    },
    questionAnswerChanged: (currentModule, action) => {
      const { ans, index } = action.payload;
      currentModule.data.questions[index].ans = ans;
    },
    answersHidden: (currentModule, action) => {
      currentModule.data.questions.forEach((q) => (q.ans = ""));
    },
  },
});

export default slice.reducer;

const {
  currentModuleLoaded,
  currentModuleLoadStarted,
  currentModuleLoadFailed,
  questionAnswerChanged,
  answersHidden,
} = slice.actions;

export const loadCurrentModule = (moduleId) => (dispatch) => {
  dispatch(quizActions.clearQuizResults());

  dispatch(
    apiRequest({
      url: `/modules/${moduleId}`,
      onStart: currentModuleLoadStarted.type,
      onSuccess: currentModuleLoaded.type,
      onError: currentModuleLoadFailed.type,
    })
  );
};

export const changeAnswer = (ans, index) => (dispatch) => {
  dispatch(
    questionAnswerChanged({
      ans,
      index,
    })
  );
};

export const hideAnswers = () => answersHidden();
