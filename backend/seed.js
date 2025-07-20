const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const NhanVien = require("./models/nhanvien.model");

mongoose.connect("mongodb://localhost:27017/muonsach", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const hashed = await bcrypt.hash("123456", 10);

  // Lấy MaNV cuối cùng
  const last = await NhanVien.findOne().sort({ MaNV: -1 });
  const newMaNV = last ? last.MaNV + 1 : 1;

  await NhanVien.create({
    MaNV: newMaNV,
    HoTenNV: "Nguyễn Văn A",
    ChucVu: "Thủ thư",
    DiaChi: "Cần Thơ",
    SoDienThoai: "0909123456",
    Email: "admin@gmail.com",
    Password: hashed,
  });

  console.log("Đã thêm tài khoản nhân viên!");
  mongoose.disconnect();
}

createAdmin();
