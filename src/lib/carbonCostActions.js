import store from "../redux/store";
import {
  appendTravelMode,
  updateTravelMode,
} from "../redux/reducers/carbonCostSlice";
import { INVALID_SCHEMA_ERROR, isKeyValid } from "./utils";
import { addKeysToObjects } from "./utils";

/**
 * @description The function returns whether the fields of the objects are valid.
 * @param {Object} travelMode Object provided by the user
 * @returns {Boolean}
 */
function isValueValid(travelMode) {
  if (
    typeof travelMode.travelMode === "string" &&
    typeof travelMode.modeName === "string" &&
    isFinite(travelMode.carbonCost)
  ) {
    return true;
  }
  return false;
}

/**
 * @description The function checks whether the input provided by the user has required keys and valid values.
 * @param {Object} travelMode
 * @returns {Boolean}
 */
function isTravelModeValid(travelMode) {
  const requiredKeys = ["travelMode", "modeName", "carbonCost"];
  const keyIsValid = isKeyValid(travelMode, requiredKeys);
  const valueIsValid = isValueValid(travelMode);
  return keyIsValid && valueIsValid;
}

/**
 * @description The function checks the schema of the input user provided.
 * @param {Object} travelModes
 * @returns {Boolean}
 */
function isTravelModeSchemaValid(travelModes) {
  for (let travelMode of travelModes) {
    if (!isTravelModeValid(travelMode)) {
      return false;
    }
  }
  return true;
}

/**
 * @description Validates and adds the travel modes provided by the user
 * @param {[Objects]} travelModes : list of objects containing travelMode, modeName and carbonCost
 * @returns {
 *  true: if travelModes schema is valid and travel modes are successfully added
 *  INVALID_SCHEMA_ERROR: if travelModes schema is not valid
 * }
 */
export const setTravelModes = (travelModes) => {
  if (isTravelModeSchemaValid(travelModes)) {
    const generatedTravelModes = addKeysToObjects(travelModes);
    store.dispatch(appendTravelMode(generatedTravelModes));
    return true;
  }
  throw INVALID_SCHEMA_ERROR;
};

/**
 * @description Updates the existing value of carbon footprint
 * @param {Object} updatedTravelMode : object containing travelMode, modeName and carbonCost
 * @returns {
 *  true: if param is valid and carbon footprint is successfully updated
 *  INVALID_SCHEMA_ERROR: if updatedTravelMode schema is not valid
 * }
 */
export const updateCarbonCosts = (updatedTravelMode) => {
  if (isTravelModeValid(updatedTravelMode)) {
    store.dispatch(updateTravelMode(updatedTravelMode));
    return true;
  }
  throw INVALID_SCHEMA_ERROR;
};

/**
 * @description Getter method for travel modes
 * @returns {[Objects]}
 */
export const getTravelModes = () => {
  const currState = store.getState();
  return currState.carbonCost.carbonCosts;
};
