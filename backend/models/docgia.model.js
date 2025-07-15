const mongoose = require("mongoose");
const DocGiaSchema = new mongoose.Schema({
  MaDocGia: { type: Number, unique: true },
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  Email: String,
  Password: String,
});
module.exports = mongoose.model("DocGia", DocGiaSchema);
