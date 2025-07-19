<template>
  <div class="container mt-5">
    <h2>Lịch sử mượn sách</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in muons" :key="item._id">
          <td>{{ item.MaSach?.TenSach || "..." }}</td>
          <td>{{ format(item.NgayMuon) }}</td>
          <td>{{ item.NgayTra ? format(item.NgayTra) : "Chưa trả" }}</td>
          <td>{{ item.TrangThai }}</td>
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
    return { muons: [] };
  },
  methods: {
    format(d) {
      return new Date(d).toLocaleDateString();
    },
    async getData() {
      const user = this.userStore.user;
      const res = await axios.get(
        `http://localhost:3000/api/muontra/docgia/${user._id}`
      );
      this.muons = res.data;
    },
  },
  created() {
    this.userStore = useUserStore();
    this.userStore.loadUserFromLocal();
    this.getData();
  },
};
</script>
