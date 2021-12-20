import "./FinalResult.css";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { selectLocationData } from "../../redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../redux/reducers/appSlice";

const FinalResult = () => {
  const dispatch = useDispatch();

  /**
   * These are the result table columns heading
   */
  const locationColumns = [
    {
      title: "",
      dataIndex: "key",
      key: "srno",
      width: 30,
      fixed: "left",
    },
    {
      title: "Start Latitude",
      dataIndex: "startLatitude",
      key: "sLat",
      width: 80,
    },
    {
      title: "Start Longitude",
      dataIndex: "startLongitude",
      key: "sLong",
      width: 80,
    },
    {
      title: "End Latitude",
      dataIndex: "endLatitude",
      key: "eLat",
      width: 80,
    },
    {
      title: "End Longitude",
      dataIndex: "endLongitude",
      key: "eLong",
      width: 80,
    },
    {
      title: "Start Time",
      dataIndex: "startTimestamp",
      key: "sTime",
      width: 120,
      render: (text) => <p>{new Date(parseInt(text)).toLocaleString()}</p>,
    },
    {
      title: "End Time",
      dataIndex: "endTimestamp",
      key: "eTime",
      width: 120,
      render: (text) => <p>{new Date(parseInt(text)).toLocaleString()}</p>,
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "dist",
      width: 60,
    },
    {
      title: "Activity Type",
      dataIndex: "activityType",
      key: "actType",
      width: 120,
    },
    {
      title: "Activity Confidence",
      dataIndex: "activityConfidence",
      key: "actConf",
      width: 100,
    },
    {
      title: "Activity Probability",
      dataIndex: "activityProbability",
      key: "actProb",
      width: 100,
    },
    {
      title: "Carbon Cost",
      dataIndex: "carbonCost",
      key: "carbonCost",
      width: 58,
      fixed: "right",
    },
  ];

  /**
   * These are carbon cost table columns heading
   */
  const costPerModeColumns = [
    {
      title: "Travel Mode",
      dataIndex: "travelMode",
      key: "travelMode",
      width: "60%",
    },
    {
      title: "Carbon Cost:kg/person/km",
      dataIndex: "carbonCost",
      key: "carbonCost",
      width: "30%",
    },
  ];

  /**
   * Just dummy data remove it once the carbon cost is setted up and uncomment the below line
   */
  const carbonCostData = [
    {
      key: 1,
      travelMode: "Plane",
      carbonCost: 0.187,
    },
    {
      key: 2,
      travelMode: "Bus",
      carbonCost: 0.105,
    },
    {
      key: 3,
      travelMode: "Ferry",
      carbonCost: 0.019,
    },
    {
      key: 4,
      travelMode: "Other Passenger Vehicle",
      carbonCost: 0.181,
    },
    {
      key: 5,
      travelMode: "Subway/Underground/Metro",
      carbonCost: 0.041,
    },
    {
      key: 6,
      travelMode: "Train",
      carbonCost: 0.041,
    },
    {
      key: 7,
      travelMode: "Tram",
      carbonCost: 0.041,
    },
    {
      key: 8,
      travelMode: "Car",
      carbonCost: 0.182,
    },
    {
      key: 9,
      travelMode: "Motorcycle",
      carbonCost: 0.103,
    },
  ];
  // const carbonCostData = useSelector(selectCarbonCost);

  /**
   * Getting the location data from redux store
   */
  const locationData = useSelector(selectLocationData);

  /**
   * Calculating the total carbon cost
   */
  const totalCost = locationData.reduce(
    (prev, curr) => prev + curr.carbonCost,
    0
  );

  /**
   * Function to move to previous step
   */
  const moveToPreviousStep = () => {
    dispatch(setCurrentStep(2));
  };

  /**
   * Function to convert JSON object to CSV format for downloading
   */
  const convertToCsv = (json) => {
    var fields = Object.keys(json[0]);
    var replacer = (_, value) => {
      return value === null ? "" : value;
    };
    var csv = json.map((row) => {
      /**
       * Chnaging the start and end time
       */
      row.startTimestamp = new Date(
        parseInt(row.startTimestamp)
      ).toLocaleString();
      row.endTimestamp = new Date(parseInt(row.endTimestamp)).toLocaleString();
      return fields
        .map((fieldName) => {
          return JSON.stringify(row[fieldName], replacer);
        })
        .join(",");
    });
    /**
     * Adding the heading to the csv data.
     */
    csv.unshift(fields.join(","));
    csv = csv.join("\r\n");
    return csv;
  };

  /**
   * Function to download csv file
   */
  const downloadFile = async () => {
    /**
     * Creating a copy of the data as we need to update the start and end time.
     */
    const a = JSON.parse(JSON.stringify(locationData));
    const myData = convertToCsv(a);
    const fileName = "carboncost";
    /**
     * Generating the file to download
     */
    const blob = new Blob([myData], { type: "text/csv" });
    const href = await URL.createObjectURL(blob);
    /**
     * Creating an element, attatch the file, click it programmically and remove it.
     */
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="final-result">
      <div className="final-result-container">
        <div className="final-result-header flex flex-column align-center">
          <h2>Your Carbon Cost</h2>
          <p>
            Work hours set to Monday - Friday 0700h - 2000h. Click{" "}
            <button
              className="ant-btn ant-btn-primary"
              onClick={moveToPreviousStep}
            >
              Set work hours
            </button>{" "}
            to change
          </p>
        </div>
        <div className="final-result-carbon-cost">
          <Table
            columns={locationColumns}
            dataSource={locationData}
            bordered
            size="middle"
            scroll={{ x: window.innerWidth * 0.6, y: 200 }}
          />
          <h3>
            Total Carbon Cost for this time period: <span>{totalCost}</span>
          </h3>
        </div>
        <div className="final-result-total-carbon">
          <h2>This set of results uses the Carbon Costs</h2>
          <Table
            columns={costPerModeColumns}
            dataSource={carbonCostData}
            bordered
            size="middle"
            pagination={{ position: ["none", "none"] }}
          />
          <div className="final-result-total-carbon-buttons flex justify-end">
            <button className="ant-btn ant-btn-primary">Map Results</button>
            <button className="ant-btn ant-btn-primary" onClick={downloadFile}>
              Just download results as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResult;
