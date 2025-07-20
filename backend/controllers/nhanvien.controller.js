const NhanVien = require("../models/nhanvien.model");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { emailOrMSNV, password } = req.body;

    const user = await NhanVien.findOne({ Email: emailOrMSNV });

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy tài khoản nhân viên" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};
