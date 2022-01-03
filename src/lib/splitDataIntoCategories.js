const splitDataIntoModeOfCategories = (updatedLocationDataWithCarbonCost) => {
  return updatedLocationDataWithCarbonCost.reduce(function (newObj, oldObj) {
    const key = oldObj.activityType;
    if (newObj[key] || (newObj[key] = [])) newObj[key].push(oldObj);
    return newObj;
  }, {});
};
export default splitDataIntoModeOfCategories;
