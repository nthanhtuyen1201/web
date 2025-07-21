const Sach = require("../models/sach.model");
const path = require("path");

exports.getAll = async (req, res) => {
  const books = await Sach.find();
  res.json(books);
};

exports.create = async (req, res) => {
  const last = await Sach.findOne().sort({ MaSach: -1 });
  const MaSach = last ? last.MaSach + 1 : 1;

  const data = { ...req.body, MaSach };
  if (req.file) {
    data.AnhBia = `http://localhost:3000/uploads/${req.file.filename}`;
  }

  const sach = await Sach.create(data);
  res.json(sach);
};

exports.update = async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    data.AnhBia = `http://localhost:3000/uploads/${req.file.filename}`;
  }

  const sach = await Sach.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(sach);
};

exports.remove = async (req, res) => {
  await Sach.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
