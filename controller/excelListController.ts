import { Db } from "mongodb";

const fs = require("fs");
const path = require("path");

interface FileList {
  file_name: String;
  create_date: Date;
  isActive: Boolean;
}
async function excelListController(req: any, res: any) {
  try {
    const result = await getData(req.db);

    res.status(200).json({
      data: result.documents,
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
}

async function getData(db: Db): Promise<{
  documents: any[];
}> {
  const collection = db.collection(process.env.MONGO_DATA_DETAILS_COLLECTION!);

  let dbQuery = collection.find<any>({ isActive: true });

  const documents = await dbQuery.toArray();

  return { documents };
}

export default excelListController;
