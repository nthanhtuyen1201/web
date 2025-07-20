const MuonTra = require("../models/muontra.model");
const Sach = require("../models/sach.model");

exports.muon = async (req, res) => {
  try {
    const { MaDocGia, MaSach, NgayTraDuKien, GhiChu } = req.body;

    const trc = await MuonTra.findOne({
      MaDocGia,
      MaSach,
      TrangThai: { $in: ["dangmuon", "choduyet"] },
    });

    if (trc) {
      return res
        .status(400)
        .json({ message: "Bạn đã gửi yêu cầu hoặc đang mượn sách này rồi." });
    }

    const sach = await Sach.findById(MaSach);
    if (!sach || sach.SoQuyen <= 0) {
      return res
        .status(400)
        .json({ message: "Sách đã hết hoặc không tồn tại." });
    }

    const phieu = await MuonTra.create({
      MaDocGia,
      MaSach,
      NgayMuon: new Date(),
      NgayTraDuKien,
      GhiChu,
      TrangThai: "choduyet",
    });

    res.json(phieu);
  } catch (err) {
    console.error("Lỗi mượn sách:", err);
    res.status(500).json({ message: "Lỗi server khi mượn sách." });
  }
};

exports.duyetMuon = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapnhan } = req.body; // true = duyệt, false = từ chối

    const phieu = await MuonTra.findById(id);
    if (!phieu || phieu.TrangThai !== "choduyet") {
      return res.status(400).json({ message: "Phiếu không hợp lệ hoặc đã xử lý." });
    }

    if (chapnhan) {
      const sach = await Sach.findById(phieu.MaSach);
      if (!sach || sach.SoQuyen <= 0) {
        return res.status(400).json({ message: "Sách đã hết." });
      }

      await Sach.findByIdAndUpdate(phieu.MaSach, { $inc: { SoQuyen: -1 } });
      phieu.TrangThai = "dangmuon";
    } else {
      phieu.TrangThai = "tuchoi";
    }

    await phieu.save();
    res.json(phieu);
  } catch (err) {
    console.error("Lỗi duyệt phiếu:", err);
    res.status(500).json({ message: "Lỗi server khi duyệt mượn sách." });
  }
};

exports.tra = async (req, res) => {
  try {
    const { id } = req.params;

    const phieu = await MuonTra.findById(id);
    if (!phieu || phieu.TrangThai !== "dangmuon") {
      return res.status(400).json({ message: "Phiếu không hợp lệ." });
    }

    // Cập nhật sách: tăng lại số lượng
    await Sach.findByIdAndUpdate(phieu.MaSach, { $inc: { SoQuyen: 1 } });

    // Cập nhật phiếu mượn
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
    const list = await MuonTra.find()
      .populate("MaSach")
      .populate("MaDocGia");
    res.json(list);
  } catch (err) {
    console.error("Lỗi lấy danh sách:", err);
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
