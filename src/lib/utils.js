import { schema } from "../constants/schema";

export const indexes = {
  START_LOCATION_INDEX: 0,
  END_LOCATION_INDEX: 1,
  DURATION_INDEX: 2,
  DISTANCE_INDEX: 3,
  ACTIVITY_TYPE_INDEX: 4,
  LATITUDE_INDEX: 0,
  LONGITUDE_INDEX: 1,
  STARTTIME_INDEX: 0,
  ENDTIME_INDEX: 1,
  METER_TO_KM: 1000,
  FACTOR_FOR_LAT_LAN: 10000000,
  LATITUDE_MAX: 90,
  LATITUDE_MIN: -90,
  LONGITUDE_MAX: 180,
  LONGITUDE_MIN: -180,
  EPOCH_TO_JSDATE: 1000,
};

/**
 * @description The function takes the array and adds a unique key to each child.
 * @param {[*]} list
 * @returns {[Object]}
 */
export const addKeysToObjects = (list) => {
  return list.map((item, index) => ({ ...item, key: index + 1 }));
};

export const INVALID_SCHEMA_ERROR = new Error(
  "INVALID SCHEMA: The schema of object parameter passed is not in valid format"
);

/**
 * @description The function returns whether the dataObject has the keys provided in the requiredKey array.
 * @param {Object} dataObject
 * @param {[*]} requiredKeys
 * @returns {Boolean}
 */
export function isKeyValid(dataObject, requiredKeys) {
  const providedKeys = Object.keys(dataObject).slice().sort();
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

/**
 * @description The function filters out the array based on the field that has travel data.
 * @param {[Object]} data Object that the user has uploaded
 * @returns {[Object]}
 */
export const filterOutOnlyTravelData = (data) => {
  return JSON.parse(data)[getKeyOfArrayOfObjectHavingData()]?.filter(
    (file) => file[getKeyOfObjectHavingTravelData()]
  );
};

/**
 * @description The function returns the key to the array of objects from the schema.
 * @returns {String}
 */
export const getKeyOfArrayOfObjectHavingData = () => Object.keys(schema)[0];

/**
 * @description The function returns the key to the object that has travel data from the schema.
 * @returns {String}
 */
export const getKeyOfObjectHavingTravelData = () =>
  Object.keys(schema[getKeyOfArrayOfObjectHavingData(schema)][0])[0];

/**
 * The function returns the [String] which has the data from the schema
 * @returns {[String]}
 */
export const getDataFieldsKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ]
  );

/**
 * The function returns the latitude and longitude key from the schema
 * @returns {String}
 */
export const getLatitudeAndLongitudeKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ][getDataFieldsKey(schema)[indexes.START_LOCATION_INDEX]]
  );

/**
 * The function returns the start and end time key from the schema
 * @returns {String}
 */
export const getStartAndEndTimeKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ][getDataFieldsKey(schema)[indexes.DURATION_INDEX]]
  );

/**
 * @description The function checks whether the lat and lng are in range.
 * @param {Boolean} isLatitude
 * @param {Number} tempValue The value of latitude or longitude
 * @returns {Boolean}
 */
export const isLatitudeOrLongitudeOutofRange = (isLatitude, tempValue) => {
  return (
    (isLatitude &&
      (tempValue > indexes.LATITUDE_MAX || tempValue < indexes.LATITUDE_MIN)) ||
    (!isLatitude &&
      (tempValue > indexes.LONGITUDE_MAX || tempValue < indexes.LONGITUDE_MIN))
  );
};

/**
 * @description The function checks whether the lat or lng is valid.
 * @param {String, Number} value
 * @param {Boolean} isLatitude
 * @returns {Boolean}
 */
export const validateLatAndLan = (value, isLatitude) => {
  if (!value) return false;
  if (
    !schema[getKeyOfArrayOfObjectHavingData()][0][
      getKeyOfObjectHavingTravelData()
    ][getDataFieldsKey()[indexes.START_LOCATION_INDEX]][
      getLatitudeAndLongitudeKey()[indexes.LATITUDE_INDEX]
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
  if (isLatitudeOrLongitudeOutofRange(isLatitude, tempValue)) {
    return false;
  }
  return true;
};
