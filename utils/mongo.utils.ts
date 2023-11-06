import { Db, ObjectId } from "mongodb";

export async function insertDataDetails(
  db: Db,
  fileName: string
): Promise<ObjectId> {
  const dataDetailsCollection = db.collection(
    process.env.MONGO_DATA_DETAILS_COLLECTION!
  );

  const result = await dataDetailsCollection.insertOne({
    file_name: fileName,
    create_date: new Date(),
    isActive: true,
  });

  return result.insertedId;
}
