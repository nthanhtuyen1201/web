const mongoose = require("mongoose");

const muonTraSchema = new mongoose.Schema({
  MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia", required: true },
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", required: true },
  NgayMuon: { type: Date, default: Date.now },
  NgayTra: { type: Date },
  TrangThai: {
    type: String,
    enum: ["dangmuon", "datra"],
    default: "dangmuon",
  },
});

module.exports = mongoose.model("MuonTra", muonTraSchema);
