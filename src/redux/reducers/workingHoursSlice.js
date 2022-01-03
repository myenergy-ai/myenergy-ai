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
    // For updating the working time.
    updateWorkingTime: (state, action) => {
      const updatedWorkingTimes = [...state.workingTimes];
      const updatedData = action.payload;
      const existingDataIndex = updatedWorkingTimes.findIndex(
        (item) => item.key === updatedData.key
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
    // For reseting to default values.
    resetWorkingHours: (state) => {
      state.workingTimes = initialState.workingTimes;
      state.includeAllHoursAndDays = initialState.includeAllHoursAndDays;
    },
  },
});

export const {
  updateWorkingTime,
  resetWorkingHours,
  setIncludeAllHoursAndDays,
} = workingHoursSlice.actions;

export const selectWorkingHours = (state) => state.workingHours.workingTimes;
export const selectIncludeAllHoursAndDays = (state) =>
  state.workingHours.includeAllHoursAndDays;

export default workingHoursSlice.reducer;
