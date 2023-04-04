const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  UserId: {
    required: [true,"Required"],
    type: Number,
    unique: [true,'this Id already exist'],
  },
  Name: {
    required: [true,"Required"],
    type: String,
    minlength: [3, "Enter a Valid Name with at least 3 characters"],
  },
  Address: {
    required: [true,"Required"],
    type: String,
  },
  EmailId: {
    type: String,
    required: [true,"Required"],
    validate: [validator.isEmail, "invalid email"],
    unique: [true,'this email already exist'],
  },
  PhoneNo: {
    type: Number,
    required: [true,"Required"],
    unique: [true,'this phoneNo already exist'],
    min: [999999999, "Invalid Phone No"],
  },
  Password: {
    type: String,
    required: [true,"Required"],
  },
  UserBookings: {
    type: Array,
  },
});

module.exports = mongoose.model("user", userSchema);
