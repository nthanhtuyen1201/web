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
  const user = await DocGia.findOne({ Email: req.body.Email });
  if (!user || !(await bcrypt.compare(req.body.Password, user.Password))) {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
  res.json(user);
};