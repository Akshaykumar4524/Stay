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

exports.reSchedule = async (req, res) => {
  try {
    const { StartDate, EndDate, BookingId } = req.body;
    const UserId = req.params.UserId;

    let check = false;
    await userModel.findOne({ UserId }).then((response) => {
      response.UserBookings.forEach((bookingId) => {
        if (bookingId == BookingId) {
          check = true;
        }
      });
    });
    if (check) {
      const date = new Date();
      const start = new Date(StartDate);
      if (!(start >= new Date())) {
        res
          .status(400)
          .json({
            status: "Error",
            message: "Start Date should be greater than or equal to Today",
          });
      } else if (!(StartDate <= EndDate)) {
        res
          .status(400)
          .json({
            status: "Error",
            message: "End Date should be greater than or equal to StartDate",
          });
      } else {
        await bookingModel
          .findOneAndUpdate({ BookingId }, { StartDate, EndDate })
          .then(
            (response) => {
              res.status(200).json({
                status: "Success",
                message: `Successfully rescheduled the booking with booking Id ${response.BookingId}`,
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
              }
            }
          );
      }
    } else {
      res.status(400).json({
        status: "Error",
        message: "invalid UserId or Bookingid",
      });
    }
  } catch (error) {
    res.status(400).json({ ststus: "Error", message: error.message });
  }
};
