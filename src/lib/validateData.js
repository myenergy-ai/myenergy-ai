import { schema } from "../constants/schema";
import {
  filterOutOnlyTravelData,
  getDataFieldsKey,
  getKeyOfArrayOfObjectHavingData,
  getKeyOfObjectHavingTravelData,
  getLatitudeAndLongitudeKey,
  getStartAndEndTimeKey,
  indexes,
} from "./helperFunctions";

const keyOfArrayOfObjectHavingData = getKeyOfArrayOfObjectHavingData();
const keyOfObjectHavingTravelData = getKeyOfObjectHavingTravelData();
const dataFieldsKey = getDataFieldsKey();
const latitudeAndLongitudeKey = getLatitudeAndLongitudeKey();
const startAndEndTimeKey = getStartAndEndTimeKey();

const checkForAvailableFieldsInObject = (data) => {
  return JSON.parse(data).hasOwnProperty(keyOfArrayOfObjectHavingData);
};

const isLatitudeOrLongitudeInRange = (isLatitude, tempValue) => {
  return isLatitude
    ? tempValue <= indexes.LATITUDE_MAX && tempValue >= indexes.LATITUDE_MIN
    : tempValue <= indexes.LONGITUDE_MAX && tempValue >= indexes.LONGITUDE_MIN;
};

const validateLatAndLan = (value, isLatitude) => {
  if (!value) return false;
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[indexes.START_LOCATION_INDEX]
    ][
      latitudeAndLongitudeKey[indexes.LATITUDE_INDEX]
    ].supportsDataType.includes(typeof value)
  ) {
    return false;
  }
  let tempValue = value;
  if (typeof value === "string") {
    tempValue = parseFloat(value);
    if (tempValue.toString() === "NaN") {
      return false;
    }
  }

  if (!`${tempValue}`.includes(".")) {
    tempValue /= indexes.FACTOR_FOR_LAT_LAN;
  }
  if (!isLatitudeOrLongitudeInRange(isLatitude, tempValue)) {
    return false;
  }
  return true;
};

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

const validateModeOfTransport = (value) => {
  if (!value) return false;
  return true;
};

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
