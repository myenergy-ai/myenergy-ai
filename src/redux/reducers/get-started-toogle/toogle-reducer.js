import TOOGLE_TYPES from "./toogle-types";
const INITIAl_STATE = {
  hidden: false,
};

const toggleReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {
    case TOOGLE_TYPES.TOOGLE_IT:
      return {
        ...state,
        hidden: !state.hidden,
      };

    default:
      return state;
  }
};

export default toggleReducer;

export const toogleSelector = (state) => state.toogleReducer.hidden;
