<template>
  <section class="login-block">
    <v-container class="mxw1200">
      <v-row>
        <v-col class="head">
          <h1>{{ $t("loginBlock.headAuth") }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="loginForm">
          <v-form
            class="loginForm__form"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              class="field"
              v-model="tabNumber"
              name="tabNumber"
              :label="`${$t('loginBlock.form.tabNumber')}`"
              required
              outlined
            ></v-text-field>
            <v-text-field
              class="field"
              v-model="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              name="password"
              :label="`${$t('loginBlock.form.password')}`"
              @click:append="showPass = !showPass"
              outlined
            ></v-text-field>
            <div class="btn-field">
              <v-btn color="warning" @click="sendHandler" large>
                {{ $t("loginBlock.form.submit") }}
              </v-btn>
              <span class="Error">{{ errorStr }}</span>
            </div>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="loginForm">
          <router-link to="/forget">
            <span>{{ $t("loginBlock.headForget") }}</span>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import config from "../../constants/config";
export default {
  name: "LoginBlock",
  data() {
    return {
      valid: false,
      tabNumber: "",
      password: "",
      passwordRules: {
        required: value => !!value || "required"
      },
      showPass: false,
      errorStr: ""
    };
  },
  methods: {
    sendHandler: function() {
      this.errorStr = "";
      const url = config.API_URL + "/users/login";
      const dataSend = {
        tabNumber: this.tabNumber,
        password: this.password
      };
      if (this.tabNumber === "" || this.password === "") {
        this.errorStr = "Все поля обязательны для заполнения";
      } else {
        axios
          .post(url, dataSend)
          .then(result => {
            localStorage.setItem("jwt", result.data.token);
            this.$router.push({ name: "main" });
            this.email = "";
            this.password = "";
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.errorStr = "Неправильные Email или пароль";
            } else {
              this.errorStr = error.response.status + "";
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.login-block {
  background-color: #edeef0;
  width: 100%;
  height: calc(100vh - 102px);
  min-height: 700px;
  .head {
    text-align: center;
  }
  .loginForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginForm__form {
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .field {
        width: 100%;
      }
      .btn-field {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .Error {
          margin-top: 25px;
          text-align: center;
          color: #ff5300;
        }
      }
    }
  }
}
</style>
