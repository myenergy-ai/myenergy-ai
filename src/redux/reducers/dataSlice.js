import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationData: [],
  dataToMap: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLocationData: (state, action) => {
      state.locationData.push(...action.payload);
    },
    resetLocationData: (state) => {
      state.locationData = [];
    },
    setDataToMap: (state, action) => {
      state.dataToMap = action.payload;
    },
    resetDataToMap: (state) => {
      state.dataToMap = null;
    },
  },
});

export const {
  setLocationData,
  setDataToMap,
  resetLocationData,
  resetDataToMap,
} = dataSlice.actions;

export const selectLocationData = (state) => state.data.locationData;
export const selectDataToMap = (state) => state.data.dataToMap;

export default dataSlice.reducer;
