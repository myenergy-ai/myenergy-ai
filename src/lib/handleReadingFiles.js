const MAIN_OBJECT_FIELD_NAME = "timelineObjects";
const FACTOR_FOR_LAT_LAN = 10000000;

const checkForAvailableFieldsInObject = (data) => {
  return JSON.parse(data).hasOwnProperty(MAIN_OBJECT_FIELD_NAME);
};

const filterOutOnlyTravelData = (data) => {
  return JSON.parse(data)[MAIN_OBJECT_FIELD_NAME]?.filter(
    (file) => file.activitySegment
  );
};

const parseData = (data, setErrorMessage, modeOfTransport, locationData) => {
  let arrayObjectField = checkForAvailableFieldsInObject(data);

  if (!arrayObjectField) {
    setErrorMessage(
      `Please select only those files that have ${MAIN_OBJECT_FIELD_NAME} field.`
    );
    return;
  }

  const fileData = filterOutOnlyTravelData(data);

  fileData?.map((item) => {
    modeOfTransport.add(item.activitySegment.activityType);

    locationData.push({
      key: locationData.length + 1,
      startLatitude:
        item.activitySegment.startLocation.latitudeE7 / FACTOR_FOR_LAT_LAN,
      startLongitude:
        item.activitySegment.startLocation.longitudeE7 / FACTOR_FOR_LAT_LAN,
      endLatitude:
        item.activitySegment.endLocation.latitudeE7 / FACTOR_FOR_LAT_LAN,
      endLongitude:
        item.activitySegment.endLocation.longitudeE7 / FACTOR_FOR_LAT_LAN,
      startTimestamp: item.activitySegment.duration.startTimestampMs,
      endTimestamp: item.activitySegment.duration.endTimestampMs,
      distance: item.activitySegment.distance,
      activityType: item.activitySegment.activityType,
      carbonCost: 0,
    });

    return item;
  });
};

export default parseData;
