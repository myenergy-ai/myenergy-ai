import { schema } from "../constants/schema";
import { removeCarbonCosts } from "../redux/reducers/carbonCostSlice";
import { resetLocationData, setDataToMap } from "../redux/reducers/dataSlice";
import { resetWorkingHours } from "../redux/reducers/workingHoursSlice";
import store from "../redux/store";

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
 * @description The function filters out the array based on the field that has travel data.
 * @param {[Object]} data Object that the user has uploaded
 * @returns [Object]
 */
export const filterOutOnlyTravelData = (data) => {
  return JSON.parse(data)[getKeyOfArrayOfObjectHavingData()]?.filter(
    (file) => file[getKeyOfObjectHavingTravelData()]
  );
};

/**
 * @description The function returns the key to the array of object from the schema.
 * @returns String
 */
export const getKeyOfArrayOfObjectHavingData = () => Object.keys(schema)[0];

/**
 * @description The function return the key to the object that has travel data from the schema.
 * @returns String
 */
export const getKeyOfObjectHavingTravelData = () =>
  Object.keys(schema[getKeyOfArrayOfObjectHavingData(schema)][0])[0];

/**
 * The function returns the [String] which has the data from the schema
 * @returns [String]
 */
export const getDataFieldsKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ]
  );

/**
 * The function returns the latitude and longitude key from the schema
 * @returns String
 */
export const getLatitudeAndLongitudeKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ][getDataFieldsKey(schema)[indexes.START_LOCATION_INDEX]]
  );

/**
 * The function returns the start and end time key from the schema
 * @returns String
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
 * @returns Boolean
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
 * The function resets all the data in the redux store to default values
 */
const resetAllStates = () => {
  store.dispatch(resetLocationData());
  store.dispatch(setDataToMap(null));
  store.dispatch(removeCarbonCosts());
  store.dispatch(resetWorkingHours());
};

export default resetAllStates;
