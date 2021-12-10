import axios from "axios";
import { createStore } from "vuex";
import { Item } from "@/types/item";
import { OrderItem } from "@/types/orderItem";

export default createStore({
  state: {
    //Item型の配列
    items: new Array<Item>(),
    //商品数
    totalItemCount: 0,
    //ショッピングカートに追加された商品
    itemsInCarts: new Array<OrderItem>(),
    //ログイン状態(fale=ログアウト状態)
    isLogin: false,
    //user
    user: [],
    //カートリストからログイン画面に行ったときにtrueにする
    fromCartList: false,
  },
  mutations: {
    //actions経由で取得した情報をstateのItemオブジェクトにプッシュする
    showItemList(state, payload) {
      state.totalItemCount = payload.totalItemCount;
      state.items = new Array<Item>();
      for (const item of payload.items) {
        state.items.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.discription,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleted,
            item.toppingList
          )
        );
      }
    },
    //ログイン情報をセットする
    setLoginUser(state, payload) {
      state.user = payload;
    },
    //ログイン状態をONにする
    inLogin(state) {
      state.isLogin = true;
    },
    //ログアウトする
    inLogout(state) {
      state.isLogin = false;
    },
    //商品をカートに追加する
    addItemInCart(state, payload) {
      state.itemsInCarts.push(payload);
    },
    //カートの商品を削除する
    deleteItem(state, payload) {
      state.itemsInCarts.splice(payload, 1);
    },
    //ショッピングカートからログイン画面に行くときにtureにする
    fromCartList(state) {
      state.fromCartList = true;
    },
    //ショッピングカート画面からログインしたときにfalseにする
    fromCartListOff(state) {
      state.fromCartList = false;
    },
  },
  actions: {
    //外部APIから情報を取得し、payloadとしてmutationsにわたす
    async getItemList(context) {
      const response = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/item/items/noodle`
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  modules: {},
  getters: {
    //stateの商品情報を返す
    getAllItems(state) {
      return state.items;
    },
    //stateの商品数を返す
    getAllItemCount(state) {
      return state.items.length;
    },
    //ショッピングカートに追加された商品を返す
    getItemInCart(state) {
      return state.itemsInCarts;
    },
    //ログイン状態を返す
    getLoginStatus(state) {
      return state.isLogin;
    },
    //ユーザ情報を返す
    getUserAddress(state) {
      return state.user;
    },
    //カートからログイン画面に遷移したかどうかのフラグ
    getFromCartList(state) {
      return state.fromCartList;
    },
  },
});
