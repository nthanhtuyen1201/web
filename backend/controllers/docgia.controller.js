const DocGia = require("../models/docgia.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { HoLot, Ten, Email, Password } = req.body;
    const hashed = await bcrypt.hash(Password, 10);
    const last = await DocGia.findOne().sort({ MaDocGia: -1 });
    const docgia = await DocGia.create({
      ...req.body,
      MaDocGia: last ? last.MaDocGia + 1 : 1,
      Password: hashed,
    });
    res.json(docgia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrMSNV, password } = req.body;

    // tìm theo email
    const user = await DocGia.findOne({ Email: emailOrMSNV });

    if (!user) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    res.json({ user }); // có thể thêm token nếu muốn
  } catch (err) {
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};
