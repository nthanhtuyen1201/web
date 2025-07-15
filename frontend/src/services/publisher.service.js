import createApiClient from "./api.service";
const api = createApiClient("/api/nxb");

export default {
  getAll: () => api.get("/"),
  create: (data) => api.post("/", data),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`),
};
