import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";
import * as quizActions from "./quiz";

const slice = createSlice({
  name: "currentModule",
  initialState: {
    loading: false,
    updating: false,
    awaiting: false,
    isSaved: true,
    errorMessage: "",
    data: {
      id: undefined,
    },
  },
  reducers: {
    currentModuleLoadStarted: (currentModule, action) => {
      currentModule.errorMessage = "";
      currentModule.loading = true;
    },
    currentModuleLoaded: (currentModule, action) => {
      currentModule.data = action.payload;
      currentModule.loading = false;
    },
    currentModuleLoadFailed: (currentModule, action) => {
      currentModule.errorMessage = action.payload;
      currentModule.loading = false;
    },
    currentModuleRevoked: (currentModule, action) => {
      currentModule.data = action.payload;
    },
    currentModuleDeleteStarted: (currentModule, action) => {
      currentModule.awaiting = true;
    },
    currentModuleDeleted: (currentModule, action) => {
      currentModule.awaiting = false;
      currentModule.data = { _id: undefined };
    },
    currentModuleDeletedFailed: (currentModule, action) => {
      currentModule.awaiting = false;
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
    currentModuleUpateStarted: (currentModule, action) => {
      currentModule.errorMessage = "";
      currentModule.updating = true;
    },
    currentModuleUpated: (currentModule, action) => {
      currentModule.updating = false;
      currentModule.data = action.payload;
    },
    currentModuleUpateFailed: (currentModule, action) => {
      currentModule.upadting = false;
      currentModule.errorMessage = action.payload;
    },
  },
});

export default slice.reducer;

const {
  currentModuleLoaded,
  currentModuleLoadStarted,
  currentModuleLoadFailed,
  currentModuleDeleteStarted,
  currentModuleDeleted,
  currentModuleDeletedFailed: currentModuleDeleteFailed,
  questionAnswerChanged,
  answersHidden,
  questionAdded,
  saveChangesStarted,
  saveChangesFailed,
  changesSaved,
  questionDeleted,
  currentModuleUpated,
  currentModuleUpateStarted,
  currentModuleUpateFailed,
} = slice.actions;

export const loadCurrentModule = (moduleId) => (dispatch) => {
  dispatch(quizActions.clearQuizResults());

  dispatch(
    apiRequest({
      url: `/modules/${moduleId}`,
      onStart: currentModuleLoadStarted.type,
      onSuccess: currentModuleLoaded.type,
      onError: currentModuleLoadFailed.type,
      toastOnError: true,
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

export const uploadBackgroundImage = (data) => (dispatch, getState) => {
  const {
    currentModule: { data: currentModule },
  } = getState();

  console.log(data.get("imageUpload"));

  dispatch(
    apiRequest({
      url: `/modules/background/${currentModule._id}`,
      method: "patch",
      data,
      onSuccess: currentModuleLoaded.type,
      toastOnError: true,
    })
  );
};

export const uploadDocument = (data) => (dispatch, getState) => {
  const {
    currentModule: { data: currentModule },
  } = getState();

  dispatch(
    apiRequest({
      url: `/modules/upload/${currentModule._id}`,
      method: "patch",
      data,
      onSuccess: currentModuleLoaded.type,
      toastOnError: true,
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

export const deleteCurrentModule = (id) => async (dispatch) => {
  dispatch(
    apiRequest({
      url: `/modules/${id}`,
      method: "delete",
      onStart: currentModuleDeleteStarted.type,
      onSuccess: currentModuleDeleted.type,
      onError: currentModuleDeleteFailed.type,
      toastOnError: true,
    })
  );

  dispatch(currentModuleDeleted());
};

export const updateModule = (id, data, callback) => (dispatch, getState) => {
  const state = getState();
  const { data: currentModule, errorMessage } = state.currentModule;

  dispatch(
    apiRequest({
      url: `/modules/${currentModule._id}`,
      method: "patch",
      data,
      onStart: currentModuleUpateStarted.type,
      onSuccess: currentModuleUpated.type,
      onError: currentModuleUpateFailed.type,
      toastOnError: true,
    })
  );

  if (typeof callback === "function" && !errorMessage) callback();
};

