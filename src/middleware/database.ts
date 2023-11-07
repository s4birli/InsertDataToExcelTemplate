import { Db, MongoClient, MongoClientOptions } from "mongodb";

class Database {
  private static instance: Db;

  public static async getInstance(): Promise<Db> {
    if (!this.instance) {
      try {
        const client = new MongoClient(process.env.MONGO_URI!);
        await client.connect();
        this.instance = client.db(process.env.MONGO_DB_NAME);
      } catch (error) {
        // Handle error in connecting to the database
        throw error;
      }
    }

    return this.instance;
  }
}

export default Database;
