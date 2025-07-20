<template>
  <div class="container mt-5">
    <!-- Nút điều hướng -->
    <div class="mb-4">
      <router-link to="/admin/books" class="btn btn-outline-secondary">
        Quản lý sách
      </router-link>
      <router-link to="/admin/borrows" class="btn btn-outline-primary mr-2">
        Quản lý mượn trả
      </router-link>
      <router-link to="/admin/publishers" class="btn btn-outline-secondary">
        Quản lý nhà xuất bản
      </router-link>
    </div>
    <h2>Duyệt yêu cầu mượn sách</h2>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Độc giả</th>
          <th>Sách</th>
          <th>Ngày mượn</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in requests" :key="item._id">
          <td>{{ item.MaDocGia?.Ten || "..." }}</td>
          <td>{{ item.MaSach?.TenSach || "..." }}</td>
          <td>{{ format(item.NgayMuon) }}</td>
          <td>{{ item.TrangThai }}</td>
          <td>
            <button
              class="btn btn-sm btn-success"
              @click="update(item._id, 'da_duyet')"
              :disabled="item.TrangThai !== 'cho_duyet'"
            >
              Duyệt
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="update(item._id, 'tu_choi')"
              :disabled="item.TrangThai !== 'cho_duyet'"
            >
              Từ chối
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { requests: [] };
  },
  methods: {
    format(date) {
      return new Date(date).toLocaleDateString();
    },
    async fetchData() {
      const res = await axios.get("http://localhost:3000/api/muontra");
      this.requests = res.data;
    },
    async update(id, status) {
      await axios.put(`http://localhost:3000/api/muontra/${id}`, {
        TrangThai: status,
      });
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
