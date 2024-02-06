import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { spinnerSlice } from "./spinnerSlice";

const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
