import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationData: null,
  dataToMap: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setDataToMap: (state, action) => {
      state.dataToMap = action.payload;
    },
  },
});

export const { setLocationData, setDataToMap } = dataSlice.actions;

export const selectLocationData = (state) => state.data.locationData;
export const selectDataToMap = (state) => state.data.dataToMap;

export default dataSlice.reducer;
