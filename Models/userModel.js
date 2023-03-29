const mongoose = require("mongoose");
const validator = require("mongoose-validator");

const userSchema = mongoose.Schema({
  UserId: {
    required: true,
    type: String,
    unique: true,
  },
  Name: {
    required: true,
    type: String,
  },
  Address: {
    required: true,
    type: String,
  },
  EmailId: {
    type: String,
    required: true,
    validate: [validator.isEmail(), "Invalid Email"],
    unique: true,
  },
});

module.exports = mongoose.model("user", userSchema);
