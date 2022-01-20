import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  error: "",
  helpModalVisibility: false,
};

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
    setHelpModalVisibility: (state, action) => {
      state.helpModalVisibility = action.payload;
    },
  },
});

export const { setCurrentStep, setError, setHelpModalVisibility } =
  appSlice.actions;

export const selectCurrentStep = (state) => state.app.currentStep;
export const selectError = (state) => state.app.error;
export const selectHelpModalVisibility = (state) =>
  state.app.helpModalVisibility;

export default appSlice.reducer;
