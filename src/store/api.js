import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction("api/apiRequest");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailure = createAction("api/callFailure");
