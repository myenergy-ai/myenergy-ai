import { removeCarbonCosts } from "../redux/reducers/carbonCostSlice";
import { resetLocationData, setDataToMap } from "../redux/reducers/dataSlice";
import { resetWorkingHours } from "../redux/reducers/workingHoursSlice";
import store from "../redux/store";

/**
 * The function resets all the data in the redux store to default values
 */
export const resetAllStates = () => {
  store.dispatch(resetLocationData());
  store.dispatch(setDataToMap(null));
  store.dispatch(removeCarbonCosts());
  store.dispatch(resetWorkingHours());
};
