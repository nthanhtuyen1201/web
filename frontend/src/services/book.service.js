import api from './api.service';
const base = '/api/sach';

export default {
  getAll() {
    return api.get(base).then(res => res.data);
  },
  get(id) {
    return api.get(`${base}/${id}`).then(res => res.data);
  },
  create(data) {
    return api.post(base, data);
  },
  update(id, data) {
    return api.put(`${base}/${id}`, data);
  },
  delete(id) {
    return api.delete(`${base}/${id}`);
  }
};
