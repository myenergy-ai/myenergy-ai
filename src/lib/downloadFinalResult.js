const convertToCsv = (json) => {
  var fields = Object.keys(json[0]);
  var replacer = (_, value) => {
    return value === null ? "" : value;
  };
  var csv = json.map((row) => {
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
  csv.unshift(fields.join(","));
  csv = csv.join("\r\n");
  return csv;
};

const downloadFile = async (carbonCostFinalData) => {
  const a = JSON.parse(JSON.stringify(carbonCostFinalData));
  const myData = convertToCsv(a);
  const fileName = "carboncost";
  const blob = new Blob([myData], { type: "text/csv" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFile;
