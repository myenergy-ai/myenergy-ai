import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  locationData: null,
  carbonCostData: null,
};

/**
 * Reducers for changing the data
 */
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setCarbonCostData: (state, action) => {
      state.carbonCostData = action.payload;
    },
  },
});

export const { setLocationData, setCarbonCostData } = dataSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectLocationData = (state) => state.data.locationData;
export const selectCarbonCostData = (state) => state.data.carbonCostData;

export default dataSlice.reducer;
