import { createSlice } from "@reduxjs/toolkit";

// default values of carbon costs
const initialState = {
  carbonCosts: [
    {
      key: 1,
      travelMode: "Plane",
      carbonCost: 0.187,
    },
    {
      key: 2,
      travelMode: "Bus",
      carbonCost: 0.105,
    },
    {
      key: 3,
      travelMode: "Ferry",
      carbonCost: 0.019,
    },
    {
      key: 4,
      travelMode: "Other Passenger Vehicle",
      carbonCost: 0.181,
    },
    {
      key: 5,
      travelMode: "Subway/Underground/Metro",
      carbonCost: 0.041,
    },
    {
      key: 6,
      travelMode: "Train",
      carbonCost: 0.041,
    },
    {
      key: 7,
      travelMode: "Tram",
      carbonCost: 0.041,
    },
    {
      key: 8,
      travelMode: "Car",
      carbonCost: 0.182,
    },
    {
      key: 9,
      travelMode: "Motorcycle",
      carbonCost: 0.103,
    },
  ],
};

// Reducer for updating and reseting carbon costs
export const carbonCostSlice = createSlice({
  name: "carbonCost",
  initialState,
  reducers: {

    // To add new travel mode:
    // generate key from length
    // set initial values to 
    // travelMode and carbonCost
    addNewTravelMode: (state) => {
      const key = state.carbonCosts.length + 1;
      const newTravelMode = {
        key,
        travelMode: "New Travel Mode",
        carbonCost: 0,
      };
      state.carbonCosts.push(newTravelMode);
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
      const index = updatedCarbonCosts.findIndex((item) => updatedData.key === item.key);
      const item = updatedCarbonCosts[index];
      updatedCarbonCosts.splice(index, 1, { ...item, ...updatedData });
      state.carbonCosts = updatedCarbonCosts;
    },

    // set current state to initial state
    resetCarbonCosts: (state) => {
      state.carbonCosts = initialState.carbonCosts;
    }
  },
});

// export all the actions
export const { addNewTravelMode, updateTravelMode, resetCarbonCosts } = carbonCostSlice.actions;

// default export the reducer
export default carbonCostSlice.reducer;
