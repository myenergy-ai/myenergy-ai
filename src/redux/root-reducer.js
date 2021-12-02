import { combineReducers } from "redux";
import toogleReducer from "./reducers/get-started-toogle/toogle-reducer";

const rootReducer = combineReducers({
  toogleReducer,
});

export default rootReducer;
