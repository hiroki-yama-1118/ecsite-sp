<template>
  <header class="top-wrapper">
    <router-link to="/ecSite">
      <img class="logo" src="/img_noodle/header_logo.png"
    /></router-link>
    <div class="header-right">
      <router-link to="/ecsite">
        <i class="fas"></i>
        TOP
      </router-link>
      ｜
      <router-link to="/registerAdmin">
        <i class="fas"></i>
        会員登録
      </router-link>
      ｜
      <router-link to="/itemList">
        <i class="fas"></i>
        商品一覧</router-link
      >
      ｜
      <router-link to="/shoppingCart"> <i class="fas"></i>カート</router-link>
      ｜
      <router-link to="/login" v-bind:key="log" v-if="!isLogin">
        <i class="fas"></i>ログイン</router-link
      >

      <!-- モーダル表示 -->
      <div id="app">
        <div>
          <span v-if="isLogin">
            <button type="button" class="logout" v-on:click="openModal">
              ログアウト
            </button>
          </span>
        </div>
        <div id="overlay" v-show="showContent" v-on:click="closeModal">
          <div id="content">
            <p>本当にログアウトしますか？</p>
            <button type="button" class="btn" v-on:click="onLogout">
              ログアウトをする
            </button>
            <button type="button" class="btn" v-on:click="closeModal">
              close
            </button>
          </div>
        </div>
      </div>
      <!-- end modal -->
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const showContent = ref(false);
    //ログイン状態を取得
    const isLogin = computed(() => {
      return store.getters.getLoginStatus;
    });
    //モーダル画面を非表示
    const closeModal = () => {
      showContent.value = false;
      console.log(showContent.value);
    };
    //モーダル画面を表示
    const openModal = () => {
      showContent.value = true;
      console.log(showContent.value);
    };
    //ログアウトをする
    const onLogout = () => {
      router.push("/logout");
      showContent.value = false;
      return;
    };

    return {
      isLogin,
      onLogout,
      openModal,
      closeModal,
      showContent,
    };
  },
});
</script>

<style scoped>
.header-right {
  text-align: right;
  margin: 0 10px;
  padding: 0 50px;
  display: flex;
}
.top-wrapper {
  display: flex; /*全て横並びにする*/
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  /* position: fixed; スクロールしても表示されるように位置を固定 */
}

.logo {
  width: 200px;
  margin-top: 0;
  padding: 10px;
}

.fas {
  margin-right: 5px;
}
#overlay {
  /* 要素を重ねたときの順番 */
  z-index: 1;
  /* 画面全体を覆う */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: white;
  border-radius: 2%;
}
.btn {
  margin: 5px;
}

</style>
