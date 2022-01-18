const convertDataToMapFormat = (updatedLocationDataWithCarbonCost) => {
  if (Array.isArray(updatedLocationDataWithCarbonCost)) {
    return updatedLocationDataWithCarbonCost.reduce(function (newObj, oldObj) {
      if (oldObj.activityType) {
        const key = oldObj.activityType;
        if (newObj[key] || (newObj[key] = [])) newObj[key].push(oldObj);
        return newObj;
      } else {
        try {
          throw new Error(
            "Invalid Format. Please check the format of the data."
          );
        } catch (error) {
          throw error;
        }
      }
    }, {});
  } else {
    try {
      throw new Error("Invalid Format. Please check the format of the data.");
    } catch (error) {
      throw error;
    }
  }
};

export default convertDataToMapFormat;
