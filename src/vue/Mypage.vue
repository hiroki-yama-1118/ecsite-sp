<template>
  <div class="profile-wrapper">
    <div class="container">
      <div>
        <div class="title"><h1>登録情報</h1></div>
        <div class="user-info">
          <div>お名前：{{ loginUserInfo.name }}</div>
          <div>メールアドレス：{{ loginUserInfo.email }}</div>
          <div>お住まい{{ loginUserInfo.address }}</div>
          <div>電話番号：{{ loginUserInfo.telephone }}</div>
        </div>
      </div>
      <div>
        <div class="history"><h2>注文履歴</h2></div>
        <div class="user-history">
          <table>
            <tr>
              <th>注文ID</th>
              <th>金額</th>
              <th>注文した日付</th>
              <th>お届け状況</th>
            </tr>
            <tr v-for="order of orderHistory" v-bind:key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.totalPrice }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.deliveryTime }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    //store
    const store = useStore();
    //ユーザ情報
    const loginUserInfo = ref([]);
    //注文履歴
    const orderHistory = ref([]);

    loginUserInfo.value = store.getters.getUserAddress;

    //注文一覧を表示する
    const getOrderItem = async () => {
      //ユーザ情報を取得する
      const userId = store.getters.getUserAddress;
      console.log(userId);
      const responce = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/order/orders/noodle/${userId.id}`
      );
      console.dir("responce:" + JSON.stringify(responce));
      orderHistory.value = responce.data.orders;
      console.log(orderHistory.value);
    };
    getOrderItem();

    return {
      loginUserInfo,
      store,
      getOrderItem,
      orderHistory,
    };
  },
});
</script>

<style></style>
