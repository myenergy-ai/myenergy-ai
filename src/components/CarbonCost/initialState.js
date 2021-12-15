export const headers = [
  {
    title: "Travel Mode",
    dataIndex: "travelMode",
    key: "travelMode",
    width: "50%",
    editable: true,
  },
  {
    title: "Carbon Cost: kg/person/km",
    dataIndex: "carbonCost",
    key: "carbonCost",
    editable: true,
  },
];

export const initialCarbonCosts = [
  {
    key: 1,
    travelMode: "Plane",
    carbonCost: 0.187,
  },
  {
    key: 2,
    travelMode: "Bus",
    carbonCost: 0.105,
  },
  {
    key: 3,
    travelMode: "Ferry",
    carbonCost: 0.019,
  },
  {
    key: 4,
    travelMode: "Other Passenger Vehicle",
    carbonCost: 0.181,
  },
  {
    key: 5,
    travelMode: "Subway/Underground/Metro",
    carbonCost: 0.041,
  },
  {
    key: 6,
    travelMode: "Train",
    carbonCost: 0.041,
  },
  {
    key: 7,
    travelMode: "Tram",
    carbonCost: 0.041,
  },
  {
    key: 8,
    travelMode: "Car",
    carbonCost: 0.182,
  },
  {
    key: 9,
    travelMode: "Motorcycle",
    carbonCost: 0.103,
  },
];
