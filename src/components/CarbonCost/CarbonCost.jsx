import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import "./CarbonCost.css";
import {
  EditableCell,
  EditableRow,
} from "../EditableComponents/EditableComponents";
import {
  updateTravelMode,
  resetCarbonCosts,
} from "../../redux/reducers/carbonCostSlice";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import { setLocationData } from "../../redux/reducers/dataSlice";

const CarbonCost = () => {
  const dispatch = useDispatch();
  const carbonCosts = useSelector((state) => state.carbonCost.carbonCosts);

  // components to make row and cell editable
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Update cell value
  const handleSave = (row) => {
    dispatch(updateTravelMode(row));
  };

  // Reset values to default
  const handleReset = () => {
    dispatch(resetCarbonCosts());
    const element = document.getElementsByClassName("ant-table-row");
    element[0].scrollIntoView({
      behavior: "smooth",
    });
  };

  // default column config
  const columnConfig = [
    {
      title: "Travel Mode",
      dataIndex: "travelMode",
      key: "travelMode",
      align: "center",
      editable: true,
      required: true,
      type: "text",
    },
    {
      title: "Carbon Cost: kg/person/km",
      dataIndex: "carbonCost",
      key: "carbonCost",
      editable: true,
      align: "center",
      required: true,
      type: "number",
    },
    {
      title: "Travel mode provided by Google",
      dataIndex: "modeName",
      key: "modeName",
      align: "center",
      editable: false,
      required: true,
      type: "number",
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
      handleSave: handleSave,
    }),
  }));

  // Remove the data of the client and reset to initial step.
  const onCancel = () => {
    dispatch(resetCarbonCosts());
    dispatch(setLocationData(null));
    dispatch(setCurrentStep(0));
  };

  // Move to the next step
  const onUpdate = () => {
    dispatch(setCurrentStep(2));
  };

  return (
    <div className="carbon-cost-container">
      {/* top-div start */}
      <div className="carbon-cost-top">
        <h2 className="carbon-cost-heading">Adjust Carbon Cost</h2>
        <p className="carbon-cost-info">
          Carbon cost is in kg per person per km travelled.
        </p>
        <p className="carbon-cost-info">
          Please make sure you know what you are doing before you adjust these
          figures!
        </p>
      </div>
      {/* top-div end */}

      {/* table-div start */}
      <div className="carbon-cost-table">
        <Table
          size="small"
          bordered
          components={components}
          columns={columns}
          dataSource={carbonCosts}
          pagination={false}
          scroll={{ y: window.innerHeight * 0.5 }}
        />
      </div>
      {/* table-div end */}

      {/* actions-div start */}
      <div className="carbon-cost-actions">
        <Button type="primary" onClick={handleReset}>
          Reset to default
        </Button>
        <Button type="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={onUpdate}>
          Save & Next
        </Button>
      </div>
      {/* actions-div end */}
    </div>
  );
};

export default CarbonCost;
