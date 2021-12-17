import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  locationData: null,
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
  },
});

export const { setLocationData } = dataSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectLocationData = (state) => state.data.locationData;

export default dataSlice.reducer;
