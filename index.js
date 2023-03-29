const mongoose = require("mongoose");

const mongString = process.env.DATABASE_URL;
mongoose.connect(mongString);
const dataBase = mongoose.connection;
