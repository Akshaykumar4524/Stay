const express = require("express");
const userController = require("./controllers/userController");
const route = express.Router();
module.exports = route;
route.post("/register", userController.Register);
route.post("/login", userController.Login);
