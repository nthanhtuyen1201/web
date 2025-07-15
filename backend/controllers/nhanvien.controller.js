const NhanVien = require("../models/nhanvien.model");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const user = await NhanVien.findOne({ Email: req.body.Email });
  if (!user || !(await bcrypt.compare(req.body.Password, user.Password))) {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
  res.json(user);
};