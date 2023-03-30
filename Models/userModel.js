const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  UserId: {
    required: [true,"Required"],
    type: Number,
    unique: true,
  },
  Name: {
    required: [true,"Required"],
    type: String,
    min: [3, "Invalid Name"],
  },
  Address: {
    required: [true,"Required"],
    type: String,
  },
  EmailId: {
    type: String,
    required: [true,"Required"],
    validate: [validator.isEmail, "invalid email"],
    unique: true,
  },
  PhoneNo: {
    type: Number,
    required: [true,"Required"],
    unique: true,
    length: [10, "Invalid Phone No"],
  },
  Password: {
    type: String,
    required: [true,"Required"],
    min: [8, "Please Enter a password greater than or equal to 8"],
    max: [12, "Please Enter a password less than or equal to 12"],
  },
  UserBookings: {
    type: Array,
  },
});

module.exports = mongoose.model("user", userSchema);
