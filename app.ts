import express from "express";
const fileUpload = require("express-fileupload");
import cors from "cors";
const bodyParser = require("body-parser");
import dbMiddleware from "./middleware/dbMiddleware";

import excelController from "./controller/excelController";
import { fileController, deleteController } from "./controller/fileController";
import { dataController } from "./controller/dataController";
import excelListController from "./controller/excelListController";
import { updateController } from "./controller/updateController";
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/updateExcel", excelController);

app.get("/excelList", dbMiddleware, excelListController);
app.post("/upload", dbMiddleware, fileController);
app.get("/data", dbMiddleware, dataController);
app.put("/update/:id", dbMiddleware, updateController);
app.post("/deleteAll", dbMiddleware, deleteController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
