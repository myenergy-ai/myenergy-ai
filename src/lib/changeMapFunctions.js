import store from "../redux/store";
import { resetMapConfig } from "kepler.gl/dist/actions/actions";
import {
  addFilter,
  addLayer,
  removeDataset,
  removeFilter,
  removeLayer,
  setFilter,
  showDatasetTable,
  updateVisData,
} from "kepler.gl/dist/actions/vis-state-actions";
import {
  addCustomMapStyle,
  mapConfigChange,
  mapStyleChange,
} from "kepler.gl/dist/actions/map-style-actions";
import { toggleSidePanel } from "kepler.gl/dist/actions/ui-state-actions";
import { togglePerspective } from "kepler.gl/dist/actions/map-state-actions";

/**
 * @description The function helps in removing the datasets from the map.
 * @param {String} dataId ID of the data set. It is the by default the activityType given in the data set
 */
export const removeDataFromMap = (dataId) => {
  if (!dataId) return;
  store.dispatch(removeDataset(dataId));
};

/**
 * @description The function adds a new layer to the map.
 * @param {Object} config The config containing data, columns, style and other required config fields.
 */
export const addLayerToMap = (config) => {
  if (!config) return;
  store.dispatch(addLayer(config));
};

/**
 * @description This function removes the layer whose index is passed.
 * @param {Number} index Index of the layer to remove
 */
export const removeLayerFromMap = (index) => {
  if (!dataId) return;
  store.dispatch(removeLayer(index));
};

/**
 * @description The function adds filters to the data set.
 * @param {String} dataId The id of the data set.It is the by default the activityType given in the data set
 */
export const addFilterToMap = (dataId) => {
  if (!dataId) return;
  store.dispatch(addFilter(dataId));
};

/**
 * @description The function removes the filter of the given index.
 * @param {Number} index Index of the filter to remove.
 */
export const removeFilterFromMap = (index) => {
  if (!dataId) return;
  store.dispatch(removeFilter(index));
};

/**
 * @description The function updates the filter.
 * @param {Number} index Index of the filter to be updated
 * @param {String} props prop of filter, eg. "dataId", "name", "value"
 * @param {String} value value of the updated field
 * @param {Number} valueIndex dataId index
 */
export const updateFilter = (index, props, value, valueIndex) => {
  if (!index || !props || !value || !valueIndex) return;
  store.dispatch(setFilter(index, props, value, valueIndex));
};

/**
 * @description the function pops up the table with the data from the dataset with dataId
 * @param {String} dataId The id of the dataset. It is the by default the activityType given in the data set
 */
export const showDataSet = (dataId) => {
  if (!dataId) return;
  store.dispatch(showDatasetTable(dataId));
};

/**
 * @description The function updates the map
 * @param {[Object]} datasets The dataset to show
 * @param {Object} options options to set map. By default options.cnterMap=true and options.readOnly=true
 * @param {Object} config config to configure the map visualisation
 */
export const updateVisualData = (datasets, options, config) => {
  if (!datasets) return;
  store.dispatch(updateVisData(datasets, options, config));
};

/**
 * @description This function updates the map style.
 * @param {Object} mapConfig new config `{visibleLayerGroups: {label: false, road: true, background: true}}`}
 */
export const updateMapConfig = (mapConfig) => {
  if (!config) return;
  store.dispatch(mapConfigChange(mapConfig));
};

/**
 * @description This function changes the map style.
 * @param {Object} styleType style to update the style of the map.
 */
export const changeMapSyle = (styleType) => {
  if (!styleType) return;
  store.dispatch(mapStyleChange(styleType));
};

/**
 * @description This function adds a new custom map style.
 * @param {Object} inputStyle
 * inputStyle.url - style url e.g. `'mapbox://styles//xxxxxyyyyzzz'`
 * inputStyle.id - style id e.g. `'custom_style_1'`
 * inputStyle.style - actual mapbox style json
 * inputStyle.label - style name
 * inputStyle.accessToken - mapbox access token
 * inputStyle.icon - icon image data url
 * @param {Object} mapStyle style for the map.
 */
export const addNewMapStyle = (inputStyle, mapStyle) => {
  if (!inputStyle) return;
  store.dispatch(addCustomMapStyle(inputStyle, mapStyle));
};

/**
 * @description The function changes the visibility of the side panel.
 * @param {String} id one of `layer`, `filter`, `interaction`, `map`
 */
export const changeVisisbiliyOfSidePanel = (id) => {
  if (!id) return;
  store.dispatch(toggleSidePanel(id));
};

/**
 * @description the function resets the config of the map to the passed one.
 * @param {Object} config The config object
 * @param {Object} options
 * {boolean} options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * {boolean} options.readOnly `default: false` if `readOnly` is set to `true`
 * {boolean} options.keepExistingConfig whether to keep exiting layer filter and interaction config
 * {boolean} options.autoCreateLayers whether to automatically create layers based on dataset }
 */
export const resetMapConfiguration = (config, options) => {
  if (!config) return;
  store.dispatch(resetMapConfig(config, options));
};

/**
 * @description The function toggles to 3D mode.
 */
export const toggle3DMode = () => {
  store.dispatch(togglePerspective());
};
