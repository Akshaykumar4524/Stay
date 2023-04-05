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
    validate: [dateValidatorforStart, 'Start Date should be greater than or equal to Today']
  },
  EndDate: {
    type: Date,
    required: true,
    validate: [dateValidator, 'End Date should be a date greater than or equal to start date']
  },
  NoOfPersons: {
    type: Number,
    required: true,
    min:[1,'Number of Persons should be a valid number greater than 0 and less than 5'],
    max:[5,'Number of Persons should be a valid number greater than 0 and less than 5']
  },
  NoOfRooms: {
    required: true,
    type: Number,
    min:[1,'Number of Rooms should be a valid number greater than 0 and less than 3'],
    max:[3,'Number of Rooms should be a valid number greater than 0 and less than 3']
  },
  TypeOfRoom: {
    required: true,
    type: String,
  },
});

function dateValidator(value) {
  return this.StartDate <= value;
}
function dateValidatorforStart(value){
  const date = new Date();
  return value>=date;
}
module.exports = mongoose.model("booking", bookingSchema);