const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

require("./config/db")();

app.use("/uploads", express.static("uploads"));
app.use("/api/docgia", require("./routes/docgia.route"));
app.use("/api/nhanvien", require("./routes/nhanvien.route"));
app.use("/api/sach", require("./routes/sach.route"));
app.use("/api/nxb", require("./routes/nxb.route"));
app.use("/api/muontra", require("./routes/muontra.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));