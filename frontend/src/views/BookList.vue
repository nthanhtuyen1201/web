<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">Danh sách sách</h2>

    <input
      v-model="search"
      class="form-control mb-4"
      placeholder="Tìm kiếm sách theo tên..."
    />

    <div class="row">
      <div class="col-md-3 mb-4" v-for="book in filteredBooks" :key="book._id">
        <div class="card h-100 shadow-sm">
          <img
            :src="book.AnhBia || defaultImage"
            class="card-img-top"
            alt="Bìa sách"
            style="height: 250px; object-fit: cover"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate" :title="book.TenSach">
              {{ book.TenSach }}
            </h5>
            <p class="card-text text-truncate" :title="book.TacGia">
              Tác giả: {{ book.TacGia }}
            </p>
            <p class="card-text">
              Năm: {{ book.NamXuatBan }} | SL: {{ book.SoQuyen }}
            </p>

            <button
              v-if="canBorrow"
              class="btn btn-success mt-auto"
              @click="muon(book._id)"
            >
              MƯỢN SÁCH
            </button>
            <p v-else class="text-muted mt-auto">Đăng nhập để mượn sách</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredBooks.length === 0" class="text-center text-muted mt-4">
      Không tìm thấy sách nào.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      books: [],
      search: "",
      defaultImage: "https://via.placeholder.com/200x250?text=No+Image",
      userStore: useUserStore(),
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) =>
        book.TenSach.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    canBorrow() {
      return (
        this.userStore.state.currentUser &&
        this.userStore.state.role === "docgia"
      );
    },
  },
  methods: {
    async getBooks() {
      try {
        const res = await axios.get("http://localhost:3000/api/sach");
        this.books = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sách:", err);
      }
    },
    async muon(bookId) {
      try {
        const user = this.userStore.state.currentUser;
        if (!user || !user._id) {
          alert("Bạn cần đăng nhập để mượn sách");
          return;
        }

        await axios.post("http://localhost:3000/api/muontra", {
          MaDocGia: user._id,
          MaSach: bookId,
        });

        alert("Gửi yêu cầu mượn thành công!");
      } catch (err) {
        alert("Lỗi khi gửi yêu cầu mượn sách!");
        console.error(err);
      }
    },
  },
  created() {
    this.getBooks();
  },
};
</script>

<style scoped>
.card-title {
  font-weight: 600;
  font-size: 1.05rem;
}
.card img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
