const mongoose = require("mongoose");
const NxbSchema = new mongoose.Schema({
  MaNXB: { type: Number, unique: true },
  TenNXB: String,
  DiaChi: String,
});
module.exports = mongoose.model("NXB", NxbSchema);
