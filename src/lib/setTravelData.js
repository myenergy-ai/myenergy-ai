import { validateSchema } from "./validateData";
import store from "../redux/store";
import {
  resetLocationData,
  setLocationData,
} from "../redux/reducers/dataSlice";
import { appendTravelMode } from "../redux/reducers/carbonCostSlice";
import initialCarbonCostData from "../constants/carbonCostInitialData";
import {
  filterOutOnlyTravelData,
  getDataFieldsKey,
  getKeyOfObjectHavingTravelData,
  getLatitudeAndLongitudeKey,
  getStartAndEndTimeKey,
  indexes,
  isLatitudeOrLongitudeOutofRange,
} from "./helperFunctions";

const keyOfObjectHavingTravelData = getKeyOfObjectHavingTravelData();
const dataFieldsKey = getDataFieldsKey();
const latitudeAndLongitudeKey = getLatitudeAndLongitudeKey();
const startAndEndTimeKey = getStartAndEndTimeKey();

const addTravelModesToExistingModes = (modeOfTransport) => {
  let keys = store.getState().carbonCost.carbonCosts.length;
  const newCarbonCostData = [];
  const carbonCost = store.getState().carbonCost.initialCarbonData;
  modeOfTransport.forEach((value) => {
    if (carbonCost.findIndex((val) => val.modeName === value) < 0) {
      const index = initialCarbonCostData.findIndex(
        (mode) => mode.modeName === value
      );
      newCarbonCostData.push({
        key: ++keys,
        travelMode:
          index >= 0
            ? initialCarbonCostData[index].travelMode
            : value.toLowerCase(),
        carbonCost: index >= 0 ? initialCarbonCostData[index].carbonCost : 0,
        modeName: index >= 0 ? initialCarbonCostData[index].modeName : value,
      });
    }
  });
  store.dispatch(appendTravelMode(newCarbonCostData));
};

const convertDistance = (value) => {
  if (!value) return 0;
  return typeof value === "string"
    ? parseFloat(value) / indexes.METER_TO_KM
    : value / indexes.METER_TO_KM;
};

const convertLatAndLan = (value, isLatitude) => {
  let tempValue = typeof value === "string" ? parseFloat(value) : value;
  return isLatitudeOrLongitudeOutofRange(isLatitude, tempValue)
    ? (tempValue /= indexes.FACTOR_FOR_LAT_LAN)
    : tempValue;
};

const convertTime = (value) => {
  let tempValue = typeof value === "string" ? value.trim() : value;
  return parseInt(tempValue).toString() === "NaN"
    ? (tempValue = `${new Date(tempValue).getTime()}`)
    : (tempValue =
        typeof tempValue === "string"
          ? tempValue.padEnd(13, "0")
          : `${tempValue}`.length < 13
          ? tempValue * indexes.EPOCH_TO_JSDATE
          : tempValue);
};

export const setTravelData = (
  data,
  overrideTravelData,
  overrideTravelModes
) => {
  const modeOfTransport = new Set();

  let locationData = [];
  let keys = overrideTravelData ? 0 : store.getState().data.locationData.length;

  try {
    if (!validateSchema(data)) {
      throw new Error("Invalid schema. Pass data in appropriate format.");
    }
  } catch (error) {
    throw error;
  }

  let fileData = filterOutOnlyTravelData(data);

  fileData?.map((item) => {
    const travelMode =
      item[keyOfObjectHavingTravelData][
        dataFieldsKey[indexes.ACTIVITY_TYPE_INDEX]
      ];
    const distance = convertDistance(
      item[keyOfObjectHavingTravelData][dataFieldsKey[indexes.DISTANCE_INDEX]]
    );
    if (overrideTravelModes && distance > 0) modeOfTransport.add(travelMode);

    if (distance > 0) {
      locationData.push({
        key: keys++,
        startLatitude: convertLatAndLan(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.START_LOCATION_INDEX]
          ][latitudeAndLongitudeKey[indexes.LATITUDE_INDEX]],
          true
        ),
        startLongitude: convertLatAndLan(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.START_LOCATION_INDEX]
          ][latitudeAndLongitudeKey[indexes.LONGITUDE_INDEX]],
          false
        ),
        endLatitude: convertLatAndLan(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.END_LOCATION_INDEX]
          ][latitudeAndLongitudeKey[indexes.LATITUDE_INDEX]],
          true
        ),
        endLongitude: convertLatAndLan(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.END_LOCATION_INDEX]
          ][latitudeAndLongitudeKey[indexes.LONGITUDE_INDEX]],
          false
        ),
        startTimestamp: convertTime(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.DURATION_INDEX]
          ][startAndEndTimeKey[indexes.STARTTIME_INDEX]]
        ),
        endTimestamp: convertTime(
          item[keyOfObjectHavingTravelData][
            dataFieldsKey[indexes.DURATION_INDEX]
          ][startAndEndTimeKey[indexes.ENDTIME_INDEX]]
        ),
        distance: distance,
        activityType: travelMode,
      });
    }
    return item;
  });

  if (overrideTravelData) {
    store.dispatch(resetLocationData());
  }

  if (overrideTravelModes) {
    addTravelModesToExistingModes(modeOfTransport);
  }

  store.dispatch(setLocationData(locationData));
  locationData = [];
  modeOfTransport.clear();
  fileData = [];
};
