<template>
  <div class="page">
    <h3>Quản lý nhà xuất bản</h3>
    <form @submit.prevent="handleSubmit" class="mb-4">
      <input
        v-model="nxb.TenNXB"
        class="form-control mb-2"
        placeholder="Tên NXB"
        required
      />
      <input
        v-model="nxb.DiaChi"
        class="form-control mb-2"
        placeholder="Địa chỉ"
        required
      />
      <button class="btn btn-primary">
        {{ nxb._id ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button
        v-if="nxb._id"
        @click.prevent="reset"
        class="btn btn-secondary ml-2"
      >
        Hủy
      </button>
    </form>

    <ul class="list-group">
      <li
        v-for="item in danhSach"
        :key="item._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ item.TenNXB }}</strong> - {{ item.DiaChi }}
        </div>
        <div>
          <button class="btn btn-sm btn-warning mr-2" @click="edit(item)">
            Sửa
          </button>
          <button class="btn btn-sm btn-danger" @click="remove(item._id)">
            Xóa
          </button>
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
      nxb: { TenNXB: "", DiaChi: "" },
    };
  },
  methods: {
    async fetchData() {
      const res = await axios.get("/api/nxb");
      this.danhSach = res.data;
    },
    async handleSubmit() {
      if (this.nxb._id) await axios.put(`/api/nxb/${this.nxb._id}`, this.nxb);
      else await axios.post("/api/nxb", this.nxb);
      this.reset();
      this.fetchData();
    },
    edit(nxb) {
      this.nxb = { ...nxb };
    },
    async remove(id) {
      if (confirm("Bạn có chắc muốn xóa?")) {
        await axios.delete(`/api/nxb/${id}`);
        this.fetchData();
      }
    },
    reset() {
      this.nxb = { TenNXB: "", DiaChi: "" };
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.page {
  max-width: 800px;
  margin: 30px auto;
}
</style>
