import {
  excelDateToJSDate,
  formatDate,
  processData,
} from "../utils/conversions";
import { Row } from "../types/excel";
import { insertDataDetails } from "../utils/mongo.utils";
import { getData } from "./dataController";
import { ObjectId } from "mongodb";

const XLSX = require("xlsx");

async function fileController(req: any, res: any) {
  try {
    if (!req.files || !req.files.file_uploads) {
      return res.status(400).send("No files were uploaded.");
    }
    const uploadedFile = req.files.file_uploads;
    const fileName = uploadedFile.name;
    const workbook = XLSX.read(uploadedFile.data, { type: "buffer" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    let jsonData: Row[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    const headerMapping: { [key: string]: string } = {
      Date: "date",
      "Hole depth (m)": "hole_depth",
      "Block Position (m)": "block_position",
      "ROP Instant (m/hr)": "rop_instant",
      "Bit Depth (m)": "bit_depth",
      "Hook Load (tn)": "hook_load",
      "Weight on bit (tn)": "weight_on_bit",
      "SPP (atm)": "spp",
      "Flow rate In (lps)": "flow_rate_in",
      "Flow rate Out (lps)": "flow_rate_out",
      "SPM 1": "spm_1",
      "SPM 2": "spm_2",
      "Rotor RPM": "rotor_rpm",
      "Rotor table torque (kNm)": "rotor_table_torque",
      "SPM 3": "spm_3",
      "SPM 4": "spm_4",
      "ROP Avg (m/hr)": "rop_avg",
      "Density Mud In (sg)": "density_mud_in",
      "Density Mud Out (sg)": "density_mud_out",
    };

    jsonData = jsonData.map((row) =>
      Object.keys(row).reduce(
        (acc, key) => ({
          ...acc,
          [headerMapping[key] || key]: row[key],
        }),
        {}
      )
    );

    jsonData = processData(jsonData);

    const fileId = await insertDataDetails(req.db, fileName);

    const dataCollection = req.db.collection(
      process.env.MONGO_DATA_COLLECTION!
    );

    const bulkOperations = jsonData.map((document) => ({
      file_id: fileId,
      isActive: true,
      data: document,
    }));

    const insertDataResult = await dataCollection.insertMany(bulkOperations);

    res.status(200).json({
      message: "File uploaded and data inserted successfully!",
      data: { id: fileId },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function deleteController(req: any, res: any) {
  try {
    const collection1 = req.db.collection(process.env.MONGO_DATA_COLLECTION!);
    const result1 = await collection1.deleteMany({});

    const collection2 = req.db.collection(
      process.env.MONGO_DATA_DETAILS_COLLECTION!
    );
    const result2 = await collection2.deleteMany({});
    return res.status(200).send("OK");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { fileController, deleteController };
