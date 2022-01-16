import { schema } from "../constants/schema";

const FACTOR_FOR_LAT_LAN = 10000000;
const METER_TO_KM = 1000;
const LATITUDE_MAX = 90;
const LATITUDE_MIN = -90;
const LONGITUDE_MAX = 190;
const LONGITUDE_MIN = -180;
const START_LOCATION_INDEX = 0;
const END_LOCATION_INDEX = 1;
const DURATION_INDEX = 2;
const DISTANCE_INDEX = 3;
const ACTIVITY_TYPE_INDEX = 4;
const LATITUDE_INDEX = 0;
const LONGITUDE_INDEX = 1;
const STARTTIME_INDEX = 0;
const ENDTIME_INDEX = 1;
const keyOfArrayOfObjectHavingData = Object.keys(schema)[0];
const keyOfObjectHavingTravelData = Object.keys(
  schema[keyOfArrayOfObjectHavingData][0]
)[0];
const dataFieldsKey = Object.keys(
  schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData]
);
const latitudeAndLongitudeKey = Object.keys(
  schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
    dataFieldsKey[START_LOCATION_INDEX]
  ]
);
const startAndEndTimeKey = Object.keys(
  schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
    dataFieldsKey[DURATION_INDEX]
  ]
);

const checkForAvailableFieldsInObject = (data) => {
  return JSON.parse(data).hasOwnProperty(keyOfArrayOfObjectHavingData);
};

const filterOutOnlyTravelData = (data) => {
  return JSON.parse(data)[keyOfArrayOfObjectHavingData]?.filter(
    (file) => file[keyOfObjectHavingTravelData]
  );
};

const validateDistance = (value, setErrorMessage) => {
  if (!value) {
    return 0;
  }
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[DISTANCE_INDEX]
    ].supportsDataType.includes(typeof value)
  ) {
    setErrorMessage(
      "Please check the distance travelled is in yards and of correct format."
    );
  }
  let tempValue = value;
  if (typeof value === "string") {
    tempValue = parseFloat(value);
    if (tempValue.toString() === "NaN") {
      setErrorMessage(
        "Please check the distance travelled is in yards and of correct format."
      );
    }
  }
  tempValue = tempValue / METER_TO_KM;
  return tempValue;
};

const isLatitudeOrLongitudeOutofRange = (isLatitude, tempValue) => {
  return (
    (isLatitude && (tempValue > LATITUDE_MAX || tempValue < LATITUDE_MIN)) ||
    (!isLatitude && (tempValue > LONGITUDE_MAX || tempValue < LONGITUDE_MIN))
  );
};

const validateLatAndLan = (value, setErrorMessage, isLatitude) => {
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[START_LOCATION_INDEX]
    ][latitudeAndLongitudeKey[LATITUDE_INDEX]].supportsDataType.includes(
      typeof value
    )
  ) {
    setErrorMessage(
      "Please check your start or end latitude and longitude are valid."
    );
  }
  let tempValue = value;
  if (typeof value === "string") {
    tempValue = parseFloat(value);
    if (tempValue.toString() === "NaN") {
      setErrorMessage(
        "Please check your start or end latitude and longitude are valid."
      );
    }
  }
  if (isLatitudeOrLongitudeOutofRange(isLatitude, tempValue))
    tempValue /= FACTOR_FOR_LAT_LAN;
  if (isLatitudeOrLongitudeOutofRange(isLatitude, tempValue)) {
    setErrorMessage(
      "Please check your start or end latitude and longitude are valid."
    );
    return 0;
  }
  return tempValue;
};

const validateTime = (value, setErrorMessage) => {
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[DURATION_INDEX]
    ][startAndEndTimeKey[STARTTIME_INDEX]].supportsDataType.includes(
      typeof value
    )
  ) {
    setErrorMessage("Please check whether your start or end time is valid");
  }
  let tempValue = value.trim();
  if (parseInt(tempValue).toString() === "NaN") {
    tempValue = new Date(tempValue);
    if (tempValue.toString() === "Invalid Date") {
      setErrorMessage("Please check whether your start or end time is valid");
    } else {
      tempValue = `${tempValue.getTime()}`;
    }
  } else {
    tempValue = tempValue.padEnd(13, "0");
  }
  return tempValue;
};

const validateModeOfTransport = (value) => {
  if (
    !schema[keyOfArrayOfObjectHavingData][0][keyOfObjectHavingTravelData][
      dataFieldsKey[ACTIVITY_TYPE_INDEX]
    ].mustBeAmongst.includes(value)
  ) {
    return null;
  }
  return value;
};

const parseData = (
  data,
  setErrorMessage,
  modeOfTransport,
  locationData,
  notIncludingModesOfTransport
) => {
  let arrayObjectField = checkForAvailableFieldsInObject(data);

  if (!arrayObjectField) {
    setErrorMessage(
      `Please select only those files that have 'timelineObjects' field as the direct child of the main object`
    );
    return;
  }

  const fileData = filterOutOnlyTravelData(data);

  fileData?.map((item) => {
    const travelMode =
      item[keyOfObjectHavingTravelData][dataFieldsKey[ACTIVITY_TYPE_INDEX]];
    if (!validateModeOfTransport(travelMode)) {
      if (travelMode !== "UNKNOWN_ACTIVITY_TYPE" && travelMode !== "WALKING")
        notIncludingModesOfTransport.add(travelMode);
      return null;
    }
    modeOfTransport.add(travelMode);

    locationData.push({
      key: locationData.length + 1,
      startLatitude: validateLatAndLan(
        item[keyOfObjectHavingTravelData][dataFieldsKey[START_LOCATION_INDEX]][
          latitudeAndLongitudeKey[LATITUDE_INDEX]
        ],
        setErrorMessage,
        true
      ),
      startLongitude: validateLatAndLan(
        item[keyOfObjectHavingTravelData][dataFieldsKey[START_LOCATION_INDEX]][
          latitudeAndLongitudeKey[LONGITUDE_INDEX]
        ],
        setErrorMessage,
        false
      ),
      endLatitude: validateLatAndLan(
        item[keyOfObjectHavingTravelData][dataFieldsKey[END_LOCATION_INDEX]][
          latitudeAndLongitudeKey[LATITUDE_INDEX]
        ],
        setErrorMessage,
        true
      ),
      endLongitude: validateLatAndLan(
        item[keyOfObjectHavingTravelData][dataFieldsKey[END_LOCATION_INDEX]][
          latitudeAndLongitudeKey[LONGITUDE_INDEX]
        ],
        setErrorMessage,
        false
      ),
      startTimestamp: validateTime(
        item[keyOfObjectHavingTravelData][dataFieldsKey[DURATION_INDEX]][
          startAndEndTimeKey[STARTTIME_INDEX]
        ],
        setErrorMessage
      ),
      endTimestamp: validateTime(
        item[keyOfObjectHavingTravelData][dataFieldsKey[DURATION_INDEX]][
          startAndEndTimeKey[ENDTIME_INDEX]
        ],
        setErrorMessage
      ),
      distance: validateDistance(
        item[keyOfObjectHavingTravelData][dataFieldsKey[DISTANCE_INDEX]],
        setErrorMessage
      ),
      activityType: travelMode,
    });

    return item;
  });
};

export default parseData;
