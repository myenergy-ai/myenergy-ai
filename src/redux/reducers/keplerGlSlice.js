import keplerGlReducer from "kepler.gl/reducers";

const keplerReducer = keplerGlReducer.initialState({
  /**
   * For Hiding the default mmodal to input data.
   */
  uiState: {
    currentModal: null,
  },
});

export default keplerReducer;
