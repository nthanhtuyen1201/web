import axios from "axios";

export default {
  loginDocGia: (data) => axios.post("/api/docgia/login", data),
  loginNhanVien: (data) => axios.post("/api/nhanvien/login", data),
  registerDocGia: (data) => axios.post("/api/docgia/register", data),
};