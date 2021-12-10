<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row login-page">
        <div class="col s12 z-depth-6 card-panel">
          <form class="login-form">
            <div class="row title">ログイン情報入力</div>
            <div class="error">
              <div>{{ missError }}</div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <div class="error">{{ mailError }}</div>
                <input type="email" id="mail" v-model="mailAddress" />
                <label for="mail">メールアドレス：</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <div class="error">{{ passError }}</div>
                <input type="password" id="password" v-model="passWord" /><label
                  for="password"
                >
                  パスワード：
                </label>
              </div>
            </div>
            <div class="row login-btn">
              <button type="button" v-on:click="login" class="btn">
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    //メールのエラー
    const mailError = ref("");
    //パスワードのエラー
    const passError = ref("");
    //登録情報と不一致
    const missError = ref("");
    //エラーがあるかどうか
    const isLoginError = ref(false);
    //入力されたメールアドレス
    const mailAddress = ref("");
    //入力されたパスワード
    const passWord = ref("");
    //store
    const store = useStore();
    //router
    const router = useRouter();

    /**
     * ログインをする
     */
    const login = async (): Promise<void> => {
      //エラーチェック
      mailError.value = "";
      passError.value = "";
      missError.value = "";
      isLoginError.value = false;

      //メールアドレスが未入力の場合
      if (mailAddress.value === "") {
        mailError.value = "メールアドレスを入力してください";
        isLoginError.value = true;
      }
      //パスワードが未入力の場合
      if (passWord.value === "") {
        passError.value = "パスワードを入力してください";
        isLoginError.value = true;
      }

      //エラーが一つでもあった場合返す
      if (isLoginError.value == true) {
        return;
      }

      //ログイン情報を送る
      const response = await axios.post(
        `http://153.127.48.168:8080/ecsite-api/user/login`,
        {
          email: mailAddress.value,
          password: passWord.value,
        }
      );
      console.dir("response:" + JSON.stringify(response));

      //ログインに成功したときにstateのログイン状態をONにする
      if (response.data.status === "success") {
        store.commit("inLogin");

        //登録情報をpayloadとしてミューテーションにわたす
        let user = response.data.responseMap.user;
        store.commit("setLoginUser", {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          password: user.password,
          zipecode: user.zipcode,
          telephone: user.telephone,
        });
        if (store.getters.getFromCartList === true) {
          //注文確認画面に遷移する
          router.push("/orderConfirm");
          store.commit("fromCartListOff");
        } else {
          //商品一覧画面に遷移する
          router.push("/itemList");
        }
      }
      //ログインに失敗したとき
      else {
        missError.value = response.data.message;
      }
    };

    return {
      login,
      mailError,
      passError,
      missError,
      isLoginError,
      mailAddress,
      passWord,
    };
  },
});
</script>

<style scoped>
.title {
  text-align: center;
  margin: 10px;
}

.login-page {
  width: 700px;
  padding: 50px;
}

.login-btn {
  text-align: center;
}
.top-wrapper {
  background-color: rgb(215, 247, 153);
}
.error {
  color: red;
}
</style>
