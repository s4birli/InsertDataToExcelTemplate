import { ObjectId, Db } from "mongodb";

interface IQuery {
  file_id: ObjectId;
  [key: string]: any;
}

interface FilterConstraint {
  value: string;
  matchMode: "equals" | "notEquals" | "gt" | "lt" | "gte" | "lte"; // Add more match modes here if needed
}

interface FilterField {
  operator: "and" | "or"; // Add more operators here if needed
  constraints: FilterConstraint[];
}

interface Filter {
  [field: string]: FilterField;
}

export async function dataController(req: any, res: any) {
  try {
    const { id, page, rowsCount, sort, filters } = req.query;
    const result = await getData(
      { id, page, rowsCount, sort, filters },
      req.db
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getData(
  {
    id,
    page,
    rowsCount,
    sort,
    filters,
  }: {
    id: string;
    page: string;
    rowsCount: string;
    sort: any;
    filters: Filter;
  },
  db: Db
): Promise<{ data: any[]; totalRecords: number }> {
  const collection = db.collection(process.env.MONGO_DATA_COLLECTION!);

  let filterQuery: any = {};

  if (filters) {
    let globalAndConditions: any[] = [];
    for (const field in filters) {
      const { operator, constraints } = filters[field];
      const fieldConditions = constraints
        .map(({ value, matchMode }) => {
          if (value === null || value === undefined) {
            return null;
          }
          const queryField = `data.${field}`;
          switch (matchMode) {
            case "equals":
              return { [queryField]: parseFloat(value) };
            case "notEquals":
              return { [queryField]: { $ne: parseFloat(value) } };
            case "gt":
              return { [queryField]: { $gt: parseFloat(value) } };
            case "gte":
              return { [queryField]: { $gte: parseFloat(value) } };
            case "lt":
              return { [queryField]: { $lt: parseFloat(value) } };
            case "lte":
              return { [queryField]: { $lte: parseFloat(value) } };
            default:
              return null;
          }
        })
        .filter((condition) => condition !== null);

      if (fieldConditions.length > 0) {
        let combinedFieldCondition =
          operator === "or"
            ? { $or: fieldConditions }
            : { $and: fieldConditions };
        globalAndConditions.push(combinedFieldCondition);
      }
    }

    if (globalAndConditions.length > 0) {
      filterQuery = { $and: globalAndConditions };
    }
  }

  const query = { file_id: new ObjectId(id), ...filterQuery };
  if (Object.keys(filterQuery).length > 0) {
    query["$and"] = (query["$and"] || []).concat(filterQuery);
  }

  const options: any = {
    skip: parseInt(page, 10) * parseInt(rowsCount, 10),
    limit: parseInt(rowsCount, 10),
    sort: sort
      ? { [`data.${sort.field}`]: sort.order === "1" ? 1 : -1 }
      : undefined,
  };
  const data = await collection.find(query, options).toArray();
  const totalRecords = await collection.countDocuments(query);

  return { data, totalRecords };
}
