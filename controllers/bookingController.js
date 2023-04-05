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
        async (response) => {
          const user = await userModel.findOne({ UserId });
          user.UserBookings.push(response.BookingId);
          const UserBookings = user.UserBookings;
          await userModel.findOneAndUpdate({ UserId }, { UserBookings });
          res.status(200).json({
            ststus: "Success",
            message: `Successfully made a booking with booking id ${response.BookingId}`,
          });
        },
        (error) => {
          if (error.errors["StartDate"]) {
            res.status(400).json({
              status: "Error",
              message: error.errors["StartDate"].message,
            });
          } else if (error.errors["EndDate"]) {
            res.status(400).json({
              status: "Error",
              message: error.errors["EndDate"].message,
            });
          } else if (error.errors["NoOfPersons"]) {
            res.status(400).json({
              status: "Error",
              message: error.errors["NoOfPersons"].message,
            });
          } else if (error.errors["NoOfRooms"]) {
            res.status(400).json({
              status: "Error",
              message: error.errors["NoOfRooms"].message,
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).json({ ststus: "Error", message: error.message });
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
