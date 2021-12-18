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
};

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
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
    resetWorkingHours: (state) => {
      state.workingTimes = initialState.workingTimes;
    },
  },
});

export const { updateWorkingTime, resetWorkingHours } = workingHoursSlice.actions;
export default workingHoursSlice.reducer;
