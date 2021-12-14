<template>
  <div class="cart-list">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">ショッピングカート</h1>

        <div class="row" v-if="noItem">
          <div class="no-item">ショッピングカートに商品がはいっていません</div>
          <div class="message-wrapper">
            <div class="no-item-container">
              <pre class="message">
            現在、買い物かごには商品が入っていません。ぜひお買い物をお楽しみください。
            ご利用をお待ちしております。<router-link to="/ecsite">
                <i class="fas">
                トップページはこちら</i>
              </router-link>
           </pre>
            </div>
          </div>
        </div>

        <!-- table要素 -->
        <div class="row" v-if="!noItem">
          <table class="striped">
            <thead>
              <tr>
                <th class="table-title">商品名</th>
                <th class="table-title">サイズ・価格・数量</th>
                <th class="table-title">トッピング・価格</th>
                <th class="table-title">数量変更</th>
                <th class="table-title">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(currentCartItem, index) of currentCartItems"
                v-bind:key="index"
              >
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <img v-bind:src="currentCartItem.item.imagePath" />
                  </div>
                  <div class="item-name">{{ currentCartItem.item.name }}</div>
                </td>
                <td class="size-price-quantity">
                  {{ currentCartItem.size }}：
                  {{ currentCartItem.itemPrice.toLocaleString() }}円
                  {{ currentCartItem.quantity }}個
                </td>
                <td>
                  <div
                    v-for="topping of currentCartItem.orderToppingList"
                    v-bind:key="topping.id"
                    class="topping-price"
                  >
                    <li class="text-center">
                      {{ topping.topping.name }}：
                      {{ currentCartItem.toppingPrice.toLocaleString() }}円
                    </li>
                  </div>
                </td>
                <td>
                  <div class="text-center">
                    {{ currentCartItem.calcSubTotalPrice.toLocaleString() }}円
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn"
                    v-on:click="onDeleteItem(index)"
                  >
                    削除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row cart-table-price" v-if="!noItem">
          <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
          <div>ご注文金額合計{{ totalPriceInTax.toLocaleString() }}円</div>
        </div>
        <div class="row order-confirm-btn" v-if="!noItem">
          <button v-bind="button" class="btn" v-on:click="onGoOrder">
            注文に進む
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { OrderItem } from "../types/orderItem";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Item } from "../types/item";
export default defineComponent({
  setup() {
    //storeを使用するため
    const store = useStore();
    //routerを使用するため
    const router = useRouter();
    //合計金額
    const totalPriceInTax = ref(0);
    //消費税の合計金額
    const taxPrice = ref(0);
    //ショッピングカート内の商品
    let currentCartItems = ref(Array<OrderItem>());
    //ショッピングカート内の有無
    const noItem = ref(false);
    //数量変更
    const quantity = ref(1);
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

    //カートに入っている商品情報をストアから取得
    const getCurrentCartItem = () => {
      currentCartItems.value = store.getters.getItemInCart;
      console.dir(JSON.stringify(currentCartItems));
      //カートに商品がない場合にフラグを立てる
      if (currentCartItems.value.length === 0) {
        noItem.value = true;
      }

      //合計金額の計算
      for (let currentCartItem of currentCartItems.value) {
        totalPriceInTax.value += currentCartItem.calcSubTotalPrice;
      }
      const tax = 0.1;
      taxPrice.value = Math.floor(totalPriceInTax.value * tax);
    };
    getCurrentCartItem();

    //カートの商品を削除する
    const onDeleteItem = (index: number) => {
      store.commit("deleteItem", index);
      //カートに商品がない場合にフラグを立てる
      if (currentCartItems.value.length === 0) {
        noItem.value = true;
      }
      //合計金額の計算
      totalPriceInTax.value = 0;
      for (let currentCartItem of currentCartItems.value) {
        totalPriceInTax.value += currentCartItem.calcSubTotalPrice;
      }
      const tax = 0.1;
      taxPrice.value = Math.floor(totalPriceInTax.value * tax);
    };
    //注文画面へ画面遷移
    const onGoOrder = () => {
      if (store.getters.getLoginStatus === false) {
        //カートからログイン画面に遷移したフラグ
        store.commit("fromCartList");
        //ログインしていなければログイン画面に遷移
        router.push("/login");
      } else {
        //ログインしていれば注文確認画面に遷移
        router.push("/orderConfirm");
      }
    };

    return {
      currentCartItems,
      getCurrentCartItem,
      totalPriceInTax,
      taxPrice,
      onGoOrder,
      onDeleteItem,
      noItem,
      quantity,
    };
  },
});
</script>

<style scoped>
.striped {
  background-color: azure;
}
.container {
  margin-bottom: 100px;
}
.table-title {
  text-align: center;
}
.item-name {
  text-align: center;
  font-weight: 700;
}
.cart-item-icon img {
  width: 100px;
  height: 100px;
  border-radius: 10%;
}
.cart-item-name {
  text-align: center;
}
.size-price-quantity {
  text-align: center;
}
.topping-price {
  text-align: center;
}
.text-center {
  text-align: center;
}
.cart-table-price {
  font-size: 30px;
  color: red;
}
.no-item {
  color: red;
  font-weight: 800;
  font-size: 20px;
}
.message {
  text-align: left;
}
.no-item-container {
  background-color: seashell;
  height: 80px;
  text-align: center;
}
.fas {
  color: blue;
}
</style>
