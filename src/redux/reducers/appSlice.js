import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  currentStep: 0,
  error: "",
  helpModalVisisbility: false,
};

/**
 * Reducers for changing the data
 */
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Setting up steps as user proceeds further.
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    // Setting error if error occurs.
    setError: (state, action) => {
      state.error = action.payload;
    },
    // This helps in openig up the help section.
    setHelpModalVisisbility: (state, action) => {
      state.helpModalVisisbility = action.payload;
    },
  },
});

export const { setCurrentStep, setError, setHelpModalVisisbility } =
  appSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectCurrentStep = (state) => state.app.currentStep;
export const selectError = (state) => state.app.error;
export const selectHelpModalVisisbility = (state) =>
  state.app.helpModalVisisbility;

export default appSlice.reducer;
