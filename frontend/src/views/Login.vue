<template>
  <div class="container mt-5">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email hoặc MSNV</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label>Loại tài khoản:</label>
        <select v-model="role" class="form-control">
          <option value="docgia">Độc giả</option>
          <option value="nhanvien">Nhân viên</option>
        </select>
      </div>
      <button class="btn btn-primary mt-3" type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const role = ref("docgia");
    const userStore = useUserStore();
    const router = useRouter();

    const login = async () => {
      try {
        const endpoint =
          role.value === "docgia"
            ? "http://localhost:3000/api/docgia/login"
            : "http://localhost:3000/api/nhanvien/login";

        const res = await axios.post("http://localhost:3000/api/docgia/login", {
          emailOrMSNV: username.value,
          password: password.value,
        });

        const userData = {
          ...res.data.user,
          role: role.value,
          token: res.data.token,
        };
        userStore.setUser(userData);

        if (role.value === "nhanvien") router.push("/admin/books");
        else router.push("/books");
      } catch (err) {
        alert("Sai thông tin đăng nhập");
      }
    };

    return { username, password, role, login };
  },
};
</script>
