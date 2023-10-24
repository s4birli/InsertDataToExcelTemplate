import express from "express";
import excelController from "./controller/excelController";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/updateExcel", excelController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
