export const finalResultCarbonCostTableColumns = [
  {
    title: "",
    dataIndex: "key",
    key: "srno",
    width: 30,
    fixed: "left",
    sorter: {
      compare: (a, b) => a.key - b.key,
      multiple: 1,
    },
  },
  {
    title: "Start Latitude",
    dataIndex: "startLatitude",
    key: "sLat",
    width: 110,
  },
  {
    title: "Start Longitude",
    dataIndex: "startLongitude",
    key: "sLong",
    width: 110,
  },
  {
    title: "End Latitude",
    dataIndex: "endLatitude",
    key: "eLat",
    width: 110,
  },
  {
    title: "End Longitude",
    dataIndex: "endLongitude",
    key: "eLong",
    width: 110,
  },
  {
    title: "Start Time",
    dataIndex: "startTimestamp",
    key: "sTime",
    width: 210,
    render: (text) => (
      <span>{`${new Date(parseInt(text)).toDateString()} ${new Date(
        parseInt(text)
      ).toLocaleTimeString()}`}</span>
    ),
  },
  {
    title: "End Time",
    dataIndex: "endTimestamp",
    key: "eTime",
    width: 210,
    render: (text) => (
      <span>{`${new Date(parseInt(text)).toDateString()} ${new Date(
        parseInt(text)
      ).toLocaleTimeString()}`}</span>
    ),
  },
  {
    title: "Distance",
    dataIndex: "distance",
    key: "dist",
    width: 70,
    render: (text) => <span>{text.toFixed(3)}</span>,
  },
  {
    title: "Activity Type",
    dataIndex: "activityType",
    key: "actType",
    width: 170,
  },
  {
    title: "Carbon Footprint",
    dataIndex: "carbonCost",
    key: "carbonCost",
    width: 100,
    fixed: "right",
    render: (text) => <span>{text.toFixed(3)}</span>,
    sorter: {
      compare: (a, b) => a.carbonCost - b.carbonCost,
      multiple: 1,
    },
  },
];

export const finalResultTravelModeTableColumns = [
  {
    title: "Travel Mode",
    dataIndex: "travelMode",
    key: "travelMode",
    width: "60%",
  },
  {
    title: "Carbon Footpint:kg/person/km",
    dataIndex: "carbonCost",
    key: "carbonCost",
    width: "30%",
  },
];

export const workHoursTableColumns = [
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
    width: "50%",
  },
  {
    title: "Working Times",
    dataIndex: "workingTime",
    key: "workingTimes",
    editable: true,
    required: false,
    type: "date-time",
  },
];

export const carbonCostTableColumns = [
  {
    title: "Travel Mode",
    dataIndex: "travelMode",
    key: "travelMode",
    align: "center",
    editable: true,
    required: true,
    type: "text",
  },
  {
    title: "Carbon Footprint: kg/person/km",
    dataIndex: "carbonCost",
    key: "carbonCost",
    editable: true,
    align: "center",
    required: true,
    type: "number",
  },
  {
    title: "Travel mode provided by Google",
    dataIndex: "modeName",
    key: "modeName",
    align: "center",
    editable: false,
    required: true,
    type: "number",
  },
];
export const mapResultDataFields = [
  { name: "key", type: "int" },
  { name: "startLatitude", type: "float" },
  { name: "startLongitude", type: "float" },
  { name: "endLatitude", type: "float" },
  { name: "endLongitude", type: "float" },
  { name: "startTimestamp", type: "time" },
  { name: "endTimestamp", type: "time" },
  { name: "distance", type: "int" },
  { name: "activityType", type: "string" },
  { name: "carbonCost", type: "int" },
];
