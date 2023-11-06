import { ObjectId, Db } from "mongodb";

export async function updateController(req: any, res: any) {
  try {
    const rowData = req.body.body as any;
    const file_id = new ObjectId(req.params.id);
    const _id = new ObjectId(rowData._id);
    const result = await updateData({ file_id, _id, rowData }, req.db);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function updateData(
  {
    file_id,
    _id,
    rowData,
  }: {
    file_id: ObjectId;
    _id: ObjectId;
    rowData: any;
  },
  db: Db
): Promise<{ status: boolean; message: string }> {
  const collection = db.collection(process.env.MONGO_DATA_COLLECTION!);

  delete rowData._id;

  const result = await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: { data: rowData } }
  );

  const status = result.modifiedCount > 0;
  const message = status ? "Data updated successfully!" : "Data not found!";
  return { status, message };
}
