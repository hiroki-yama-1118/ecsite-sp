<template>
  <div class="top-wrapper">
    <div class="container">
      <h1>Rakus Noodle</h1>
      <div class="btn-wrapper">
        <div class="btn">
          <router-link to="/login">ログイン画面</router-link>
        </div>
        <div class="btn">
          <router-link to="/registeradmin">登録画面</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
.btn {
  margin: 30px;
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
  opacity: 80%;
}
</style>
