const NXB = require("../models/nxb.model");

exports.getAll = async (req, res) => {
  res.json(await NXB.find());
};
exports.create = async (req, res) => {
  const last = await NXB.findOne().sort({ MaNXB: -1 });
  const nxb = await NXB.create({ ...req.body, MaNXB: last ? last.MaNXB + 1 : 1 });
  res.json(nxb);
};
exports.update = async (req, res) => {
  const nxb = await NXB.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(nxb);
};
exports.remove = async (req, res) => {
  await NXB.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};