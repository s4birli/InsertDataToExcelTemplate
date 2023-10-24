const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

const tempFilePath = "./template/temp.json";

async function updateExcel(req: any, res: any) {
  const workbook = new ExcelJS.Workbook();
  try {
    const tempData = loadJsonData(tempFilePath);
    if (!tempData) {
      console.error("No temp data found");
      return;
    }

    await workbook.xlsx.readFile(tempData.excelFilePath);

    const dataToInsert = loadJsonData(tempData.dataFilePath);

    const worksheet = workbook.getWorksheet(tempData.sheet);

    if (!worksheet) {
      throw Error("Worksheet not found");
    }

    let startIndex = tempData.startIndex as number;
    dataToInsert.forEach((value: any, index: number, array: []) => {
      const convertedValue = Object.values(value);
      worksheet.spliceRows(startIndex, 0, convertedValue);
      startIndex++;
    });

    dataToInsert.forEach((_: any, rowIndex: number) => {
      const actualRowIndex = tempData.startIndex + rowIndex;
      const currentRow = worksheet.getRow(actualRowIndex);
      currentRow.height = tempData.cell.height;
      currentRow.eachCell((cell: any) => {
        cell.font = tempData.cell.font;
        cell.alignment = tempData.cell.alignment;
      });
      if (tempData.cell.extra.length > 0) {
        tempData.cell.extra.forEach((extra: any) => {
          const extraCell = worksheet.getCell(actualRowIndex, extra.index);
          if (extra.valueParse) {
            if (extra.valueParse === "parseInt") {
              extraCell.value = parseInt(extraCell.value, 10);
              extraCell.numFmt = extra.numFmt;
            }
          }
          if (extra.alignment) {
            extra.alignment = extra.alignment;
          }
        });
      }
    });

    await workbook.xlsx.writeFile(tempData.outPutFilePath);
    const absolutePath = path.resolve(tempData.outPutFilePath);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${tempData.desiredFileName}`
    );
    res.sendFile(absolutePath);
  } catch (error) {
    console.log(error);
  } finally {
    await workbook.commit();
  }
}

function loadJsonData(path: string) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(path, "utf8"));
    return jsonData;
  } catch (parseError) {
    console.error(`Error parsing JSON: ${parseError}`);
    return null;
  }
}

export default updateExcel;
