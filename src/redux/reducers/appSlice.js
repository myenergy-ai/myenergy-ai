import { createSlice } from "@reduxjs/toolkit";

/**
 * States for maintainig the steps and error messages
 */
const initialState = {
  currentStep: 0,
  error: "",
  isModalVisible: false,
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
    setModalVisibility: (state, action) => {
      state.isModalVisible = action.payload;
    },
  },
});

export const { setCurrentStep, setError, setModalVisibility } =
  appSlice.actions;

/**
 * Selectors for acessing data in the components
 */
export const selectCurrentStep = (state) => state.app.currentStep;
export const selectError = (state) => state.app.error;
export const selectModalVisisbility = (state) => state.app.isModalVisible;

export default appSlice.reducer;
