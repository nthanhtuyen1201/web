const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/docgia.controller");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

module.exports = router;