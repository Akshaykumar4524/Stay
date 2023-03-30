const express = require("express");
const RegisterController = require("./controllers/RegisterController");
const route = express.Router();
module.exports = route;
route.post("/register", RegisterController.Register);
