import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import "./CarbonCost.css";
import {
  EditableCell,
  EditableRow,
} from "./EditableComponents/EditableComponents";
import {
  updateTravelMode,
  addNewTravelMode,
  resetCarbonCosts,
} from "../../redux/reducers/carbonCostSlice";

const CarbonCost = (props) => {
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
  const handleUpdate = (row) => {
    dispatch(updateTravelMode(row));
  };

  // Add new travel mode
  const handleAddNewTravelMode = () => {
    dispatch(addNewTravelMode());
  };

  // Reset values to default
  const handleReset = () => {
    dispatch(resetCarbonCosts());
  };

  // default column config
  const columnConfig = [
    {
      title: "Travel Mode",
      dataIndex: "travelMode",
      key: "travelMode",
      width: "50%",
      editable: true,
    },
    {
      title: "Carbon Cost: kg/person/km",
      dataIndex: "carbonCost",
      key: "carbonCost",
      align: "center",
      editable: true,
    },
  ];

  // column config that are being passed to EditableCell component
  const columns = columnConfig.map((column) => ({
    ...column,
    onCell: (record) => ({
      record,
      editable: column.editable,
      dataIndex: column.dataIndex,
      title: column.title,
      handleSave: handleUpdate,
    }),
  }));

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
        />
      </div>
      {/* table-div end */}

      {/* actions-div start */}
      <div className="carbon-cost-actions">
        <Button type="primary" onClick={handleAddNewTravelMode}>
          Add new travel mode
        </Button>
        <Button type="primary" onClick={handleReset}>
          Reset to default
        </Button>
        <Button type="primary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={props.onUpdate}>
          Update costs
        </Button>
      </div>
      {/* actions-div end */}
    </div>
  );
};

export default CarbonCost;
