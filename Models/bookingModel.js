const { default: mongoose } = require("mongoose");

const bookingSchema = mongoose.Schema({
  BookingId: {
    type: String,
    required: true,
    unique: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
    validate: [
      this.StartDate <= this.EndDate,
      "Start Date must be less than EndDate",
    ],
  },
  NoOfPersons: {
    type: Number,
    required: true,
  },
  NoOfRooms: {
    required: true,
    type: Number,
  },
  TypeOfRoom: {
    required: true,
    type: String,
  },
});
