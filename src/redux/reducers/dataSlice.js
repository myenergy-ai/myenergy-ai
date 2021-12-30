import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  locationData: null,
  dataToMap: null,
};

/**
 * Reducers for changing the data
 */
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Setting up location data uploaded by the user.
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    // Setting up data for showing in the map.
    setDataToMap: (state, action) => {
      state.dataToMap = action.payload;
    },
  },
});

export const { setLocationData, setDataToMap } = dataSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectLocationData = (state) => state.data.locationData;
export const selectDataToMap = (state) => state.data.dataToMap;

export default dataSlice.reducer;
