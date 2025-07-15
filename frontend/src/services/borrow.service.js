import createApiClient from "./api.service";
const api = createApiClient("/api/muontra");

export default {
  getAll: () => api.get("/"),
  getByDocGia: (madg) => api.get(`/docgia/${madg}`),
  borrow: (data) => api.post("/", data),
  returnBook: (id) => api.put(`/tra/${id}`),
};