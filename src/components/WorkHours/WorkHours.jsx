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
import { setLocationData } from "../../redux/reducers/dataSlice";
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
    dispatch(setLocationData(null));
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
          Work hours is used to set the hours for which you want to include the
          travel data. For each day of the week you can customize the hours. You
          can add a new and update or remove the existing hours. If you wish to
          exclude the whole day remove all the ranges from that day. For
          removing a range of dates from your travel data update the Date ranges
          to exclude by setting the start and end dates. To include all the
          travel data check the box at bottom which says Want to include all the
          data. <br />
          Note: The dates or hours range would be merged if you select
          overlapping ranges.
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
