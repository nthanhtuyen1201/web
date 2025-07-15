const mongoose = require("mongoose");
const MuonTraSchema = new mongoose.Schema({
  MaDocGia: Number,
  MaSach: Number,
  NgayMuon: Date,
  NgayTra: Date,
  TrangThai: { type: String, enum: ["dangmuon", "datra"], default: "dangmuon" },
});
module.exports = mongoose.model("MuonTra", MuonTraSchema);
