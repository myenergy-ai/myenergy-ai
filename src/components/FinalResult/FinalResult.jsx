import "./FinalResult.css";
import { Table, Modal } from "antd";
import { useSelector } from "react-redux";
import {
  selectCarbonCostData,
  selectLocationData,
  setCarbonCostData,
} from "../../redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import { selectCarbonCost } from "../../redux/reducers/carbonCostSlice";
import { selectWorkingHours } from "../../redux/reducers/workingHoursSlice";
import { useEffect, useState } from "react";

const FinalResult = () => {
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(true);

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
      render: (text) => <p>{text.toFixed(3)}</p>,
    },
    {
      title: "Carbon Cost",
      dataIndex: "carbonCost",
      key: "carbonCost",
      width: 58,
      fixed: "right",
      render: (text) => <p>{text.toFixed(3)}</p>,
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
   * Carbon cost of all the transport modes.
   */
  const carbonCostData = useSelector(selectCarbonCost);

  /**
   * Working hours set by the users.
   */
  const workingHours = useSelector(selectWorkingHours);

  /**
   * Getting the location data from redux store
   */
  let locationData = useSelector(selectLocationData);

  /**
   * Getting the location data from redux store
   */
  let carbonCostFinalData = useSelector(selectCarbonCostData);

  /**
   * Calculating the total carbon cost
   */
  const totalCost = carbonCostFinalData
    ?.reduce((prev, curr) => prev + curr.carbonCost, 0)
    .toFixed(3);

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
    const a = JSON.parse(JSON.stringify(carbonCostFinalData));
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

  const moveToMap = () => {
    dispatch(setCurrentStep(4));
  };

  useEffect(() => {
    /**
     * For helping out with getting the carbon cost easily.
     */
    const modeOfTransportToKey = {
      IN_PASSENGER_VEHICLE: [4, 8],
      MOTORCYCLING: [9],
      IN_TRAIN: [5, 6, 7],
      IN_BUS: [2],
      FLYING: [1],
      WALKING: [0],
    };

    /**
     * Filtering out the days in which the user has a holiday.
     */
    const filteredDays = workingHours.filter(
      (workingHour) => workingHour.workingTime !== ""
    );

    /**
     * Converting the days as per javascript date object.
     */
    const days = filteredDays.map((day) => day.key % 7);

    /**
     * Getting out hours of work for working days.
     */
    let hours = filteredDays.map((day) => ({
      key: day.key % 7,
      hour: day.workingTime.split(";").map((times) =>
        times
          .trim()
          .split("-")
          .map((time) => parseInt(time))
      ),
    }));

    /**
     * Calculating the holidays or the days user want to exclude.
     */
    const rangeToExclude = workingHours[7].workingTime.split(";").map((range) =>
      range
        .trim()
        .split("-")
        .map((date) => new Date(date).getTime())
    );

    /**
     * Updating the user data and filtering out entries which are out of work hours or user want ot exclude.
     */
    let a = locationData.filter((data) => {
      /**
       * Entry start day for checking whether it's a holiday or not
       */
      const startDay = new Date(parseInt(data.startTimestamp)).getDay();

      /**
       * Entry end day for checking whether it's a holiday or not
       */
      const endDay = new Date(parseInt(data.endTimestamp)).getDay();

      /**
       * Entry travel start time for checking whether it is in the working hours range.
       */
      const startTime =
        new Date(parseInt(data.startTimestamp)).getHours() * 100 +
        new Date(parseInt(data.startTimestamp)).getMinutes();

      /**
       * Finding the working hours of the day when the user starts travelling.
       */
      const startDayWorkingHours = hours.find((hour) => hour.key === startDay);

      /**
       * Entry travel end time for checking whether it is in the working hours range.
       */
      const endTime =
        new Date(parseInt(data.endTimestamp)).getHours() * 100 +
        new Date(parseInt(data.endTimestamp)).getMinutes();

      /**
       * Finding the working hours of the day when the user ends travelling.
       */
      const endDayWorkingHours = hours.find((hour) => hour.key === endDay);

      /**
       * Excluding the date range to be excluded.
       */
      let toExclude = false;
      rangeToExclude.forEach((range) => {
        if (
          parseInt(data.startTimestamp) >= range[0] &&
          parseInt(data.endTimestamp) <= range[1] + 86400000
        ) {
          toExclude = true;
          return;
        }
      });

      /**
       * Checking whether user starts it's travel in working hours.
       */
      let isStartInRange = false;
      startDayWorkingHours?.hour.forEach((hour) => {
        if (hour[0] < startTime && hour[1] > startTime) {
          isStartInRange = true;
          return;
        }
      });

      /**
       * Checking whether user ends it's travel in working hours.
       */
      let isEndInRange = false;
      endDayWorkingHours?.hour.forEach((hour) => {
        if (hour[0] < endTime && hour[1] > endTime) {
          isEndInRange = true;
          return;
        }
      });

      return (
        /**
         * If in working days
         */
        days.includes(startDay) &&
        days.includes(endDay) &&
        /**
         * Either starts or end in working hours.
         */
        (isStartInRange || isEndInRange) &&
        /**
         * Not in to be excluded range.
         */
        !toExclude
      );
    });

    /**
     * Updating the cost of the carbon emitted by the user while travelling;
     */
    a = a.map((data) => {
      /**
       * Calculate the max user has entered amoungst all the related tranport.
       */
      let max = 0;
      modeOfTransportToKey[data.activityType].forEach((key) => {
        if (key === 0) return;
        max = Math.max(
          max,
          carbonCostData.find((item) => item.key === key)?.carbonCost
        );
      });

      /**
       * Set the data as it was just update the carbonCost.
       */
      return {
        ...data,
        carbonCost: (data.distance / 1000) * max,
      };
    });
    /**
     * Checking if the previous data is same as the current one if not dispatching it.
     */
    dispatch(setCarbonCostData(a));
    setProcessing(false);
  }, [workingHours, locationData, dispatch, carbonCostData]);

  return (
    <>
      <Modal
        title="Preparing result"
        centered
        visible={processing}
        footer={null}
      ></Modal>
      {!processing && (
        <div className="final-result">
          <div className="final-result-container">
            <div className="final-result-header flex flex-column align-center">
              <h2>Your Carbon Cost</h2>
              <p>
                Work hours set to{" "}
                {workingHours.map((days) => (
                  <span key={days.key}>
                    {days.day + " " + days.workingTime + ", "}
                  </span>
                ))}
                . Click{" "}
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
                dataSource={carbonCostFinalData}
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
                <button className="ant-btn ant-btn-primary" onClick={moveToMap}>
                  Map Results
                </button>
                <button
                  className="ant-btn ant-btn-primary"
                  onClick={downloadFile}
                >
                  Just download results as CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalResult;
