<template>
  <div class="top-wrapper">
    <h1>注文完了画面</h1>
    <button type="button" class="btn" v-on:click="onReItemList">
      商品一覧に戻る
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    //routerを使用するため
    const router = useRouter();

    const onReItemList = () => {
      router.push("/itemList");
    };
    return {
      onReItemList,
    };
  },
});
</script>

<style></style>
