<template>
  <div class="page">
    <h3>📚 Danh sách sách</h3>
    <input
      v-model="searchText"
      placeholder="Tìm kiếm tên sách hoặc tác giả..."
      class="form-control mb-3"
    />
    <ul class="list-group">
      <li
        v-for="book in filteredBooks"
        :key="book.MaSach"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ book.TenSach }}</strong> - {{ book.TacGia }} ({{
            book.NamXuatBan
          }})
          <br />
          <small>NXB: {{ book.TenNXB }}</small>
        </div>
        <button
          v-if="user?.role === 'docgia'"
          class="btn btn-sm btn-success"
          @click="muonSach(book.MaSach)"
        >
          Mượn
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
      books: [],
      searchText: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => {
        const str = (book.TenSach + book.TacGia).toLowerCase();
        return str.includes(this.searchText.toLowerCase());
      });
    },
  },
  methods: {
    async fetchBooks() {
      const res = await axios.get("/api/sach");
      this.books = res.data;
    },
    async muonSach(maSach) {
      try {
        await axios.post("/api/muontra", {
          MaDocGia: this.user.MaDocGia,
          MaSach: maSach,
        });
        alert("Đăng ký mượn sách thành công!");
      } catch (err) {
        alert("Không thể mượn sách. Có thể bạn đã mượn hoặc sách không còn.");
      }
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
