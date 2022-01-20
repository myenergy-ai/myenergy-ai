import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
import { taskMiddleware } from "react-palm/tasks";
import keplerReducer from "./reducers/keplerGlSlice";
import dataSlice from "./reducers/dataSlice";
import carbonCostReducer from "./reducers/carbonCostSlice";
import workingHoursSlice from "./reducers/workingHoursSlice";

const store = configureStore({
  /**
   * Configuring reducers
   */
  reducer: {
    app: appReducer,
    data: dataSlice,
    keplerGl: keplerReducer,
    carbonCost: carbonCostReducer,
    workingHours: workingHoursSlice,
  },

  /**
   * Middleware used by kepler gl
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(taskMiddleware),

  devTools: process.env.NODE_ENV !== "production",
});

export default store;
