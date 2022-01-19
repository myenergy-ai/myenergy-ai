import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carbonCosts: [],
  initialCarbonData: [],
};

export const carbonCostSlice = createSlice({
  name: "carbonCost",
  initialState,
  reducers: {
    appendTravelMode: (state, action) => {
      state.initialCarbonData.push(...action.payload);
      state.carbonCosts.push(...action.payload);
    },

    addCustomTravelMode: (state, action) => {
      state.carbonCosts = action.payload;
    },

    // To update existing travel mode:
    // get new values from payload
    // find the existing value and replace it
    updateTravelMode: (state, action) => {
      const { travelMode, carbonCost, modeName } = action.payload;
      const updatedData = {
        travelMode,
        carbonCost: Number(carbonCost),
        modeName,
      };
      const updatedCarbonCosts = [...state.carbonCosts];
      const existingCostIndex = updatedCarbonCosts.findIndex(
        (item) => updatedData.modeName === item.modeName
      );
      const existingCost = updatedCarbonCosts[existingCostIndex];
      updatedCarbonCosts.splice(existingCostIndex, 1, {
        ...existingCost,
        ...updatedData,
      });

      state.carbonCosts = updatedCarbonCosts;
    },

    resetCarbonCosts: (state) => {
      state.carbonCosts = state.initialCarbonData;
    },

    removeCarbonCosts: (state) => {
      state.carbonCosts = [];
      state.initialCarbonData = [];
    },
  },
});

export const {
  appendTravelMode,
  updateTravelMode,
  resetCarbonCosts,
  removeCarbonCosts,
} = carbonCostSlice.actions;

export const selectCarbonCost = (state) => state.carbonCost.carbonCosts;

export default carbonCostSlice.reducer;
