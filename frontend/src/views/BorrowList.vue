<template>
  <div class="page">
    <h3>Lịch sử mượn sách</h3>
    <ul class="list-group">
      <li
        v-for="phieu in danhSach"
        :key="phieu._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <div><strong>Mã sách:</strong> {{ phieu.MaSach }}</div>
          <div>
            <strong>Ngày mượn:</strong> {{ formatDate(phieu.NgayMuon) }}
          </div>
          <div v-if="phieu.NgayTra">
            <strong>Ngày trả:</strong> {{ formatDate(phieu.NgayTra) }}
          </div>
          <div><strong>Trạng thái:</strong> {{ phieu.TrangThai }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      danhSach: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    async fetchHistory() {
      const res = await axios.get(`/api/muontra/docgia/${this.user.MaDocGia}`);
      this.danhSach = res.data;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("vi-VN");
    },
  },
  mounted() {
    this.fetchHistory();
  },
};
</script>

<style>
.page {
  max-width: 700px;
  margin: 30px auto;
}
</style>
