<template>
  <div class="container mt-5">
    <!-- Nút điều hướng -->
    <div class="mb-4">
      <router-link to="/books" class="btn btn-outline-secondary">
        Danh sách sách
      </router-link>
      <router-link to="/borrows" class="btn btn-outline-primary mr-2">
        Xem sách đã mượn
      </router-link>
    </div>

    <h2>Lịch sử mượn sách</h2>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả dự kiến</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in muons" :key="item._id">
          <td>{{ item.MaSach?.TenSach || "..." }}</td>
          <td>{{ format(item.NgayMuon) }}</td>
          <td>{{ item.NgayTraDuKien ? format(item.NgayTraDuKien) : "..." }}</td>
          <td>{{ item.NgayTra ? format(item.NgayTra) : "Chưa trả" }}</td>
          <td>{{ item.TrangThai }}</td>
          <td>{{ item.GhiChu || "—" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      muons: [],
      userStore: useUserStore(),
    };
  },
  methods: {
    format(d) {
      return new Date(d).toLocaleDateString();
    },
    async getData() {
      this.userStore.loadUserFromLocal();
      const user = this.userStore.state.currentUser;
      if (!user || !user._id) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/api/muontra/docgia/${user._id}`
        );
        this.muons = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu mượn:", err);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
