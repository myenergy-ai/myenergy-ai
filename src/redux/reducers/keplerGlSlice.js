import keplerGlReducer from "kepler.gl/reducers";

const keplerReducer = keplerGlReducer.initialState({
  uiState: {
    currentModal: null,
  },
});

export default keplerReducer;
