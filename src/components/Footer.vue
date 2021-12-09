<template>
  <footer class="top">
    <div class="footer">
      <div class="footer-left">
        <router-link to="/ecSite">
          <img class="logo" src="/img_noodle/header_logo.png"
        /></router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
.top {
  display: flex; /*全て横並びにする*/
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  margin: 0;
  padding: auto;
}
.logo {
  width: 200px;
  margin-top: 0;
  padding: 10px;
}
.footer-left {
  text-align: left;
}
</style>
