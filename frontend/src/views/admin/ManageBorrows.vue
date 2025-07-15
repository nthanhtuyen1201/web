<template>
  <div class="page">
    <h3>Duyệt phiếu mượn</h3>
    <ul class="list-group">
      <li
        v-for="phieu in danhSach"
        :key="phieu._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <div><strong>Độc giả:</strong> {{ phieu.MaDocGia }}</div>
          <div><strong>Mã sách:</strong> {{ phieu.MaSach }}</div>
          <div>
            <strong>Ngày mượn:</strong> {{ formatDate(phieu.NgayMuon) }}
          </div>
          <div><strong>Trạng thái:</strong> {{ phieu.TrangThai }}</div>
          <div v-if="phieu.NgayTra">
            <strong>Ngày trả:</strong> {{ formatDate(phieu.NgayTra) }}
          </div>
        </div>
        <button
          v-if="phieu.TrangThai === 'dangmuon'"
          class="btn btn-sm btn-success"
          @click="duyetTra(phieu._id)"
        >
          Xác nhận trả
        </button>
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
    };
  },
  methods: {
    async fetchBorrows() {
      const res = await axios.get("/api/muontra");
      this.danhSach = res.data;
    },
    async duyetTra(id) {
      await axios.put(`/api/muontra/tra/${id}`);
      alert("Xác nhận trả sách thành công");
      this.fetchBorrows();
    },
    formatDate(d) {
      return new Date(d).toLocaleDateString("vi-VN");
    },
  },
  mounted() {
    this.fetchBorrows();
  },
};
</script>

<style>
.page {
  max-width: 800px;
  margin: 30px auto;
}
</style>
