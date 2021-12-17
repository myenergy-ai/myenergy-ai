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
    kepler: keplerReducer,
    carbonCost: carbonCostReducer,
    workingHours: workingHoursSlice,
  },

  /**
   * Middlewares used by kepler gl
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskMiddleware),
});

export default store;
