const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes");
const express = require('express');

const mongString = process.env.DATABASE_URL;
mongoose.connect(mongString);
const dataBase = mongoose.connection;

dataBase.on("error", (error) => {
  console.log(error);
});

dataBase.once("connected", () => {
  console.log("DataBase Connected");
});

const app = express();
app.use(express.json());
app.use("/api", routes);
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
