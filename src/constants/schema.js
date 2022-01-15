const latitudeAndLongitudeFormat = {
  supportsDataType: ["string", "number"],
  supportsValueType: [212287569, 21.2287569, "-1109036294", "-11.09036294"],
};

const timestampFormat = {
  supportsDataType: ["string", "number"],
  supportsValueType: [
    "Sat Jan 26 2019 17:54:24 GMT+0530",
    "December 17, 1995 13:24:00",
    "1995-12-17T13:24:00",
    "Number of milliseconds",
    "Unix epoch time",
  ],
};

const distanceFormat = {
  supportsDataType: ["string", "number"],
  supportsValueType: ["Distance in Meters"],
};

const activityFormat = {
  mustBeAmongst: [
    "FLYING",
    "IN_BUS",
    "IN_TRAIN",
    "IN_PASSENGER_VEHICLE",
    "MOTORCYCLING",
  ],
  caseSensitive: true,
};

export const schema = {
  timelineObjects: [
    {
      activitySegment: {
        startLocation: {
          latitudeE7: latitudeAndLongitudeFormat,
          longitudeE7: latitudeAndLongitudeFormat,
        },
        endLocation: {
          latitudeE7: latitudeAndLongitudeFormat,
          longitudeE7: latitudeAndLongitudeFormat,
        },
        duration: {
          startTimestampMs: timestampFormat,
          endTimestampMs: timestampFormat,
        },
        distance: distanceFormat,
        activityType: activityFormat,
      },
    },
  ],
};
