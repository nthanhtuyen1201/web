<template>
  <div class="container mt-5">
    <h2>Đăng ký tài khoản độc giả</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Họ tên</label>
        <input v-model="Ten" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Ngày sinh</label>
        <input type="date" v-model="NgaySinh" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Giới tính</label>
        <select v-model="Phai" class="form-control">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div class="form-group">
        <label>Địa chỉ</label>
        <input v-model="DiaChi" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Điện thoại</label>
        <input v-model="DienThoai" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="Email" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          v-model="Password"
          class="form-control"
          required
        />
      </div>
      <button class="btn btn-success mt-3" type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const Ten = ref("");
    const NgaySinh = ref("");
    const Phai = ref("");
    const DiaChi = ref("");
    const DienThoai = ref("");
    const Email = ref("");
    const Password = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        await axios.post("http://localhost:3000/api/docgia/register", {
          Ten,
          NgaySinh,
          Phai,
          DiaChi,
          DienThoai,
          Email,
          Password,
        });
        alert("Đăng ký thành công!");
        router.push("/login");
      } catch (err) {
        alert("Lỗi đăng ký: " + err.message);
      }
    };

    return {
      Ten,
      NgaySinh,
      Phai,
      DiaChi,
      DienThoai,
      Email,
      Password,
      register,
    };
  },
};
</script>
