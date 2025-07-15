const mongoose = require("mongoose");
const NhanVienSchema = new mongoose.Schema({
  MaNV: { type: Number, unique: true },
  HoTenNV: String,
  ChucVu: String,
  DiaChi: String,
  SoDienThoai: String,
  Email: String,
  Password: String,
});
module.exports = mongoose.model("NhanVien", NhanVienSchema);
