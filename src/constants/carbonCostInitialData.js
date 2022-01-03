/**
 * Initial data used to filter out Modes of transport given by the google take away.
 */

const modeOfTransport = [
  {
    key: 1,
    travelMode: "Plane",
    carbonCost: 0.187,
    modeName: "FLYING",
  },
  {
    key: 2,
    travelMode: "Bus",
    carbonCost: 0.105,
    modeName: "IN_BUS",
  },
  {
    key: 3,
    travelMode: "Train",
    carbonCost: 0.041,
    modeName: "IN_TRAIN",
  },
  {
    key: 4,
    travelMode: "Car",
    carbonCost: 0.181,
    modeName: "IN_PASSENGER_VEHICLE",
  },
  {
    key: 5,
    travelMode: "Motorcycle",
    carbonCost: 0.103,
    modeName: "MOTORCYCLING",
  },
  {
    key: 5,
    travelMode: "Walk",
    carbonCost: 0,
    modeName: "WALKING",
  },
  {
    key: 5,
    travelMode: "Unknown",
    carbonCost: 0,
    modeName: "UNKNOWN_ACTIVITY_TYPE",
  },
];

export default modeOfTransport;
