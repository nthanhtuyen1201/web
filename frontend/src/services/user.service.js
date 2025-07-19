import api from './api.service';

export default {
  loginDocGia(data) {
    return api.post('/api/docgia/login', data).then(res => res.data);
  },
  registerDocGia(data) {
    return api.post('/api/docgia/register', data).then(res => res.data);
  },
  loginNhanVien(data) {
    return api.post('/api/nhanvien/login', data).then(res => res.data);
  }
};
