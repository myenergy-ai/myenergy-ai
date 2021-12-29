import KeplerGl from "kepler.gl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";
import { selectDataToMap, setDataToMap } from "../../redux/reducers/dataSlice";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import "./MapResult.css";
import { Button } from "antd";
import { selectCarbonCost } from "../../redux/reducers/carbonCostSlice";

const MapResult = () => {
  /**
   * Data for showing on the map.
   */
  const data = useSelector(selectDataToMap);

  /**
   * used to get the name of the mode of transport user has entered.
   */
  const carbonCost = useSelector(selectCarbonCost);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      /**
       * Data format for the kepler.gl
       */
      const carbonCostData = Object.keys(data).map((mode) => ({
        fields: [
          { name: "key", type: "int" },
          { name: "startLatitude", type: "float" },
          { name: "startLongitude", type: "float" },
          { name: "endLatitude", type: "float" },
          { name: "endLongitude", type: "float" },
          { name: "startTimestamp", type: "time" },
          { name: "endTimestamp", type: "time" },
          { name: "distance", type: "int" },
          { name: "activityType", type: "string" },
          { name: "activityConfidence", type: "string" },
          { name: "activityProbability", type: "float" },
          { name: "carbonCost", type: "int" },
        ],
        rows: data[mode].map((row) => Object.values(row)),
      }));

      /**
       * Adding different layers to the map as per the mode of transports.
       */
      const layers = Object.keys(data).map((mode) => ({
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

      const config = {
        version: "v1",
        config: {
          visState: {
            layers: layers,
          },
        },
      };

      /**
       * Sorting the data as per the mode of transport.
       */
      const dataSet = Object.keys(data).map((mode, index) => ({
        info: {
          label: carbonCost.find(
            (modeOfTransport) => modeOfTransport.modeName === mode
          ).travelMode,
          id: mode,
        },
        data: carbonCostData[index],
      }));
      /**
       * Adding data to kepler.gl map.
       */
      dispatch(
        addDataToMap({
          datasets: dataSet,
          option: {
            centerMap: true,
          },
          config: config,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setDataToMap(null));
    }
  }, [dispatch, data, carbonCost]);

  return (
    <div className="map-result">
      <Button
        ghost
        className="map-result-back-button"
        onClick={() => {
          dispatch(setDataToMap(null));
          dispatch(setCurrentStep(3));
        }}
      >
        Go Back
      </Button>
      <KeplerGl
        id="carbonCost"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
        width={window.innerWidth}
        height={window.innerHeight * 0.92}
      />
    </div>
  );
};

export default MapResult;
