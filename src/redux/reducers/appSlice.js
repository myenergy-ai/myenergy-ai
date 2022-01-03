import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  error: "",
  helpModalVisisbility: false,
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
    setHelpModalVisisbility: (state, action) => {
      state.helpModalVisisbility = action.payload;
    },
  },
});

export const { setCurrentStep, setError, setHelpModalVisisbility } =
  appSlice.actions;

export const selectCurrentStep = (state) => state.app.currentStep;
export const selectError = (state) => state.app.error;
export const selectHelpModalVisisbility = (state) =>
  state.app.helpModalVisisbility;

export default appSlice.reducer;
