const MuonTra = require("../models/muontra.model");
const Sach = require("../models/sach.model");

exports.muon = async (req, res) => {
  const { MaDocGia, MaSach } = req.body;
  const trc = await MuonTra.findOne({ MaDocGia, MaSach, TrangThai: "dangmuon" });
  if (trc) return res.status(400).json({ message: "Bạn đang mượn sách này rồi." });

  const sach = await Sach.findOne({ MaSach });
  if (!sach || sach.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết." });

  await Sach.updateOne({ MaSach }, { $inc: { SoQuyen: -1 } });
  const phieu = await MuonTra.create({ MaDocGia, MaSach, NgayMuon: new Date() });
  res.json(phieu);
};

exports.tra = async (req, res) => {
  const { id } = req.params;
  const phieu = await MuonTra.findById(id);
  if (!phieu || phieu.TrangThai === "datra") return res.status(400).json({ message: "Không hợp lệ." });

  await Sach.updateOne({ MaSach: phieu.MaSach }, { $inc: { SoQuyen: 1 } });
  phieu.NgayTra = new Date();
  phieu.TrangThai = "datra";
  await phieu.save();
  res.json(phieu);
};

exports.getAll = async (req, res) => {
  res.json(await MuonTra.find());
};

exports.getByDocGia = async (req, res) => {
  const { madocgia } = req.params;
  const result = await MuonTra.find({ MaDocGia: madocgia });
  res.json(result);
};
