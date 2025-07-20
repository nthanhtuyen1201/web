<template>
  <div class="container mt-5">
    <!-- Nút điều hướng -->
    <div class="mb-4">
      <router-link to="/admin/books" class="btn btn-outline-primary mr-2">
        Quản lý sách
      </router-link>
      <router-link to="/admin/borrows" class="btn btn-outline-secondary">
        Quản lý mượn trả
      </router-link>
      <router-link to="/admin/publishers" class="btn btn-outline-secondary">
        Quản lý nhà xuất bản
      </router-link>
    </div>

    <h2>Quản lý sách</h2>

    <!-- Form thêm/sửa -->
    <form @submit.prevent="submitForm" class="mb-4">
      <div class="form-group">
        <label>Tên sách</label>
        <input v-model="form.TenSach" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Tác giả</label>
        <input v-model="form.TacGia" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Năm xuất bản</label>
        <input
          v-model="form.NamXuatBan"
          class="form-control"
          type="number"
          required
        />
      </div>
      <div class="form-group">
        <label>Số quyển</label>
        <input
          v-model="form.SoQuyen"
          class="form-control"
          type="number"
          required
        />
      </div>
      <div class="form-group">
        <label>Đơn giá</label>
        <input
          v-model="form.DonGia"
          class="form-control"
          type="number"
          required
        />
      </div>
      <div class="form-group">
        <label>Mã NXB</label>
        <input v-model="form.MaNXB" class="form-control" required />
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

    <!-- Danh sách sách -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Năm</th>
          <th>Số quyển</th>
          <th>Giá</th>
          <th>NXB</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book.TenSach }}</td>
          <td>{{ book.TacGia }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>{{ book.SoQuyen }}</td>
          <td>{{ book.DonGia }}</td>
          <td>{{ book.MaNXB }}</td>
          <td>
            <button class="btn btn-sm btn-info" @click="edit(book)">Sửa</button>
            <button class="btn btn-sm btn-danger" @click="del(book._id)">
              Xoá
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
      books: [],
      form: {
        TenSach: "",
        TacGia: "",
        NamXuatBan: "",
        SoQuyen: "",
        DonGia: "",
        MaNXB: "",
      },
      editing: false,
      editId: null,
    };
  },
  methods: {
    async fetchBooks() {
      const res = await axios.get("http://localhost:3000/api/sach");
      this.books = res.data;
    },
    async submitForm() {
      if (this.editing) {
        await axios.put(
          `http://localhost:3000/api/sach/${this.editId}`,
          this.form
        );
      } else {
        await axios.post("http://localhost:3000/api/sach", this.form);
      }
      this.resetForm();
      this.fetchBooks();
    },
    edit(book) {
      this.editing = true;
      this.editId = book._id;
      this.form = { ...book };
    },
    async del(id) {
      if (confirm("Xoá sách này?")) {
        await axios.delete(`http://localhost:3000/api/sach/${id}`);
        this.fetchBooks();
      }
    },
    resetForm() {
      this.editing = false;
      this.editId = null;
      this.form = {
        TenSach: "",
        TacGia: "",
        NamXuatBan: "",
        SoQuyen: "",
        DonGia: "",
        MaNXB: "",
      };
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>
