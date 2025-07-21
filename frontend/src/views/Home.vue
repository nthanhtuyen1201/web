<template>
  <div class="home-page">
    <div class="overlay">
      <div class="container mt-5 text-center text-white">
        <h1>Hệ thống quản lý mượn sách</h1>
        <p class="lead mt-3">
          Chào mừng bạn đến với thư viện trực tuyến. Bạn có thể tìm sách, đăng
          ký tài khoản độc giả và gửi yêu cầu mượn sách.
        </p>
        <router-link to="/books" class="btn btn-light mt-3">
          Xem danh sách sách
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6); /* lớp phủ tối để chữ dễ đọc */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
