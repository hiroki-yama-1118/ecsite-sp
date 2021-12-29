<template>
  <div class="detail-wrapper">
    <div class="container">
      <div class="page-title item-name">
        <h1>{{ currentItem.name }}</h1>
      </div>
      <div class="row">
        <div class="row item-detail">
          <div class="item-icon">
            <img v-bind:src="currentItem.imagePath" alt="ラーメンの画像" />
          </div>
          <div class="item-intro">{{ currentItem.description }}</div>
        </div>
        <div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <span class="item-price">
              <label>
                <input
                  type="radio"
                  name="price"
                  v-model="size"
                  id="M"
                  value="M"
                  v-on:change="currentPrice"
                /><span class="price">Ｍ&nbsp;</span
                >{{ currentItem.priceM.toLocaleString() }}円</label
              >
            </span>
            <span class="item-price">
              <label>
                <input
                  type="radio"
                  name="price"
                  v-model="size"
                  id="L"
                  value="L"
                  v-on:change="currentPrice"
                /><span class="price">L&nbsp;</span
                >{{ currentItem.priceL.toLocaleString() }}円</label
              >
            </span>
          </div>
        </div>
        <div class="item-toppings">
          <div class="topping-lists">
            <div class="row topping-list">
              <div
                class="item-topping"
                v-for="topping of currentItem.toppingList"
                v-bind:key="topping.id"
              >
                <label class="item-topping">
                  <input
                    type="checkbox"
                    v-model="toppingIds"
                    v-bind:value="topping.id"
                    v-on:change="currentPrice"
                  />
                  <span class="only-topping"> {{ topping.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select
                  class="browser-default"
                  v-model="quantity"
                  v-on:change="currentPrice"
                >
                  <option value="0">選択してください</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row item-total-price">
            <div class="total-price">
              合計金額：{{ totalPrice.toLocaleString() }}円
            </div>
          </div>
          <div class="row item-cart-btn">
            <button type="button" class="btn" v-on:click="onClickAddCart">
              カートに入れる
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { Item } from "../types/item";
import { Topping } from "../types/topping";
import { OrderTopping } from "../types/orderTopping";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { OrderItem } from "../types/orderItem";

export default defineComponent({
  setup() {
    //商品の合計金額
    const totalItemPrice = ref(0);
    //トッピングの合計金額
    const totalToppingPrice = ref(0);
    //合計金額
    const totalPrice = ref(0);
    //商品のサイズ
    const size = ref("M");
    //商品の数量
    const quantity = ref(1);
    //this.を用いずにstoreを使用するため
    const store = useStore();
    //this.を用いずにrouterを使用するため
    const router = useRouter();
    //this.を用いずにrouteを使用するため
    const route = useRoute();
    //選択したトッピングリスト
    const toppingIds = ref([]);
    //Topping型の選択したトッピング
    const checkToppings = ref(new Array<Topping>());
    //OrderTopping型の選択したトッピング
    const orderToppings = ref(new Array<OrderTopping>());
    //Itemオブジェクト作成
    const currentItem = ref(
      new Item(
        0,
        "XXXX",
        "XXXX",
        "XXXX",
        0,
        0,
        "/img_noodle/noImage.png",
        true,
        []
      )
    );
    /**
     * 外部APIからparamsで指定した商品詳細情報を取得
     */
    const getItemDetail = async (): Promise<void> => {
      const itemId = route.params.id;
      const response = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
      );
      console.dir("response" + JSON.stringify(response));
      currentItem.value = new Item(
        response.data.item.id,
        response.data.item.type,
        response.data.item.name,
        response.data.item.description,
        response.data.item.priceM,
        response.data.item.priceL,
        response.data.item.imagePath,
        response.data.item.deleted,
        response.data.item.toppingList
      );
      totalPrice.value = currentItem.value.priceM;
    };
    getItemDetail();

    /**
     * 金額のリアルタイム表示
     */
    const currentPrice = () => {
      if (size.value === "M") {
        totalItemPrice.value = currentItem.value.priceM * quantity.value;
        totalToppingPrice.value =
          toppingIds.value.length *
          currentItem.value.toppingList[0].priceM *
          quantity.value;
        totalPrice.value = totalItemPrice.value + totalToppingPrice.value;
      } else {
        totalItemPrice.value = currentItem.value.priceL * quantity.value;
        totalToppingPrice.value =
          toppingIds.value.length *
          currentItem.value.toppingList[0].priceL *
          quantity.value;
        totalPrice.value = totalItemPrice.value + totalToppingPrice.value;
      }
    };
    /**
     * カートに商品を追加する
     */
    const onClickAddCart = () => {
      checkToppings.value = [];
      orderToppings.value = [];
      console.log("選択したトッピングID" + toppingIds.value);
      //トッピングが１件もない場合
      if (toppingIds.value.length === 0) {
        checkToppings.value.push(new Topping(-1, "0", "トッピングなし", 0, 0));
      }
      //選択したトッピングをトッピング型の配列に格納
      else {
        for (let toppingId of toppingIds.value) {
          for (let currentItemToppingList of currentItem.value.toppingList)
            if (toppingId === currentItemToppingList.id) {
              checkToppings.value.push(currentItemToppingList);
            }
        }
      }
      //トッピング型の配列をオーダートッピング型の配列に格納
      for (let checkTopping of checkToppings.value) {
        orderToppings.value.push(
          new OrderTopping(
            -1,
            checkTopping.id,
            currentItem.value.id,
            checkTopping
          )
        );
      }
      //選択した商品をpayloadとしてミューテーションにわたす
      store.commit(
        "addItemInCart",
        new OrderItem(
          -1,
          currentItem.value.id,
          -1,
          quantity.value,
          size.value,
          new Item(
            currentItem.value.id,
            currentItem.value.type,
            currentItem.value.name,
            currentItem.value.description,
            currentItem.value.priceM,
            currentItem.value.priceL,
            currentItem.value.imagePath,
            currentItem.value.deleted,
            currentItem.value.toppingList
          ),
          orderToppings.value
        )
      );
      //ゲッター経由でカート内の情報を取得
      currentItem.value = store.getters.getItemInCart;
      console.log(currentItem);
      //ショッピングカート画面に遷移する
      router.push("/shoppingCart");
    };

    return {
      route,
      currentItem,
      getItemDetail,
      onClickAddCart,
      toppingIds,
      checkToppings,
      orderToppings,
      size,
      quantity,
      currentPrice,
      totalPrice,
    };
  },
});
</script>

<style scoped>
.item-price {
  font-size: 30px;
  background-color: whitesmoke;
}
.total-price {
  background-color: yellow;
  margin: auto;
  width: 500px;
  color: red;
}
.item-hedding {
  font-size: 30px;
}
.item-icon {
  margin: 10px;
}
.item-icon img {
  border-radius: 5%;
  display: block;
  width: 350px;
  height: 350px;
}
.item-intro {
  width: 400px;
  margin: 10px;
  display: table-cell;
  vertical-align: middle;
  background-color: whitesmoke;
  border-radius: 5%;
  font-size: 20px;
}
.only-topping {
  margin: 3px;
}
.topping-lists {
  display: table;
  padding: 500px;
  margin: auto;
  padding: 5px;
}
.topping-list {
  display: table-cell;
  vertical-align: middle;
  background-color: whitesmoke;
}
.item-topping {
  display: inline;
  text-align: left;
  padding: auto;
}
.item-detail {
  justify-content: center;
  display: table;
}
.item-name {
  display: inline-block;
  text-align: center;
}
.container {
  position: relative;
  text-align: center;
  background-color: lightblue;
  margin-bottom: 100px;
  border-radius: 5%;
}
.page-title {
  margin-top: 20px;
}
.item-quantity {
  font-size: 15px;
  text-align: center;
}
.browser-default {
  width: 300px;
  margin: auto;
  text-align: right;
}
.item-quantity-selectbox {
  padding: 0, 300px, 0;
}
.item-total-price {
  font-size: 35px;
  text-align: center;
}
.item-cart-btn {
  text-align: center;
}
</style>
