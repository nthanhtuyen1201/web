const Sach = require("../models/sach.model");

exports.getAll = async (req, res) => {
  res.json(await Sach.find());
};
exports.create = async (req, res) => {
  const last = await Sach.findOne().sort({ MaSach: -1 });
  const sach = await Sach.create({ ...req.body, MaSach: last ? last.MaSach + 1 : 1 });
  res.json(sach);
};
exports.update = async (req, res) => {
  const sach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sach);
};
exports.remove = async (req, res) => {
  await Sach.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};