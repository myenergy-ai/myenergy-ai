import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workingTimes: [
    {
      key: 1,
      day: "Monday",
      workingTime: "0900-1700",
    },
    {
      key: 2,
      day: "Tuesday",
      workingTime: "0900-1700",
    },
    {
      key: 3,
      day: "Wednesday",
      workingTime: "0900-1700",
    },
    {
      key: 4,
      day: "Thursday",
      workingTime: "0900-1700",
    },
    {
      key: 5,
      day: "Friday",
      workingTime: "0900-1700",
    },
    {
      key: 6,
      day: "Saturday",
      workingTime: "",
    },
    {
      key: 7,
      day: "Sunday",
      workingTime: "",
    },
    {
      key: 8,
      day: "Date ranges to exclude",
      workingTime: "",
    },
  ],
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
