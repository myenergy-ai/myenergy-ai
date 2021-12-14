import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
import { taskMiddleware } from "react-palm/tasks";
import keplerReducer from "./reducers/keplerGlSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    kepler: keplerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskMiddleware),
});

export default store;
