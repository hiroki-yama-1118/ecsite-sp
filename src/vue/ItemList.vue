<template>
  <div class="item-list">
    <div class="container">
      <!-- item list -->
      <div class="item-wrapper">
        <h1>商品一覧</h1>
        <div class="items">
          <div class="item" v-for="item of itemList" v-bind:key="item.id">
            <span class="item-icon">
              <router-link :to="'/itemDetail/' + item.id">
                <span class="noodle">{{ item.name }}</span></router-link
              >
              <router-link :to="'/itemDetail/' + item.id">
                <img
                  v-bind:src="item.imagePath"
                  alt="ラーメンの画像" /></router-link
            ></span>
            <div class="price">
              サイズ：
              <span class="size">&nbsp;M&nbsp;</span
              >{{ item.priceM.toLocaleString() }}円&nbsp;&nbsp; サイズ：
              <span class="size">&nbsp;L&nbsp;</span
              >{{ item.priceL.toLocaleString() }}円
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "../types/item";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    //storeを使用するため
    const store = useStore();
    //Item型の配列
    const itemList = ref(Array<Item>());
    //商品数
    const itemCount = ref(0);

    /**
     * アクションを通して外部APIからデータを取得してゲッター経由で商品情報を取得
     */
    const getItem = async (): Promise<void> => {
      await store.dispatch("getItemList");
      itemList.value = store.getters.getAllItems;

      itemCount.value = store.getters.getAllItemCount;
    };
    getItem();

    return { store, itemList };
  },
});
</script>

<style scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  flex: 0 0 320px;
  padding: 20px;
  border: solid 0.5px;
  border-radius: 20px;
  margin: 5px;
  background-color: rgb(223, 219, 219);
}
.noodle:hover {
  color: blue;
}
.item-icon img {
  margin: auto;
  display: block;
  border-radius: 100px;
  width: 250px;
  height: 250px;
  padding: 15px;
}
.item-icon:hover img {
  transform: scale(1.1, 1.1);
}
.noodle {
  font-size: 15px;
}
.size {
  background-color: coral;
  border-radius: 50%;
}
</style>
