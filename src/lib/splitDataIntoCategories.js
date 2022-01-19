import { INVALID_SCHEMA_ERROR } from "./utils";

/**
 * @description The function takes the array of objects and converts it to object with key as activityType and value as [Object] Objec is the travelData which has the activityType as the key.
 * @param {[Object]} updatedLocationDataWithCarbonCost Obejct must have an activityType and all other data like startLatitude, endLatitude...
 * @returns {Object}
 */
export const convertDataToMapFormat = (updatedLocationDataWithCarbonCost) => {
  if (Array.isArray(updatedLocationDataWithCarbonCost)) {
    return updatedLocationDataWithCarbonCost.reduce(function (newObj, oldObj) {
      if (oldObj.activityType) {
        const key = oldObj.activityType;
        if (newObj[key] || (newObj[key] = [])) newObj[key].push(oldObj);
        return newObj;
      } else {
        try {
          throw INVALID_SCHEMA_ERROR;
        } catch (error) {
          throw error;
        }
      }
    }, {});
  } else {
    try {
      throw INVALID_SCHEMA_ERROR;
    } catch (error) {
      throw error;
    }
  }
};
