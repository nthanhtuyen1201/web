const mongoose = require("mongoose");

const muonTraSchema = new mongoose.Schema({
  MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia", required: true },
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", required: true },
  NgayMuon: { type: Date, default: Date.now },
  NgayTraDuKien: { type: Date, required: true },      
  NgayTra: { type: Date },                            
  GhiChu: { type: String },
  TrangThai: {
    type: String,
    enum: ["choduyet", "dangmuon", "datra", "tuchoi"],
    default: "choduyet"
  }
});

module.exports = mongoose.model("MuonTra", muonTraSchema);
