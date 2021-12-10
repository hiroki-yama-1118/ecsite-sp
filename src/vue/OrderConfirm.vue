<template>
  <div class="order-confirm">
    <div class="top-wrapper">
      <div class="container">
        <h1>注文内容確認画面</h1>
        <!-- table要素 -->
        <table class="striped">
          <thead>
            <tr>
              <th class="table-title">商品名</th>
              <th class="table-title">サイズ・価格・数量</th>
              <th class="table-title">トッピング・価格</th>
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
            </tr>
          </tbody>
        </table>
        <hr />
        <div class="row cart-table-price">
          <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
          <div>ご注文金額合計{{ totalPriceInTax.toLocaleString() }}円</div>
        </div>
        <hr />
        <!-- <h2>お届け先情報</h2> -->
        <h2>お届け先情報</h2>
        <div class="order-confirm-delivery-info">
          <div class="row">
            <div class="input-field col s8">
              <div class="error">{{ errorName }}</div>
              <label for="name" :class="{ active: distinationName }"
                >お名前：</label
              ><input type="text" id="name" v-model="distinationName" />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <div class="error">{{ errorEmail }}</div>
              <label for="email" :class="{ active: distinationMail }">
                メールアドレス：</label
              ><input type="email" id="email" v-model="distinationMail" />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <div class="error">{{ zipcodeError }}</div>
              <label for="zepcode" :class="{ active: zipcode }">
                郵便番号：</label
              ><input
                type="text"
                id="zepcode"
                v-model="zipcode"
                maxlength="7"
              />
              <button type="button" class="btn" v-on:click="searchAddress">
                住所検索
              </button>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <div class="error">{{ errorAddress }}</div>
              <label for="address" :class="{ active: address }"> 住所：</label
              ><input type="text" id="address" v-model="address" />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <div class="error">{{ errorTell }}</div>
              <label for="tell" :class="{ active: distinationTel }">
                電話番号：</label
              ><input type="text" id="tell" v-model="distinationTel" />
            </div>
          </div>
          <div class="row order-confirm-delivery-datetime">
            <div class="input-field col s12">
              <div class="error">{{ errorDeliveryDate }}</div>
              <input
                type="date"
                id="deliveryDate"
                v-model="deliveryDate"
              /><label for="deliveryDate"> 配達日時：</label>
            </div>
            <div>
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="10"
                  v-model="deliveryTime"
                /><span>10時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="11"
                  v-model="deliveryTime"
                /><span>11時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="12"
                  v-model="deliveryTime"
                /><span>12時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="13"
                  v-model="deliveryTime"
                /><span>13時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="14"
                  v-model="deliveryTime"
                /><span>14時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="15"
                  v-model="deliveryTime"
                /><span>15時</span></label
              >
              <label class="order-confirm-delivery-time">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="16"
                  v-model="deliveryTime"
                /><span>16時</span></label
              >
            </div>
          </div>
        </div>
        <h2>お支払い方法</h2>
        <label>
          <input type="radio" name="payment" v-model="cash" value="cash" /><span
            >現金払い</span
          >
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            v-model="credit"
            value="credit"
          /><span>クレジットカード</span>
        </label>
        <!-- モーダル表示 -->
        <div id="app">
          <div>
            <button type="button" class="btn" v-on:click="openModal">
              この内容で注文する
            </button>
          </div>
          <div id="overlay" v-show="showContent" v-on:click="closeModal">
            <div id="content">
              <p>注文を確定しますか？</p>
              <button type="button" class="btn" v-on:click="onOrder">
                注文を確定する
              </button>
              <button type="button" class="btn" v-on:click="closeModal">
                close
              </button>
            </div>
          </div>
        </div>
        <!-- end modal -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { OrderItem } from "../types/orderItem";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import addHours from "date-fns/esm/addHours";
// import { User } from "../types/user";

export default defineComponent({
  setup() {
    //routerを使用するため
    const router = useRouter();
    //storeを使用するため
    const store = useStore();
    //住所
    const address = ref("");
    //郵便番号
    const zipcode = ref("");
    //住所が存在しない場合のエラー
    const zipcodeError = ref("");
    //合計金額
    const totalPriceInTax = ref(0);
    //消費税の合計金額
    const taxPrice = ref(0);
    //ショッピングカート内の商品
    let currentCartItems = ref(Array<OrderItem>());
    //モーダル表示
    let showContent = ref(false);
    //お名前
    const distinationName = ref("");
    //メールアドレス
    const distinationMail = ref("");
    //電話番号
    const distinationTel = ref("");
    //名前のエラー
    const errorName = ref("");
    //メールアドレスのエラー
    const errorEmail = ref("");
    //住所のエラー
    const errorAddress = ref("");
    //電話番号のエラー
    const errorTell = ref("");
    //住所情報のチェック
    const noAddress = ref(false);
    //配達日時のエラー
    const errorDeliveryDate = ref("");
    //配達日時
    const deliveryDate = ref("");
    //配達時間
    const deliveryTime = ref("");

    //カートに入っている商品情報をストアから取得
    const getCurrentCartItem = () => {
      currentCartItems.value = store.getters.getItemInCart;
      console.dir(JSON.stringify(currentCartItems));
      //合計金額の計算
      for (let currentCartItem of currentCartItems.value) {
        totalPriceInTax.value += currentCartItem.calcSubTotalPrice;
      }
      const tax = 0.1;
      taxPrice.value = Math.floor(totalPriceInTax.value * tax);
    };
    getCurrentCartItem();

    //お届け先情報に情報を自動入力する
    const getAddless = () => {
      let currentUserAddress = store.getters.getUserAddress;
      //ログイン情報を入力欄に表示
      distinationName.value = currentUserAddress.name;
      distinationMail.value = currentUserAddress.email;
      distinationTel.value = currentUserAddress.telephone;
      zipcode.value = currentUserAddress.zipecode;
      address.value = currentUserAddress.address;
    };
    getAddless();

    /**
     * 住所検索機能
     */
    const searchAddress = async (): Promise<void> => {
      zipcodeError.value = "";
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const axiosJsonpAdapter = require("axios-jsonp");
        const response = await axios.get("https://zipcoda.net/api", {
          adapter: axiosJsonpAdapter,
          params: {
            zipcode: zipcode.value,
          },
        });
        console.log(response);
        //検索した住所が存在しない場合
        if (response.data.items.length != 1) {
          zipcodeError.value = "存在しない番号です";
          return;
        }
        address.value =
          response.data.items[0].pref + response.data.items[0].address;
      } catch {
        zipcodeError.value = "存在しない番号です";
      }
    };

    //モーダル画面を閉じる
    const closeModal = () => {
      showContent.value = false;
    };
    //日付情報を取得
    const getDate = () => {
      console.log("getDate呼ばれた");
      let deliveryDates = new Date(deliveryDate.value);
      let daliveryDateTime = new Date(
        deliveryDates.getFullYear(),
        deliveryDates.getMonth(),
        deliveryDates.getDate(),
        Number(deliveryTime.value)
      );
      console.log(deliveryDates);
      console.log(daliveryDateTime);

      let nowTime = new Date();
      console.log(nowTime);
      if (daliveryDateTime < addHours(nowTime, 3)) {
        console.log("おおおおおお");
        console.log(addHours(nowTime, 3));
        errorDeliveryDate.value = "今から３時間後の時間を指定してください";
        console.log("かかかかっか");

        return;
      }
    };

    /**
     * 注文を確定するボタンをクリック
     */
    const openModal = () => {
      //エラーがあれば先に進まない
      if (hasError()) {
        return;
      }
      //入力した日付情報を取得
      let deliveryDates = new Date(deliveryDate.value);
      //指定した時間情報を取得
      let daliveryDateTime = new Date(
        deliveryDates.getFullYear(),
        deliveryDates.getMonth(),
        deliveryDates.getDate(),
        Number(deliveryTime.value)
      );
      //今日の日付情報を取得
      let nowTime = new Date();
      //今から3時間後でなければエラー表示
      if (daliveryDateTime < addHours(nowTime, 3)) {
        errorDeliveryDate.value = "今から３時間後の時間を指定してください";
        return;
      }
      //注文完了画面に画面遷移する
      showContent.value = true;
    };
    //モーダル画面から注文完了画面に遷移
    const onOrder = () => {
      router.push("/orderFinished");
    };

    //お届け先情報にエラーがある場合はエラー表示
    const hasError = (): boolean => {
      noAddress.value = false;
      errorName.value = "";
      errorEmail.value = "";
      errorAddress.value = "";
      errorTell.value = "";
      zipcodeError.value = "";
      errorDeliveryDate.value = "";

      if (distinationName.value === "") {
        errorName.value = "お名前を入力してください";
        noAddress.value = true;
      }
      if (distinationMail.value === "") {
        errorEmail.value = "メールアドレスを入力してください";
        noAddress.value = true;
      }
      if (zipcode.value === "") {
        zipcodeError.value = "郵便番号を入力してください";
        noAddress.value = true;
      }
      if (address.value === "") {
        errorAddress.value = "住所を入力してください";
        noAddress.value = true;
      }
      if (distinationTel.value === "") {
        errorTell.value = "電話番号を入力してください";
        noAddress.value = true;
      }
      if (deliveryTime.value === "" || deliveryDate.value === "") {
        errorDeliveryDate.value = "時間を指定してください";
        noAddress.value = true;
      }
      if (noAddress.value === true) {
        showContent.value = false;
      }
      return noAddress.value;
    };

    return {
      address,
      searchAddress,
      zipcode,
      zipcodeError,
      currentCartItems,
      getCurrentCartItem,
      totalPriceInTax,
      taxPrice,
      openModal,
      closeModal,
      showContent,
      onOrder,
      getAddless,
      distinationName,
      distinationMail,
      distinationTel,
      noAddress,
      errorName,
      errorEmail,
      errorAddress,
      errorTell,
      errorDeliveryDate,
      getDate,
      deliveryDate,
      deliveryTime,
    };
  },
});
</script>

<style scoped>
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
.striped {
  background-color: azure;
}
.table-title {
  text-align: center;
}
.cart-item-name {
  text-align: center;
}
.cart-item-icon img {
  width: 100px;
  height: 100px;
  border-radius: 10%;
}
.item-name {
  text-align: center;
  font-weight: 700;
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
.container {
  margin-bottom: 100px;
}
.order-confirm-delivery-info {
  background-color: rgb(237, 233, 233);
  margin: 50px;
  padding: 50px;
  border-radius: 5%;
}
.error {
  color: red;
}
</style>
