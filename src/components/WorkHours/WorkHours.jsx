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
import { noWorkingHours } from "../../constants/workingHoursData";
import { workHoursTableColumns } from "../../constants/tableColumnsInfo";

const WorkHours = () => {
  const dispatch = useDispatch();

  const includeAllHoursAndDays = useSelector(selectIncludeAllHoursAndDays);
  const workingTimes = useSelector(selectWorkingHours);

  const [checked, setChecked] = useState(includeAllHoursAndDays);

  const componentForEachCellInTable = {
    body: {
      cell: DateTimeRangePicker,
    },
  };

  const resetDataToDefaultValue = () => {
    dispatch(resetWorkingHours());
    setChecked(false);
  };

  const saveDataAfterUpdatingCellValue = (row) => {
    const newHours = JSON.parse(JSON.stringify(row));
    dispatch(updateWorkingTime(merge(newHours)));
  };

  const cancelAndPrevious = () => {
    dispatch(resetWorkingHours());
    dispatch(setCurrentStep(1));
  };

  const saveAndNext = () => {
    dispatch(setIncludeAllHoursAndDays(checked));
    dispatch(setCurrentStep(3));
  };

  const columnsOfTheTable = workHoursTableColumns.map((column) => ({
    ...column,
    onCell: (record) => ({
      record,
      editable: column.editable,
      dataIndex: column.dataIndex,
      title: column.title,
      type: column.type,
      handleSave: saveDataAfterUpdatingCellValue,
    }),
  }));

  const removeAllHoursAndDateRanges = () => {
    setChecked(!checked);
  };

  return (
    <div className="work-hours-container">
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
      <div className="work-hours-table">
        <Table
          bordered
          size="small"
          components={componentForEachCellInTable}
          pagination={false}
          columns={columnsOfTheTable}
          dataSource={checked ? noWorkingHours : workingTimes}
        />
        <Checkbox checked={checked} onChange={removeAllHoursAndDateRanges}>
          Want to include all the data
        </Checkbox>
      </div>
      <div className="work-hours-actions">
        <Button type="primary" onClick={resetDataToDefaultValue}>
          Reset to default
        </Button>
        <Button type="primary" onClick={cancelAndPrevious}>
          Cancel
        </Button>
        <Button type="primary" onClick={saveAndNext}>
          Save & Next
        </Button>
      </div>
    </div>
  );
};

export default WorkHours;
