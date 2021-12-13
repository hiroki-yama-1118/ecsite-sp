<template>
  <div>
    <div v-text="count"></div>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);

    const increment = () => (count.value += 1);
    const decrement = () => (count.value -= 1);

    const getApi = async () => {
      const responce = await axios.get(
        "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=1099458889731729230"
      );
      console.dir("responce" + JSON.stringify(responce));
    };
    getApi();

    return {
      count,
      increment,
      decrement,
      getApi,
    };
  },
});
</script>

<style></style>
