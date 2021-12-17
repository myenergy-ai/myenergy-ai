import keplerGlReducer from "kepler.gl/reducers";

const keplerReducer = keplerGlReducer.initialState({
  /**
   * For Hiding the default side panel
   */
  uiState: {
    currentModal: null,
  },
});

export default keplerReducer;
