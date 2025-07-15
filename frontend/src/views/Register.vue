<template>
  <div class="page">
    <h3>Đăng ký Độc giả</h3>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Họ tên:</label>
        <input v-model="form.name" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input
          v-model="form.email"
          class="form-control"
          required
          type="email"
        />
      </div>
      <div class="form-group">
        <label>Mật khẩu:</label>
        <input
          v-model="form.password"
          class="form-control"
          required
          type="password"
        />
      </div>
      <button class="btn btn-success">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: { name: "", email: "", password: "" },
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("/api/docgia/register", this.form);
        alert("Đăng ký thành công. Hãy đăng nhập.");
        this.$router.push("/login");
      } catch (err) {
        alert("Đăng ký thất bại.");
      }
    },
  },
};
</script>

<style>
.page {
  max-width: 500px;
  margin: 40px auto;
}
</style>
