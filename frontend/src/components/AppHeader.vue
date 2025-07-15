<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Mượn Sách</router-link>
    <div class="navbar-nav">
      <router-link v-if="!user" to="/login" class="nav-link"
        >Đăng nhập</router-link
      >
      <router-link v-if="!user" to="/register" class="nav-link"
        >Đăng ký</router-link
      >

      <router-link v-if="user?.role === 'docgia'" to="/books" class="nav-link"
        >Sách</router-link
      >
      <router-link
        v-if="user?.role === 'docgia'"
        to="/borrow-history"
        class="nav-link"
        >Lịch sử</router-link
      >

      <router-link
        v-if="user?.role === 'nhanvien'"
        to="/admin/books"
        class="nav-link"
        >QL Sách</router-link
      >
      <router-link
        v-if="user?.role === 'nhanvien'"
        to="/admin/borrows"
        class="nav-link"
        >Duyệt mượn</router-link
      >
      <router-link
        v-if="user?.role === 'nhanvien'"
        to="/admin/publishers"
        class="nav-link"
        >QL NXB</router-link
      >

      <a
        v-if="user"
        href="#"
        @click.prevent="logout"
        class="nav-link text-danger"
        >Đăng xuất</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px 20px;
}
.navbar-nav .nav-link {
  margin-right: 10px;
}
</style>
