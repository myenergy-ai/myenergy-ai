import { addDataToMap } from "kepler.gl/dist/actions/actions";
import { mapResultDataFields } from "../constants/tableColumnsInfo";
import store from "../redux/store";
import {
  createDataSetBasedOnModeOfTransport,
  createLayersBasedOnModeOfTransport,
} from "./createLayers";
import { validateLatAndLan } from "./validateData";

/**
 * @description The function takes the obejct with key and activityMode and returns the obejct with same key and value as [String].
 * @param {Object} data Data to be mapped on the map
 * @returns Object
 */
const createToolTips = (data) => {
  const toolTipArray = {};
  Object.keys(data).map((mode) => {
    toolTipArray[mode] = ["distance", "activityType", "carbonCost"];
    return mode;
  });
  return toolTipArray;
};

/**
 * @description The function checks whether the input data is in correct format or not.
 * @param {Object} data The data to be plotted to map
 * @returns Boolean
 */
const validateInputData = (data) => {
  if (!(typeof data === "object")) {
    return false;
  }
  let isValid = true;
  Object.keys(data).forEach((key) => {
    if (!Array.isArray(data[key])) {
      isValid = false;
    }
    data[key].forEach((val) => {
      if (
        !val.startLatitude ||
        !val.startLongitude ||
        !val.endLatitude ||
        !val.endLongitude ||
        !val.carbonCost ||
        !validateLatAndLan(val.startLatitude, true) ||
        !validateLatAndLan(val.startLongitude, false) ||
        !validateLatAndLan(val.endLatitude, true) ||
        !validateLatAndLan(val.endLongitude, true) ||
        !(typeof val.carbonCost === "number")
      ) {
        isValid = false;
      }
    });
  });
  return isValid;
};

/**
 * @description The function checks whether the carbon Cost data has required fields and has correct format.
 * @param {[Object]} data travelMode data
 * @returns Boolean
 */
const validateCarbonCost = (data) => {
  if (!Array.isArray(data)) {
    return false;
  }
  let isValid = true;
  data.forEach((value) => {
    if (typeof value.modeName !== "string") {
      isValid = false;
    }
  });
  return isValid;
};

/**
 * @description The function plots the data to the map
 * @param {Object} data Object with key as activityType and value as [Object] Object with travel data
 * @param {[Obejct]} carbonCost Object with modeName, carbonCost and travelMode
 * @param {Obejct} options Optional example 
 * const options = {
    tooltip: {
      "DATA_ID": ["fields_in_the_data_set",..],
    },
    filters: [
      {
        "dataId": ["data_set_name",..],
        "id": string,
        "name": ["name",..],
        "type": "range",
        "value": [min, max],
      }
    ],
    mapState: {
      "latitude": "number",
      "longitude": "number",
      "zoom": number,
    },
    mapStyle: {
      "styleType": "dark",
      "visibleLayerGroups": {
        "label": boolean,
        "road": boolean,
        "border": boolean,
        "building": boolean,
        "water": boolean,
        "land": boolean,
        "3d building": boolean
      },
      "threeDBuildingColor": [
        number,..
      ],
    },
    color: [30, 150, 190],
    thickness: number,
    colorRange: {
      "name": "Uber Viz Diverging 2.5",
      "type": "DIV",
      "category": "Uber",
      "colors": [
        "#C22E00",
        "#D45F39",
        "#E68F71",
        "#F8C0AA",
        "#BAE1E2",
        "#7CC7CB",
        "#3EADB3",
        "#00939C",
      ].reverse(),
    },
    colorField: {
      "name": "data_set_field",
      "type": "field_data_type",
    }
  };
 */
const plotDataToMap = (data, carbonCost, options = null) => {
  if (!validateInputData(data) || !validateCarbonCost(carbonCost)) {
    try {
      throw new Error(
        "Invalid Format. Please provide the data in appropriate format."
      );
    } catch (error) {
      throw error;
    }
  }
  const carbonCostData = Object.keys(data).map((mode) => ({
    fields: mapResultDataFields,
    rows: data[mode].map((row) => Object.values(row)),
  }));

  store.dispatch(
    addDataToMap({
      datasets: createDataSetBasedOnModeOfTransport(
        data,
        carbonCostData,
        carbonCost
      ),
      option: {
        centerMap: true,
      },
      config: {
        version: "v1",
        config: {
          visState: {
            filters: options?.filters || [],
            layers: createLayersBasedOnModeOfTransport(
              data,
              carbonCost,
              options
            ),
            interactionConfig: {
              tooltip: {
                enabled: true,
                fieldsToShow: options?.tooltip || createToolTips(data),
              },
            },
          },
          mapState: options?.mapState || {},
          mapStyle: options?.mapStyle || { styleType: "dark" },
        },
      },
    })
  );
};

export default plotDataToMap;
