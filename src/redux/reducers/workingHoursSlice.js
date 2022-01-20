import { createSlice } from "@reduxjs/toolkit";
import { initialWorkingHours } from "../../constants/workingHoursData";

const initialState = {
  workingTimes: initialWorkingHours,
  includeAllHoursAndDays: false,
};

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
    addCustomWorkingHours: (state, action) => {
      state.workingTimes = action.payload;
    },
    // For updating the working time.
    updateWorkingTime: (state, action) => {
      const updatedWorkingTimes = [...state.workingTimes];
      const updatedData = action.payload;
      const existingDataIndex = updatedWorkingTimes.findIndex(
        (item) => item.day === updatedData.day
      );
      const existingData = updatedWorkingTimes[existingDataIndex];
      updatedWorkingTimes.splice(existingDataIndex, 1, {
        ...existingData,
        ...updatedData,
      });
      state.workingTimes = updatedWorkingTimes;
    },
    // For removing work hours filter and exclude days.
    setIncludeAllHoursAndDays: (state, action) => {
      state.includeAllHoursAndDays = action.payload;
    },
    // For resetting to default values.
    resetWorkingHours: (state) => {
      state.workingTimes = initialState.workingTimes;
      state.includeAllHoursAndDays = initialState.includeAllHoursAndDays;
    },
  },
});

export const {
  addCustomWorkingHours,
  updateWorkingTime,
  resetWorkingHours,
  setIncludeAllHoursAndDays,
} = workingHoursSlice.actions;

export const selectWorkingHours = (state) => state.workingHours.workingTimes;
export const selectIncludeAllHoursAndDays = (state) =>
  state.workingHours.includeAllHoursAndDays;

export default workingHoursSlice.reducer;
