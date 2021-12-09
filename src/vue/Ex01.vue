<template>
  <div>
    <div v-text="count"></div>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);

    const increment = () => (count.value += 1);
    const decrement = () => (count.value -= 1);
    
    return {
      count,
      increment,
      decrement,
    };
  },
});
</script>

<style></style>
