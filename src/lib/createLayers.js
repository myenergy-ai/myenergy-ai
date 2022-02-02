/**
 * @description The function returns layers of data that is to be displayed on the map.
 * @param {[Object]} data The data that is to be plotted on the map
 * @param {[Object]} carbonCost The modes of transports that are required with modeName as activityType and travelMode as the name to display
 * @param {Object} options options
 * @returns {[Object]}
 */
export const createLayersBasedOnModeOfTransport = (
  data,
  carbonCost,
  options
) => {
  return Object.keys(data).map((mode) => ({
    id: mode,
    type: "arc",
    config: {
      dataId: mode,
      label: carbonCost.find(
        (modeOfTransport) => modeOfTransport.modeName === mode
      ).travelMode,
      color: options?.color || [0, 50, 50],
      columns: {
        lat0: "startLatitude",
        lng0: "startLongitude",
        lat1: "endLatitude",
        lng1: "endLongitude",
      },
      isVisible: true,
      hidden: false,
      visConfig: {
        thickness: options?.thickness || 2,
        opacity: options?.thickness || 0.8,
        colorRange: options?.colorRange || {
          name: "ColorBrewer OrRd-8",
          type: "sequential",
          category: "ColorBrewer",
          colors: [
            "#fff7ec",
            "#fee8c8",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#990000",
          ],
        },
      },
    },
    visualChannels: {
      colorField: options?.colorField || {
        name: "carbonCost",
        type: "integer",
      },
    },
  }));
};

/**
 * @description The function converts the given data to the format which map accepts.
 * @param {Object} data key as activityMode and value and [Object] Object as travelData
 * @param {[Object]} carbonCostData The Object contains fields as the keys of the travelData and rows as the actual travel data.
 * @param {[Object]} carbonCost Object has modeName as activityType and travelMode and the name they want to display.
 * @returns {[Object]}
 */
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
