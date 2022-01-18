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
