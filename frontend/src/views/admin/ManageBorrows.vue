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
          <th>Ngày trả dự kiến</th>
          <th>Ghi chú</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in requests" :key="item._id">
          <td>{{ item.MaDocGia?.Ten || "..." }}</td>
          <td>{{ item.MaSach?.TenSach || "..." }}</td>
          <td>{{ format(item.NgayMuon) }}</td>
          <td>{{ item.NgayTraDuKien ? format(item.NgayTraDuKien) : "—" }}</td>
          <td>{{ item.GhiChu || "—" }}</td>
          <td>{{ hienThiTrangThai(item.TrangThai) }}</td>
          <td>
            <button
              class="btn btn-sm btn-success mr-1"
              @click="update(item._id, true)"
              :disabled="item.TrangThai !== 'choduyet'"
            >
              Duyệt
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="update(item._id, false)"
              :disabled="item.TrangThai !== 'choduyet'"
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
    return {
      requests: [],
    };
  },
  methods: {
    format(date) {
      return new Date(date).toLocaleDateString();
    },
    hienThiTrangThai(status) {
      switch (status) {
        case "choduyet":
          return "Chờ duyệt";
        case "dangmuon":
          return "Đang mượn";
        case "datra":
          return "Đã trả";
        case "tuchoi":
          return "Từ chối";
        default:
          return status;
      }
    },
    async fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/muontra");
        this.requests = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu mượn:", err);
      }
    },
    async update(id, chapnhan) {
      try {
        await axios.put(`http://localhost:3000/api/muontra/duyet/${id}`, {
          chapnhan,
        });
        alert(chapnhan ? "Đã duyệt thành công!" : "Đã từ chối yêu cầu.");
        this.fetchData();
      } catch (err) {
        console.error("Lỗi khi cập nhật trạng thái:", err);
        alert("Không thể cập nhật trạng thái!");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
