const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/sach.controller");

const multer = require("multer");
const path = require("path");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// Route
router.get("/", ctrl.getAll);
router.post("/", upload.single("AnhBia"), ctrl.create);
router.put("/:id", upload.single("AnhBia"), ctrl.update); // Cho phép cập nhật ảnh
router.delete("/:id", ctrl.remove);

module.exports = router;
