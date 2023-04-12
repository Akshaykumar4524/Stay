exports.invalid = async (req, res) => {
  res.status(404).json({ status: "Fail", message: "Invalid Path" });
};
