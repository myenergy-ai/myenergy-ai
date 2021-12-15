import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  currentStep: 3,
  error: "",
};

/**
 * Reducers for changing the data
 */
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentStep, setError } = appSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectCurrentStep = (state) => state.app.currentStep;
export const selectError = (state) => state.app.error;

export default appSlice.reducer;
