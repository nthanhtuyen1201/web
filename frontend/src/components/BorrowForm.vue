<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="modal-container p-4 bg-white rounded shadow-lg">
      <h5 class="mb-3">Điền thông tin mượn sách</h5>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Ngày trả dự kiến</label>
          <input
            type="date"
            v-model="ngayTra"
            class="form-control"
            :min="minNgayTra"
            required
          />
        </div>
        <div class="form-group">
          <label>Ghi chú (tùy chọn)</label>
          <textarea class="form-control" v-model="ghiChu" rows="3" />
        </div>
        <div class="mt-3 d-flex justify-content-end">
          <button class="btn btn-secondary mr-2" @click="$emit('close')">
            Hủy
          </button>
          <button type="submit" class="btn btn-primary">Gửi yêu cầu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/user";

export default {
  props: ["bookId"],
  data() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minNgayTra = tomorrow.toISOString().split("T")[0];

    return {
      ngayTra: minNgayTra,
      minNgayTra,
      ghiChu: "",
      userStore: useUserStore(),
    };
  },
  methods: {
    async submit() {
      const user = this.userStore.state.currentUser;
      if (!user || !user._id) return alert("Bạn chưa đăng nhập.");

      if (!this.ngayTra || this.ngayTra < this.minNgayTra) {
        alert("Ngày trả phải sau ngày hiện tại!");
        return;
      }

      try {
        await axios.post("http://localhost:3000/api/muontra", {
          MaDocGia: user._id,
          MaSach: this.bookId,
          NgayTraDuKien: this.ngayTra,
          GhiChu: this.ghiChu,
        });

        alert("Gửi yêu cầu mượn thành công!");
        this.$emit("close");
      } catch (err) {
        console.error("Lỗi gửi yêu cầu:", err);
        alert("Không thể gửi yêu cầu mượn sách.");
      }
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-container {
  width: 400px;
  background: white;
}
</style>
