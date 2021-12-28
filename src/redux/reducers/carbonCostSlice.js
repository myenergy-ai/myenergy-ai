import { createSlice } from "@reduxjs/toolkit";

// default values of carbon costs
const initialState = {
  carbonCosts: [],
  initialCarbonData: [],
};

// Reducer for updating and reseting carbon costs
export const carbonCostSlice = createSlice({
  name: "carbonCost",
  initialState,
  reducers: {
    // To add new travel mode:
    // sets the initial travel modes based
    // based on the input files.
    addTravelMode: (state, action) => {
      state.initialCarbonData = action.payload;
      state.carbonCosts = action.payload;
    },

    // To update existing travel mode:
    // get new values from payload
    // find the existing value and replace it
    updateTravelMode: (state, action) => {
      const { key, travelMode, carbonCost } = action.payload;
      const updatedData = {
        key,
        travelMode,
        carbonCost: Number(carbonCost),
      };
      const updatedCarbonCosts = [...state.carbonCosts];
      const existingCostIndex = updatedCarbonCosts.findIndex(
        (item) => updatedData.key === item.key
      );
      const existingCost = updatedCarbonCosts[existingCostIndex];
      updatedCarbonCosts.splice(existingCostIndex, 1, {
        ...existingCost,
        ...updatedData,
      });
      state.carbonCosts = updatedCarbonCosts;
    },

    // set current state to initial state
    resetCarbonCosts: (state) => {
      state.carbonCosts = state.initialCarbonData;
    },
  },
});

// export all the actions
export const { addTravelMode, updateTravelMode, resetCarbonCosts } =
  carbonCostSlice.actions;

export const selectCarbonCost = (state) => state.carbonCost.carbonCosts;

// default export the reducer
export default carbonCostSlice.reducer;
