const xlsx = require("xlsx");

const path = require("path");
const exporttoexcel = (data, worksheetcolumnNames, worksheetName, filepath) => {
  const workBook = xlsx.utils.book_new();
  const worksheetData = [worksheetcolumnNames, ...data];
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workBook, worksheet, worksheetName);
  xlsx.writeFile(workBook, path.resolve(filepath));
};
module.exports = exporttoexcel;
