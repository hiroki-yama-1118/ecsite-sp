/* eslint-disable @typescript-eslint/no-var-requires */
<template>
  <div class="register-user">
    <div class="container">
      <h1>会員登録</h1>
      <div class="row register-page">
        <div class="row">
          <div class="input-field col s6">
            <div class="error">
              {{ lastNameError }}
            </div>
            <label for="lastName"> 姓：</label
            ><input type="text" id="lastName" v-model="lastName" />
          </div>
          <div class="input-field col s6">
            <div class="error">
              {{ firstNameError }}
            </div>
            <label for="firstName"> 名：</label
            ><input type="text" id="firstName" v-model="firstName" />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <div class="error">
              {{ mailError }}
            </div>
            <label for="mail"> メールアドレス：</label
            ><input type="email" id="mail" v-model="mail" />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <div class="error">
              {{ zipcodeError }}
            </div>
            <label for="zepcode"> 郵便番号：</label
            ><input type="text" id="zepcode" v-model="zipcode" maxlength="7" />

            <button type="button" v-on:click="searchAddress" class="btn">
              住所検索
            </button>
          </div>
          <div class="input-field col s12">
            <div class="error">
              {{ addressError }}
            </div>
            <label for="address"> 住所：</label
            ><input type="text" id="address" v-model="address" />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <div class="error">
              {{ telError }}
            </div>
            <label for="tel"> 電話番号：</label
            ><input type="text" id="tel" v-model="tel" />
          </div>
          <div class="row">
            <div class="input-field col s12">
              <div class="error">
                {{ passError }}
              </div>
              <label for="pass"> パスワード：</label
              ><input type="password" id="pass" v-model="pass" />
            </div>
            <div class="row">
              <div class="input-field col s12">
                <div class="error">
                  {{ rePassError }}
                </div>
                <label for="rePass"> 確認用パスワード：</label
                ><input type="password" id="rePass" v-model="rePass" />
              </div>
            </div>
            <div class="error">
              {{ registerError }}
            </div>
            <button type="button" class="btn" v-on:click="admin">登録</button>
            <button type="button" class="btn" v-on:click="clear">クリア</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    //住所
    const address = ref("");
    //郵便番号
    const zipcode = ref("");
    //姓
    const lastName = ref("");
    //名
    const firstName = ref("");
    //メールアドレス
    const mail = ref("");
    //電話番号
    const tel = ref("");
    //パスワード
    const pass = ref("");
    //確認用パスワード
    const rePass = ref("");
    //姓エラー
    const lastNameError = ref("");
    //名エラー
    const firstNameError = ref("");
    //メールアドレスエラー
    const mailError = ref("");
    //郵便番号エラー
    const zipcodeError = ref("");
    //住所エラー
    const addressError = ref("");
    //電話番号エラー
    const telError = ref("");
    //パスワードエラー
    const passError = ref("");
    //確認用パスワードエラー
    const rePassError = ref("");
    //会員登録のエラー
    const registerError = ref("");
    //エラーの有無
    let isError = ref(false);
    //router
    const router = useRouter();

    //登録ボタンを押したときのメソッド
    const admin = async (): Promise<void> => {
      lastNameError.value = "";
      firstNameError.value = "";
      mailError.value = "";
      addressError.value = "";
      telError.value = "";
      passError.value = "";
      rePassError.value = "";
      zipcodeError.value = "";
      isError.value = false;
      /**
       * エラーチェック処理
       */
      if (lastName.value === "") {
        lastNameError.value = "姓を入力してください";
        isError.value = true;
      }
      if (firstName.value === "") {
        firstNameError.value = "名を入力してください";
        isError.value = true;
      }
      if (mail.value === "") {
        mailError.value = "メールアドレスを入力してください";
        isError.value = true;
      }
      if (tel.value === "") {
        telError.value = "電話番号を入力してください";
        isError.value = true;
      }
      if (address.value === "") {
        addressError.value = "住所を入力してください";
        isError.value = true;
      }
      if (zipcode.value === "") {
        zipcodeError.value = "郵便番号を入力してください";
        isError.value = true;
      }
      if (pass.value === "") {
        passError.value = "パスワードを入力してください";
        isError.value = true;
      }
      if (rePass.value === "") {
        rePassError.value = "確認用パスワードを入力してください";
        isError.value = true;
      }
      if (pass.value !== rePass.value) {
        rePassError.value = "確認用パスワードが一致していません";
        isError.value = true;
      }
      //エラーが一つもなかったら返す
      if (isError.value === true) {
        return;
      }

      /**
       * 会員情報を登録する
       */
      const response = await axios.post(
        `http://153.127.48.168:8080/ecsite-api/user`,
        {
          name: firstName.value + " " + lastName.value,
          email: mail.value,
          zipcode: zipcode.value,
          address: address.value,
          telephone: tel.value,
          password: pass.value,
        }
      );
      console.dir("response:" + JSON.stringify(response));
      if (response.data.status === "success") {
        //successが返ってくればログイン画面に遷移する
        router.push("/login");
      } //失敗ならばエラーメッセージを表示する
      else {
        registerError.value =
          "登録できませんでした(" + response.data.message + ")";
      }
    };
    /**
     * 入力をクリアする
     */
    const clear = () => {
      address.value = "";
      zipcode.value = "";
      zipcodeError.value = "";
      firstNameError.value = "";
      lastNameError.value = "";
      telError.value = "";
      mailError.value = "";
      addressError.value = "";
      passError.value = "";
      rePassError.value = "";
      firstName.value = "";
      lastName.value = "";
      tel.value = "";
      mail.value = "";
      pass.value = "";
      rePass.value = "";
    };

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

    return {
      address,
      searchAddress,
      zipcode,
      zipcodeError,
      admin,
      firstNameError,
      lastNameError,
      telError,
      mailError,
      addressError,
      passError,
      rePassError,
      firstName,
      lastName,
      tel,
      mail,
      pass,
      rePass,
      clear,
      registerError,
    };
  },
});
</script>

<style scoped>
.input-field {
  text-align: left;
}
.error {
  text-align: center;
  color: red;
}
.btn {
  margin: 10px;
}
.container {
  width: 800px;
  margin-bottom: 100px;
}
.register-page {
  text-align: center;
  width: 700px;
  background-color: rgb(242, 247, 234);
  border-radius: 5%;
  border: dashed 3px green;
  padding: 20px;
}
</style>
