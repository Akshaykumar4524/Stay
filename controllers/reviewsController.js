const hotelModel = require("../Models/hotelModel");
exports.addReviews = async (req, res) => {
  try {
    const { HotelName, Review } = req.body;
    await hotelModel.findOne({ HotelName }).then(async (response) => {
      if (response) {
        const Reviews = response.Reviews;
        Reviews.push(Review);
        await hotelModel
          .findOneAndUpdate({ HotelName }, { Reviews })
          .then(() => {
            res
              .status(200)
              .json({ status: "Success", message: "Reviews Added SuccessFul" });
          });
      } else {
        res.status(400).json({ status: "Error", message: "invalid HotelName" });
      }
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};
