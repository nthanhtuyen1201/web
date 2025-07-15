<template>
  <div class="page">
    <h3>Đăng nhập</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email:</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label>Mật khẩu:</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          required
        />
      </div>
      <button class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: { email: "", password: "" },
    };
  },
  methods: {
    async login() {
      try {
        const resDG = await axios.post("/api/docgia/login", this.form);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...resDG.data, role: "docgia" })
        );
        this.$router.push("/books");
      } catch (e1) {
        try {
          const resNV = await axios.post("/api/nhanvien/login", this.form);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...resNV.data, role: "nhanvien" })
          );
          this.$router.push("/admin/books");
        } catch (e2) {
          alert("Sai tài khoản hoặc mật khẩu");
        }
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
