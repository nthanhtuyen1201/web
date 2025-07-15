<template>
  <div class="page">
    <h3>Quản lý sách</h3>
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="form-group">
        <input
          v-model="book.TenSach"
          class="form-control"
          placeholder="Tên sách"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="book.TacGia"
          class="form-control"
          placeholder="Tác giả"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="book.NamXuatBan"
          class="form-control"
          placeholder="Năm xuất bản"
          required
          type="number"
        />
      </div>
      <div class="form-group">
        <input
          v-model="book.MaNXB"
          class="form-control"
          placeholder="Mã NXB"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="book.SoQuyen"
          class="form-control"
          placeholder="Số quyển"
          required
          type="number"
        />
      </div>
      <button class="btn btn-primary">
        {{ book._id ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button
        v-if="book._id"
        class="btn btn-secondary ml-2"
        @click.prevent="reset"
      >
        Hủy
      </button>
    </form>

    <ul class="list-group">
      <li
        v-for="s in books"
        :key="s._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ s.TenSach }}</strong> - {{ s.TacGia }} ({{ s.NamXuatBan }})
          - SL: {{ s.SoQuyen }}
        </div>
        <div>
          <button class="btn btn-sm btn-warning mr-2" @click="editBook(s)">
            Sửa
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteBook(s._id)">
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
      books: [],
      book: {
        TenSach: "",
        TacGia: "",
        NamXuatBan: "",
        MaNXB: "",
        SoQuyen: 1,
      },
    };
  },
  methods: {
    async fetchBooks() {
      const res = await axios.get("/api/sach");
      this.books = res.data;
    },
    async handleSubmit() {
      if (this.book._id) {
        await axios.put(`/api/sach/${this.book._id}`, this.book);
      } else {
        await axios.post("/api/sach", this.book);
      }
      this.reset();
      this.fetchBooks();
    },
    editBook(book) {
      this.book = { ...book };
    },
    async deleteBook(id) {
      if (confirm("Bạn có chắc chắn muốn xoá sách này?")) {
        await axios.delete(`/api/sach/${id}`);
        this.fetchBooks();
      }
    },
    reset() {
      this.book = {
        TenSach: "",
        TacGia: "",
        NamXuatBan: "",
        MaNXB: "",
        SoQuyen: 1,
      };
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style>
.page {
  max-width: 800px;
  margin: 30px auto;
}
</style>
