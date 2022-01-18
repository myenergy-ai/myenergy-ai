const convertToCsv = (json) => {
  var fields = Object.keys(json[0]);
  var replacer = (_, value) => {
    return value === null ? "" : value;
  };
  var csv = json.map((row) => {
    if (row.startTimestamp && row.endTimestamp) {
      row.startTimestamp = new Date(
        parseInt(row.startTimestamp)
      ).toLocaleString();
      row.endTimestamp = new Date(parseInt(row.endTimestamp)).toLocaleString();
      return fields
        .map((fieldName) => {
          return JSON.stringify(row[fieldName], replacer);
        })
        .join(",");
    } else {
      try {
        throw new Error(
          "Missing Attributes. Please check the format of the data."
        );
      } catch (error) {
        throw error;
      }
    }
  });
  csv.unshift(fields.join(","));
  csv = csv.join("\r\n");
  return csv;
};

const downloadData = async (carbonCostFinalData, isFormatCSV = true) => {
  try {
    if (Array.isArray(carbonCostFinalData)) {
      if (isFormatCSV) {
        const a = JSON.parse(JSON.stringify(carbonCostFinalData));
        let myData = null;
        try {
          myData = convertToCsv(a);
        } catch (error) {
          throw error;
        }
        const fileName = "carboncost";
        const blob = new Blob([myData], { type: "text/csv" });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(carbonCostFinalData));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "carboncost.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    } else {
      try {
        throw new Error("Invalid Format. Please pass an array.");
      } catch (error) {
        throw error;
      }
    }
  } catch (error) {
    throw error;
  }
};

export default downloadData;
