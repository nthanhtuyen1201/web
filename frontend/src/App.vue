<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: { AppHeader },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
.container {
  max-width: 1000px;
  margin: auto;
}
</style>
