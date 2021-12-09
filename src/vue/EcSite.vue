<template>
  <div class="top-wrapper">
    <h1>Rakus Noodle</h1>
    <div class="button">
      <router-link to="/login">ログイン画面</router-link>
    </div>
    <div class="button">
      <router-link to="/registeradmin">登録画面</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
.button {
  font-size: 50px;
  background-color: turquoise;
  margin: 30px;
  border-radius: 40%;
  opacity: 80%;
}
.button:hover {
  opacity: 100%;
}
h1 {
  background-color: white;
  opacity: 80%;
  border-radius: 5%;
}
.top-wrapper {
  background-image: url(/img_noodle/noodle1.jpg);
  padding: 500px;
  background-size: cover;
  text-align: center;
  padding: 400px;
}
</style>
