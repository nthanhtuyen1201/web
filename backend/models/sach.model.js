const mongoose = require("mongoose");
const SachSchema = new mongoose.Schema({
  MaSach: { type: Number, unique: true },
  TenSach: String,
  DonGia: Number,
  SoQuyen: Number,
  NamXuatBan: Number,
  MaNXB: Number,
  TacGia: String,
});
module.exports = mongoose.model("Sach", SachSchema);
