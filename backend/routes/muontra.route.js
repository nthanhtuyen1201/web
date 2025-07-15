const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/muontra.controller");

router.get("/", ctrl.getAll);
router.get("/docgia/:madocgia", ctrl.getByDocGia);
router.post("/", ctrl.muon);
router.put("/tra/:id", ctrl.tra);

module.exports = router;
