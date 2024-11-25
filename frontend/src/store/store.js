import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    breadcrumb: breadcrumbReducer,
  },
});

export default store;
