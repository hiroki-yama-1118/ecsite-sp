<template>
  <div class="profile-wrapper">
    <div class="container">
      <div>
        <div class="title"><h1>登録情報</h1></div>
        <div class="user-info">
          <div>お名前：{{ loginUserInfo.name }}</div>
          <div>メールアドレス：{{ loginUserInfo.email }}</div>
          <div>お住まい：{{ loginUserInfo.address }}</div>
          <div>電話番号：{{ loginUserInfo.telephone }}</div>
        </div>
      </div>
      <div>
        <div class="history"><h2>注文履歴</h2></div>
        <div class="user-history">
          <table>
            <tr>
              <th class="text-center">注文ID</th>
              <th class="text-center">金額</th>
              <th class="text-center">注文した日付</th>
              <th class="text-center">お届け状況</th>
            </tr>
            <tr
              class="text-center"
              v-for="(order, index) of orderHistory"
              v-bind:key="index"
            >
              <td class="text-center">{{ order.id }}</td>
              <td class="text-center">
                {{ order.totalPrice.toLocaleString() }}円
              </td>
              <td class="text-center">{{ order.orderDate }}</td>
              <td
                class="text-center"
                v-if="passedDeliveryTime(order.deliveryTime)"
              >
                {{ formatDeliveryTime(order.deliveryTime) }}
                <span>にお届け予定</span>
                <span class="cancel">
                  <button
                    type="button"
                    class="btn"
                    v-on:click="doCancel(index)"
                  >
                    キャンセル
                  </button></span
                >
              </td>
              <td
                class="text-center"
                v-if="!passedDeliveryTime(order.deliveryTime)"
              >
                <span>お届け済み</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
import addHours from "date-fns/esm/addHours/index.js";
import { Order } from "../types/order";

export default defineComponent({
  setup() {
    //store
    const store = useStore();
    //ユーザ情報
    const loginUserInfo = ref([]);
    //注文履歴
    const orderHistory = ref(Array<Order>());
    //問い合わせメッセージ
    const inquiryMessage = ref("");

    loginUserInfo.value = store.getters.getUserAddress;

    //注文一覧を表示する
    const getOrderItem = async (): Promise<void> => {
      //ユーザ情報を取得する
      const userId = store.getters.getUserAddress;
      console.log(userId);
      const responce = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/order/orders/noodle/${userId.id}`
      );
      console.dir("responce:" + JSON.stringify(responce));
      orderHistory.value = responce.data.orders;
      console.log(orderHistory.value);

      //配達日時順に並び替える
      orderHistory.value.sort(function (a, b) {
        return a.deliveryTime < b.deliveryTime ? -1 : 1;
      });
    };
    getOrderItem();

    //配送日時のフォーマットを変換する
    const formatDeliveryTime = (date: string) => {
      let deliveryTime = new Date(date);
      return format(deliveryTime, "yyyy/MM/dd HH時");
    };

    //配送日時を過ぎたかどうかのフラグ
    const passedDeliveryTime = (date: string) => {
      let passDeliveryTime = new Date(date);
      let nowTime = new Date();
      if (passDeliveryTime > nowTime) {
        return true;
      } else {
        false;
      }
    };

    //6時間前までなら注文をキャンセルできる
    const canCancel = (date: string) => {
      let deliveryCancelTime = new Date(date);
      let nowTime = new Date();
      if (deliveryCancelTime > addHours(nowTime, 6)) {
        return true;
      } else {
        false;
      }
    };

    //キャンセルする
    const doCancel = (index: number) => {
      console.log("キャンセル");
      orderHistory.value.splice(index, 1);
    };

    return {
      loginUserInfo,
      store,
      getOrderItem,
      orderHistory,
      formatDeliveryTime,
      passedDeliveryTime,
      doCancel,
      inquiryMessage,
      canCancel,
    };
  },
});
</script>

<style scoped>
.container {
  background-color: antiquewhite;
  margin-bottom: 100px;
}
.user-info {
  background-color: aliceblue;
  margin: 30px;
  border-radius: 5%;
  font-size: 20px;
}
.user-history {
  background-color: aliceblue;
  margin: 20px;
}
.text-center {
  text-align: center;
}
.cancel {
  margin: 20px;
}
</style>
