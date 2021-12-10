<template>
  <div></div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    //store
    const store = useStore();
    //router
    const router = useRouter();

    //ログインしていなければログイン画面へ画面遷移
    if (store.getters.getLoginStatus === false) {
      router.push("/login");
      return;
    }
    //ログアウトする
    const logout = async (): Promise<void> => {
      store.commit("inLogout");
      //ログアウトするまで画面遷移せず
      await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
      router.push("/itemList");
    };
    logout();

    return {
      logout,
    };
  },
});
</script>

<style></style>
