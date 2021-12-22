import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import "./WorkHours.css";
import {
  EditableCell,
  EditableRow,
} from "../EditableComponents/EditableComponents";
import {
  resetWorkingHours,
  updateWorkingTime,
} from "../../redux/reducers/workingHoursSlice";
import { setCurrentStep } from "../../redux/reducers/appSlice";

const WorkHours = () => {
  const dispatch = useDispatch();
  const workingTimes = useSelector((state) => state.workingHours.workingTimes);

  // components to make row and cell editable
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // reset values to default
  const handleReset = () => {
    dispatch(resetWorkingHours());
  };

  // update working times
  const handleSave = (row) => {
    dispatch(updateWorkingTime(row));
  };

  // on cancel go to previous step
  const handleCancel = () => {
    dispatch(resetWorkingHours());
    dispatch(setCurrentStep(1));
  };

  // on update go to next step
  const handleUpdateWorkHours = () => {
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
      handleSave,
    }),
  }));

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
          dataSource={workingTimes}
        />
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
