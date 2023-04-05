const hotelModel = require("../Models/hotelModel");

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    if (hotels) {
      res.status(200).json({ status: "Success", data: hotels });
    } else {
      res
        .status(200)
        .json({ status: "Error", message: "No Hotels available for now" });
    }
  } catch (error) {
    res.status(200).json({ status: "Error", message: error.message });
  }
};

exports.addHotel = async (req, res) => {
  try {
    const {
      HotelName,
      City,
      Description,
      Amenties,
      PhoneNo,
      Address,
      Reviews,
    } = req.body;

    const data = new hotelModel({
      HotelName,
      City,
      Description,
      Amenties,
      PhoneNo,
      Address,
      Reviews,
    });
    const dataToSave = await data.save();
    res.status(200).json({ status: "Success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};
