import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carbonCosts: [],
  initialCarbonData: [],
};

export const carbonCostSlice = createSlice({
  name: "carbonCost",
  initialState,
  reducers: {
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
  addTravelMode,
  updateTravelMode,
  resetCarbonCosts,
  removeCarbonCosts,
} = carbonCostSlice.actions;

export const selectCarbonCost = (state) => state.carbonCost.carbonCosts;

export default carbonCostSlice.reducer;
