<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <router-link class="navbar-brand" to="/">Quản lý mượn sách</router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-if="!user.state.currentUser">
          <router-link class="nav-link" to="/login">Đăng nhập</router-link>
        </li>
        <li class="nav-item" v-if="!user.state.currentUser">
          <router-link class="nav-link" to="/register">Đăng ký</router-link>
        </li>
        <li class="nav-item" v-if="user.state.currentUser">
          <a class="nav-link" href="#" @click="logout">Đăng xuất</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = useUserStore();
    const router = useRouter();

    const logout = () => {
      user.logout();
      router.push("/");
    };

    return { user, logout };
  },
};
</script>
