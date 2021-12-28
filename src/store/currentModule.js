import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";
import * as quizActions from "./quiz";

const slice = createSlice({
  name: "currentModule",
  initialState: {
    loading: false,
    awaiting: false,
    isSaved: true,
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
    currentModuleRevoked: (currentModule, action) => {
      currentModule.data = action.payload;
    },
    questionAnswerChanged: (currentModule, action) => {
      const { ans, index } = action.payload;
      currentModule.data.questions[index].ans = ans;
      currentModule.isSaved = false;
    },
    answersHidden: (currentModule, action) => {
      currentModule.data.questions.forEach((q) => (q.ans = ""));
    },
    saveChangesStarted: (currentModule, action) => {
      currentModule.awaiting = true;
    },
    changesSaved: (currentModule, action) => {
      currentModule.data = action.payload;
      currentModule.awaiting = false;
      currentModule.isSaved = true;
    },
    saveChangesFailed: (currentModule, action) => {
      currentModule.awaiting = false;
    },
    questionAdded: (currentModule, action) => {
      currentModule.data.questions.push(action.payload);
    },
    questionDeleted: (currentModule, action) => {
      currentModule.data.questions.splice(action.payload.index, 1);
    },
  },
});

export default slice.reducer;

const {
  currentModuleLoaded,
  currentModuleLoadStarted,
  currentModuleLoadFailed,
  currentModuleRevoked,
  questionAnswerChanged,
  answersHidden,
  questionAdded,
  saveChangesStarted,
  saveChangesFailed,
  changesSaved,
  questionDeleted,
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

export const addQuestion = (data) => questionAdded(data);

export const hideAnswers = () => answersHidden();

export const saveChanges = () => (dispatch, getState) => {
  const {
    currentModule: { data: currentModule },
  } = getState();

  dispatch(
    apiRequest({
      url: `/modules/${currentModule._id}`,
      method: "patch",
      data: currentModule,
      onStart: saveChangesStarted.type,
      onSuccess: changesSaved.type,
      onError: saveChangesFailed.type,
    })
  );
};

export const deleteQuestion = (questionId, index) => (dispatch, getState) => {
  const {
    currentModule: { data: currentModule },
  } = getState();

  if (questionId)
    dispatch(
      apiRequest({
        url: `/modules/${currentModule._id}/${questionId}`,
        method: "delete",
      })
    );

  dispatch(questionDeleted({ index }));
};