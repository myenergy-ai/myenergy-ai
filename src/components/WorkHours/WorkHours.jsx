import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import "./WorkHours.css";
import DateTimeRangePicker from "../DateTimeRangePicker/DateTimeRangePicker";
import {
  resetWorkingHours,
  selectIncludeAllHoursAndDays,
  selectWorkingHours,
  setIncludeAllHoursAndDays,
  updateWorkingTime,
} from "../../redux/reducers/workingHoursSlice";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import { merge } from "../../lib/mergeRangeArrays";
import Checkbox from "antd/lib/checkbox/Checkbox";
import removeAllWorkingHours from "../../lib/removeAllWorkingHours";

const WorkHours = () => {
  const dispatch = useDispatch();
  const workingTimes = useSelector(selectWorkingHours);

  // components to make row and cell editable
  const components = {
    body: {
      cell: DateTimeRangePicker,
    },
  };

  // reset values to default
  const handleReset = () => {
    dispatch(resetWorkingHours());
    setChecked(false);
  };

  // update working times
  const handleSave = (row) => {
    const newHours = JSON.parse(JSON.stringify(row));
    dispatch(updateWorkingTime(merge(newHours)));
  };

  // on cancel go to previous step
  const handleCancel = () => {
    dispatch(resetWorkingHours());
    dispatch(setCurrentStep(1));
  };

  // on update go to next step
  const handleUpdateWorkHours = () => {
    dispatch(setIncludeAllHoursAndDays(checked));
    dispatch(setCurrentStep(3));
  };

  const columnConfig = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      width: "50%",
    },
    {
      title: "Working Times",
      dataIndex: "workingTime",
      key: "workingTimes",
      editable: true,
      required: false,
      type: "date-time",
    },
  ];

  // column config that are being passed to EditableCell component as props
  const columns = columnConfig.map((column) => ({
    ...column,
    onCell: (record) => ({
      record,
      editable: column.editable,
      dataIndex: column.dataIndex,
      title: column.title,
      type: column.type,
      handleSave,
    }),
  }));

  /**
   * Used to tract whether user wants to add filter of days and hours.
   */
  const includeAllHoursAndDays = useSelector(selectIncludeAllHoursAndDays);

  /**
   * Function to handle change of check box.
   */
  const handleRemoveFilter = () => {
    setChecked(!checked);
  };
  /**
   * This is required as checkbox needs a local useState for tracking the value of the state.
   */
  const [checked, setChecked] = useState(includeAllHoursAndDays);

  return (
    <div className="work-hours-container">
      {/* top-div start */}
      <div className="work-hours-top">
        <h2 className="work-hours-heading">Set Work Hours</h2>
        <p className="work-hours-info">
          All travels outside these hours will be excluded
        </p>
        <p className="work-hours-info">
          For maximum flexibility, and to allow the exclusion of lunch and other
          breaks, the times are set in this format:
        </p>
        <p className="work-hours-info time-format">
          <b>
            Morning Start - Morning End ; Afternoon Start - Afternoon End; etc.
          </b>
        </p>
        <p className="work-hours-info">
          Semicolons can be used to separate work periods. All times are in 24h
          format.
        </p>
        <p className="work-hours-info">
          Leave days blank if the whole day should be excluded.
        </p>
        <p className="work-hours-info">
          0000 is the start of the day, 2259 is the end. The system will
          automatically round any remaining seconds downwards to the nearest
          minute.
        </p>
        <p className="work-hours-info">
          You can exclude whole data ranges (for instance for holidays) in the
          final line. Use yyyy/mm/dd format to start and end the included dates.
        </p>
      </div>
      {/* top-div end */}

      {/* table-div start */}
      <div className="work-hours-table">
        <Table
          bordered
          size="small"
          components={components}
          pagination={false}
          columns={columns}
          // Show table data only when user has enabled hours and days filter.
          dataSource={checked ? removeAllWorkingHours : workingTimes}
        />
        <Checkbox checked={checked} onChange={handleRemoveFilter}>
          Want to include all the data
        </Checkbox>
      </div>
      {/* table-div end */}

      {/* actions-div start */}
      <div className="work-hours-actions">
        <Button type="primary" onClick={handleReset}>
          Reset to default
        </Button>
        <Button type="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleUpdateWorkHours}>
          Save & Next
        </Button>
      </div>
      {/* actions-div end */}
    </div>
  );
};

export default WorkHours;
