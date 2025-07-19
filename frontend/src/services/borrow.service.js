import api from './api.service';
const base = '/api/muontra';

export default {
  getAll() {
    return api.get(base).then(res => res.data);
  },
  getByDocGia(id) {
    return api.get(`${base}/docgia/${id}`).then(res => res.data);
  },
  create(data) {
    return api.post(base, data);
  },
  update(id, data) {
    return api.put(`${base}/${id}`, data);
  }
};
