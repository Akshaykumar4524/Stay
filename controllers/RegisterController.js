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
        await data.save().then((result)=>{
          res.status(200).json({
            status: "Success",
            message: `Successfully Registered with UserId ${result.UserId}`,
          });
        },
        (error)=>{
          res.status(400).json({ status: "Error", message: error.errors });
        });
        
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
