export const createLayersBasedOnModeOfTransport = (data, carbonCost) => {
  return Object.keys(data).map((mode) => ({
    id: mode,
    type: "arc",
    config: {
      dataId: mode,
      label: carbonCost.find(
        (modeOfTransport) => modeOfTransport.modeName === mode
      ).travelMode,
      columns: {
        lat0: "startLatitude",
        lng0: "startLongitude",
        lat1: "endLatitude",
        lng1: "endLongitude",
      },
      isVisible: true,
      hidden: false,
    },
    visualChannels: {
      colorField: {
        name: "carbonCost",
        type: "integer",
      },
    },
  }));
};

export const createDataSetBasedOnModeOfTransport = (
  data,
  carbonCostData,
  carbonCost
) => {
  return Object.keys(data).map((mode, index) => ({
    info: {
      label: carbonCost.find(
        (modeOfTransport) => modeOfTransport.modeName === mode
      ).travelMode,
      id: mode,
    },
    data: carbonCostData[index],
  }));
};
