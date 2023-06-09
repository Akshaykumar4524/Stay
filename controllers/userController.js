const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  const { Name, Address, EmailId, PhoneNo, Password } = req.body;

  try {
    const user = await UserModel.findOne({ EmailId });
    if (user) {
      res.status(400).json({
        status: "Error",
        message: "User already Exist with this EmailId",
      });
    } else {
      let UserId;
      let data;
      generateUserId().then(async (response) => {
        UserId = response;

        data = new UserModel({
          UserId,
          Name,
          Address,
          EmailId,
          PhoneNo,
          Password: await bcrypt.hash(Password, 10),
        });
        await data.save().then(
          (result) => {
            res.status(200).json({
              status: "Success",
              message: `Successfully Registered with UserId ${result.UserId}`,
            });
          },
          (error) => {
            if (error.errors["Name"]) {
              res.status(400).json({
                status: "Error",
                message: error.errors["Name"].message,
              });
            } else if (error.errors["PhoneNo"]) {
              res.status(400).json({
                status: "Error",
                message: error.errors["PhoneNo"].message,
              });
            } else if (error.errors["EmailId"]) {
              res.status(400).json({
                status: "Error",
                message: error.errors["EmailId"].message,
              });
            } else {
              res.status(400).json({ status: "Error", message: error.errors });
            }
          }
        );
      });
    }
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

let generateUserId = async () => {
  let userIds = await UserModel.distinct("UserId");
  if (userIds.length) {
    let maxUserId = Math.max(...userIds);
    return maxUserId + 1;
  } else {
    return 1001;
  }
};

exports.Login = async (req, res) => {
  const { EmailId, Password } = req.body;
  try {
    const user = await userModel.findOne({ EmailId });
    if (user) {
      const check = await bcrypt.compare(Password, user.Password);
      if (check) {
        res.cookie("UserName", user.Name);
        res
          .status(200)
          .json({ status: "Success", message: "Login SuccessFull" });
      } else {
        res
          .status(400)
          .json({ status: "Error", message: "Please Check your password" });
      }
    } else {
      res
        .status(400)
        .json({ status: "Error", message: "Please enter valid EmailId" });
    }
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("UserName");
    res.status(200).json({ status: "Success", message: "You are Logged Out" });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};
