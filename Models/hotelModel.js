const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  HotelName: {
    required: true,
    type: String,
    unique: true,
  },
  Description: {
    required: true,
    type: String,
  },
  Amenties: {
    required: true,
    type: String,
  },
  PhoneNo: {
    type: Number,
    required: true,
    unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Reviews: {
    type: Array,
  },
});

module.exports = mongoose.model("hotel", hotelSchema);
