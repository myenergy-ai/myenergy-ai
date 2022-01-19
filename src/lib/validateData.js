import { schema } from "../constants/schema";
import {
  filterOutOnlyTravelData,
  getDataFieldsKey,
  getKeyOfArrayOfObjectHavingData,
  getKeyOfObjectHavingTravelData,
  getLatitudeAndLongitudeKey,
  getStartAndEndTimeKey,
  indexes,
  validateLatAndLan,
} from "./utils";

const keyOfArrayOfObjectHavingData = getKeyOfArrayOfObjectHavingData();
const keyOfObjectHavingTravelData = getKeyOfObjectHavingTravelData();
const dataFieldsKey = getDataFieldsKey();
const latitudeAndLongitudeKey = getLatitudeAndLongitudeKey();
const startAndEndTimeKey = getStartAndEndTimeKey();

/**
 * @description The function takes the user data and checks whether it has the main obejct key.
 * @param {Object} data User's travel data obejct
 * @returns {Boolean}
 */
const checkForAvailableFieldsInObject = (data) => {
  return JSON.parse(data).hasOwnProperty(keyOfArrayOfObjectHavingData);
};

/**
 * @description The function checks whether the time is valid or not.
 * @param {String, Number} value
 * @returns {Boolean}
 */
const validateTime = (value) => {
  if (!value) return false;
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[indexes.DURATION_INDEX]
    ][startAndEndTimeKey[indexes.STARTTIME_INDEX]].supportsDataType.includes(
      typeof value
    )
  ) {
    return false;
  }
  let tempValue = typeof value === "string" ? value.trim() : value;
  if (parseInt(tempValue).toString() === "NaN") {
    tempValue = new Date(tempValue);
    if (tempValue.toString() === "Invalid Date") {
      return false;
    }
  }
  return true;
};

/**
 * The function checks whether the value is valid or not.
 * @param {String} value
 * @returns {Boolean}
 */
const validateModeOfTransport = (value) => {
  if (!value) return false;
  return true;
};

/**
 * @description The function validates whether each and every field in the data is valid or not and whether the data is in the given format.
 * @param {Object} data The data user has uploaded
 * @returns {Boolean}
 */
export const validateSchema = (data) => {
  if (!checkForAvailableFieldsInObject(data)) {
    return false;
  }

  const fileData = filterOutOnlyTravelData(data);

  let isSuccessfull = true;

  fileData?.map((item) => {
    isSuccessfull =
      isSuccessfull &&
      validateLatAndLan(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.START_LOCATION_INDEX]
        ][latitudeAndLongitudeKey[indexes.LATITUDE_INDEX]],
        true
      ) &&
      validateLatAndLan(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.START_LOCATION_INDEX]
        ][latitudeAndLongitudeKey[indexes.LONGITUDE_INDEX]],
        false
      ) &&
      validateLatAndLan(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.END_LOCATION_INDEX]
        ][latitudeAndLongitudeKey[indexes.LATITUDE_INDEX]],
        true
      ) &&
      validateLatAndLan(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.END_LOCATION_INDEX]
        ][latitudeAndLongitudeKey[indexes.LONGITUDE_INDEX]],
        false
      ) &&
      validateTime(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.DURATION_INDEX]
        ][startAndEndTimeKey[indexes.STARTTIME_INDEX]]
      ) &&
      validateTime(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.DURATION_INDEX]
        ][startAndEndTimeKey[indexes.ENDTIME_INDEX]]
      ) &&
      validateModeOfTransport(
        item[keyOfObjectHavingTravelData][
          dataFieldsKey[indexes.ACTIVITY_TYPE_INDEX]
        ]
      );
    return item;
  });
  return isSuccessfull;
};
