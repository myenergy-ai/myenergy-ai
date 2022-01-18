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

export const filterOutOnlyTravelData = (data) => {
  return JSON.parse(data)[getKeyOfArrayOfObjectHavingData()]?.filter(
    (file) => file[getKeyOfObjectHavingTravelData()]
  );
};

export const getKeyOfArrayOfObjectHavingData = () => Object.keys(schema)[0];

export const getKeyOfObjectHavingTravelData = () =>
  Object.keys(schema[getKeyOfArrayOfObjectHavingData(schema)][0])[0];

export const getDataFieldsKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ]
  );

export const getLatitudeAndLongitudeKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ][getDataFieldsKey(schema)[indexes.START_LOCATION_INDEX]]
  );

export const getStartAndEndTimeKey = () =>
  Object.keys(
    schema[getKeyOfArrayOfObjectHavingData(schema)][0][
      getKeyOfObjectHavingTravelData(schema)
    ][getDataFieldsKey(schema)[indexes.DURATION_INDEX]]
  );

export const isLatitudeOrLongitudeOutofRange = (isLatitude, tempValue) => {
  return (
    (isLatitude &&
      (tempValue > indexes.LATITUDE_MAX || tempValue < indexes.LATITUDE_MIN)) ||
    (!isLatitude &&
      (tempValue > indexes.LONGITUDE_MAX || tempValue < indexes.LONGITUDE_MIN))
  );
};

const resetAllStates = () => {
  store.dispatch(resetLocationData());
  store.dispatch(setDataToMap(null));
  store.dispatch(removeCarbonCosts());
  store.dispatch(resetWorkingHours());
};

export default resetAllStates;
