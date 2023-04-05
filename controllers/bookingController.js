const bookingModel = require("../Models/bookingModel");
const hotelModel = require("../Models/hotelModel");
const userModel = require("../Models/userModel");

exports.bookHotel = async (req, res) => {
  try {
    const { StartDate, EndDate, NoOfPersons, NoOfRooms, TypeOfRoom } = req.body;
    const data = new bookingModel({
      BookingId: await generateBookingId(),
      StartDate,
      EndDate,
      NoOfPersons,
      NoOfRooms,
      TypeOfRoom,
    });
    const UserId = req.params.UserId;
    const HotelName = req.params.HotelName;
    const userCheck = await userModel.findOne({ UserId });
    let check = false;
    if (userCheck) {
      const hotelCheck = await hotelModel.findOne({ HotelName });
      if (!hotelCheck) {
        res.status(400).json({ status: "Error", message: "Not a valid Hotel" });
      } else {
        check = true;
      }
    } else {
      res.status(400).json({ status: "Error", message: "Not a valid User" });
    }

    if (check) {
      await data.save().then(
        (response) => {
          res.status(200).json({
            ststus: "Success",
            data: `Successfully made a booking with booking id ${response.BookingId}`,
          });
        },
        (error) => {
          res.status(400).json({ ststus: "Error", data: error.errors });
        }
      );
    }
  } catch (error) {
    res.status(400).json({ ststus: "Error", data: error.message });
  }
};

let generateBookingId = async () => {
  let bookingIds = await bookingModel.distinct("BookingId");
  if (bookingIds.length) {
    let maxBookingId = Math.max(...bookingIds);
    return maxBookingId + 1;
  } else {
    return 1001;
  }
};
