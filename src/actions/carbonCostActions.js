import store from "../redux/store";
import {
  addCustomTravelMode,
  updateTravelMode,
} from "../redux/reducers/carbonCostSlice";
import { INVALID_SCHEMA_ERROR } from "./utils";
import { addKeysToObjects } from "./utils";

function isKeyValid(travelMode) {
  const requiredKeys = ["travelMode", "modeName", "carbonCost"];
  const providedKeys = Object.keys(travelMode).slice().sort();

  return (
    requiredKeys.length === providedKeys.length &&
    requiredKeys
      .slice()
      .sort()
      .every(function (value, index) {
        return value === providedKeys[index];
      })
  );
}

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

function isTravelModeValid(travelMode) {
  const keyIsValid = isKeyValid(travelMode);
  const valueIsValid = isValueValid(travelMode);
  return keyIsValid && valueIsValid;
}

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
 * @param {Array of Objects} travelModes : list of objects containing travelMode, modeName and carbonCost
 * @returns {
 *  true: if travelModes schema is valid and travel modes are succesfully added
 *  INVALID_SCHEMA_ERROR: if travelModes schema is not valid
 * }
 */
export const setTravelModes = (travelModes) => {
  if (isTravelModeSchemaValid(travelModes)) {
    const generatedTravelModes = addKeysToObjects(travelModes);
    store.dispatch(addCustomTravelMode(generatedTravelModes));
    return true;
  }
  throw INVALID_SCHEMA_ERROR;
};

/**
 * @description Updates the existing value of carbon cost
 * @param {Object} updatedTravelMode : object containing travelMode, modeName and carbonCost
 * @returns {
 *  true: if param is valid and carbon cost is succesfully updated
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
 * @returns {Array Of Objects} : List of travel modes with their carbon costs
 */
export const getTravelModes = () => {
  const currState = store.getState();
  return currState.carbonCost.carbonCosts;
};

// sample data for testing
export const sampleTravelModes = [
  {
    travelMode: "Car",
    modeName: "IN_CAR",
    carbonCost: 1.2,
  },
  {
    travelMode: "Bus",
    modeName: "IN_BUS",
    carbonCost: 1.3,
  },
];

export const sampleUpdatedTravelMode = {
  travelMode: "Train",
  modeName: "IN_TRAIN",
  carbonCost: 1.12,
};
