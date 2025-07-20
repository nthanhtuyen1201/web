const MuonTra = require("../models/muontra.model");
const Sach = require("../models/sach.model");

exports.muon = async (req, res) => {
  try {
    const { MaDocGia, MaSach } = req.body;

    // Kiểm tra đã mượn sách này chưa
    const trc = await MuonTra.findOne({
      MaDocGia,
      MaSach,
      TrangThai: "dangmuon",
    });
    if (trc) {
      return res
        .status(400)
        .json({ message: "Bạn đang mượn sách này rồi." });
    }

    // Tìm sách bằng _id
    const sach = await Sach.findById(MaSach);
    if (!sach || sach.SoQuyen <= 0) {
      return res.status(400).json({ message: "Sách đã hết hoặc không tồn tại." });
    }

    // Giảm số lượng
    await Sach.findByIdAndUpdate(MaSach, { $inc: { SoQuyen: -1 } });

    // Tạo phiếu mượn
    const phieu = await MuonTra.create({
      MaDocGia,
      MaSach,
      NgayMuon: new Date(),
      TrangThai: "dangmuon",
    });

    res.json(phieu);
  } catch (err) {
    console.error("Lỗi mượn sách:", err);
    res.status(500).json({ message: "Lỗi server khi mượn sách." });
  }
};

exports.tra = async (req, res) => {
  try {
    const { id } = req.params;
    const phieu = await MuonTra.findById(id);
    if (!phieu || phieu.TrangThai === "datra") {
      return res.status(400).json({ message: "Không hợp lệ." });
    }

    await Sach.findByIdAndUpdate(phieu.MaSach, { $inc: { SoQuyen: 1 } });

    phieu.NgayTra = new Date();
    phieu.TrangThai = "datra";
    await phieu.save();

    res.json(phieu);
  } catch (err) {
    console.error("Lỗi trả sách:", err);
    res.status(500).json({ message: "Lỗi server khi trả sách." });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await MuonTra.find().populate("MaSach").populate("MaDocGia");
    res.json(list);
  } catch (err) {
    console.error("Lỗi lấy danh sách mượn:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
};

exports.getByDocGia = async (req, res) => {
  try {
    const { madocgia } = req.params;
    const result = await MuonTra.find({ MaDocGia: madocgia })
      .populate("MaSach");
    res.json(result);
  } catch (err) {
    console.error("Lỗi lấy lịch sử mượn:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
};
