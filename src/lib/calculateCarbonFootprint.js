/**
 * @description The function returns the travelData passes by updating/adding the carbonCost to it.
 * @param {[Object]} travelData Data taken from the user.
 * @param {[Object]} travelMode The modes of transports that are required with modeName as activityType and carbonCost as the carbon the travel mode emits.
 * @returns travelData after updating the carbonCost field in every object
 */
export const calculateCarbonFootprint = (travelData, travelMode) => {
  return travelData?.map((data) => {
    try {
      if (
        typeof data.distance === "number" &&
        data.distance > 0 &&
        Array.isArray(travelMode)
      ) {
        return {
          ...data,
          carbonCost: data.distance
            ? data.distance *
              travelMode.find((item) => {
                if (item.modeName) {
                  return item.modeName === data.activityType;
                } else {
                  try {
                    throw new Error(
                      "Invalid format. Please provide the data in appropriate format."
                    );
                  } catch (error) {
                    throw error;
                  }
                }
              })?.carbonCost
            : 0,
        };
      } else {
        throw new Error(
          "Invalid format. Please provide the data in appropriate format"
        );
      }
    } catch (error) {
      throw error;
    }
  });
};
