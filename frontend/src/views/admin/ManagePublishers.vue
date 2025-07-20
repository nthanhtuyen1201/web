<template>
  <div class="container mt-5">
    <!-- Nút điều hướng -->
    <div class="mb-4">
      <router-link to="/admin/books" class="btn btn-outline-secondary">
        Quản lý sách
      </router-link>
      <router-link to="/admin/borrows" class="btn btn-outline-secondary">
        Quản lý mượn trả
      </router-link>
      <router-link to="/admin/publishers" class="btn btn-outline-primary mr-2">
        Quản lý nhà xuất bản
      </router-link>
    </div>
    <h2>Quản lý Nhà xuất bản</h2>

    <form @submit.prevent="submitForm" class="mb-4">
      <div class="form-group">
        <label>Mã NXB</label>
        <input v-model="form.MaNXB" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Tên NXB</label>
        <input v-model="form.TenNXB" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Địa chỉ</label>
        <input v-model="form.DiaChi" class="form-control" required />
      </div>
      <button class="btn btn-success mt-2">
        {{ editing ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button
        class="btn btn-secondary mt-2 ml-2"
        type="button"
        @click="resetForm"
      >
        Huỷ
      </button>
    </form>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Mã NXB</th>
          <th>Tên NXB</th>
          <th>Địa chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in publishers" :key="item._id">
          <td>{{ item.MaNXB }}</td>
          <td>{{ item.TenNXB }}</td>
          <td>{{ item.DiaChi }}</td>
          <td>
            <button class="btn btn-sm btn-info" @click="edit(item)">Sửa</button>
            <button class="btn btn-sm btn-danger" @click="del(item._id)">
              Xoá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PublisherService from "../../services/publisher.service";

export default {
  data() {
    return {
      publishers: [],
      form: { MaNXB: "", TenNXB: "", DiaChi: "" },
      editing: false,
      editId: null,
    };
  },
  methods: {
    async fetchAll() {
      this.publishers = await PublisherService.getAll();
    },
    async submitForm() {
      if (this.editing) {
        await PublisherService.update(this.editId, this.form);
      } else {
        await PublisherService.create(this.form);
      }
      this.resetForm();
      this.fetchAll();
    },
    edit(p) {
      this.form = { ...p };
      this.editId = p._id;
      this.editing = true;
    },
    async del(id) {
      if (confirm("Xoá nhà xuất bản này?")) {
        await PublisherService.delete(id);
        this.fetchAll();
      }
    },
    resetForm() {
      this.editing = false;
      this.editId = null;
      this.form = { MaNXB: "", TenNXB: "", DiaChi: "" };
    },
  },
  mounted() {
    this.fetchAll();
  },
};
</script>
