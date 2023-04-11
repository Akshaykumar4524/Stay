const express = require("express");
const userController = require("./controllers/userController");
const hotelController = require("./controllers/hotelController");
const bookingController = require("./controllers/bookingController");
const reviewsController = require("./controllers/reviewsController");
const route = express.Router();
module.exports = route;
route.post("/register", userController.Register);
route.post("/login", userController.Login);
route.get("/hotels", hotelController.getAllHotels);
route.post("/hotels", hotelController.addHotel);
route.post("/bookings/:UserId/:HotelName", bookingController.bookHotel);
route.put("/bookings/:UserId", bookingController.reSchedule);
route.delete("/bookings/:UserId/:BookingId", bookingController.cancelBooking);
route.get("/bookings/:UserId", bookingController.getBookings);
route.post("/reviews", reviewsController.addReviews)