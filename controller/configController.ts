import { ObjectId, Db } from "mongodb";

export async function configGetController(req: any, res: any) {
  try {
    const id = new ObjectId(req.params.id);
    const result = await getData({ id }, req.db);

    res.status(200).json(result);
  } catch (error) {
    console.error({ "config error": error });
    res.status(500).send(error);
  }
}

export async function configUpdateController(req: any, res: any) {
  try {
    const config = req.body.body as any;
    const id = new ObjectId(req.params.id);
    const result = await updateData({ id, config }, req.db);
    res.status(200).json(result);
  } catch (error) {
    console.error({ "configUpdateController error": error });
    res.status(500).send(error);
  }
}

export async function getData(
  {
    id,
  }: {
    id: ObjectId;
  },
  db: Db
): Promise<string> {
  const collection = db.collection(process.env.MONGO_CONFIG!);

  const query = { file_id: id };
  const config = await collection.findOne(query);
  if (config) {
    return JSON.stringify(config);
  } else {
    const defaultConfig = {
      file_id: {
        $oid: id,
      },
      config: {
        columns: [
          {
            id: 1,
            name: "Date",
            field: "date",
            dataType: "",
            filter: false,
            sortable: true,
          },
          {
            id: 2,
            name: "Hole depth (m)",
            field: "hole_depth",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 3,
            name: "Block Position (m)",
            field: "block_position",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 4,
            name: "ROP Instant (m/hr)",
            field: "rop_instant",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 5,
            name: "Bit Depth (m)",
            field: "bit_depth",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 6,
            name: "Hook Load (tn)",
            field: "hook_load",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 7,
            name: "Weight on bit (tn)",
            field: "weight_on_bit",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 8,
            name: "SPP (atm)",
            field: "spp",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 9,
            name: "Flow rate In (lps)",
            field: "flow_rate_in",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 10,
            name: "Flow rate Out (lps)",
            field: "flow_rate_out",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 11,
            name: "SPM 1",
            field: "spm_1",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 12,
            name: "SPM 2",
            field: "spm_2",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 13,
            name: "Rotor RPM",
            field: "rotor_rpm",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 14,
            name: "Rotor table torque (kNm)",
            field: "rotor_table_torque",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 15,
            name: "SPM 3",
            field: "spm_3",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 16,
            name: "SPM 4",
            field: "spm_4",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 17,
            name: "ROP Avg (m/hr)",
            field: "rop_avg",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 18,
            name: "Density Mud In (sg)",
            field: "density_mud_in",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
          {
            id: 19,
            name: "Density Mud Out (sg)",
            field: "density_mud_out",
            dataType: "numeric",
            filter: true,
            sortable: true,
          },
        ],
        filters: {
          hole_depth: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          block_position: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          rop_instant: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          bit_depth: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          hook_load: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          weight_on_bit: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          spp: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          flow_rate_in: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          flow_rate_out: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          spm_1: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          spm_2: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          rotor_rpm: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          rotor_table_torque: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          spm_3: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          spm_4: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          rop_avg: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          density_mud_in: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
          density_mud_out: {
            operator: "and",
            constraints: [
              {
                value: null,
                matchMode: "equals",
              },
            ],
          },
        },
        first: 0,
        rows: 25,
        sortField: "date",
        sortOrder: 1,
      },
    };
    return JSON.stringify(defaultConfig);
  }
}

export async function updateData(
  {
    id,
    config,
  }: {
    id: ObjectId;
    config: any;
  },
  db: Db
): Promise<{ status: boolean; message: string }> {
  const collection = db.collection(process.env.MONGO_CONFIG!);

  const exist = await getData({ id }, db);
  let status = false;
  if (exist !== "null") {
    const result = await collection.updateOne(
      { file_id: id },
      { $set: { config: config } }
    );

    status = result.modifiedCount > 0;
  } else {
    const file_id = id;
    const result = await collection.insertOne({ file_id, config });

    status = result.acknowledged;
  }

  const message = status ? "Data updated!" : "Data not found!";
  return { status, message };
}
