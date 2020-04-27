import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./Router";
import VueI18n from "vue-i18n";
import locale from "./constants/locale";

Vue.use(VueI18n);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  i18n: {
    messages: {},
    sharedMessages: locale,
    locale: "ru"
  },
  created: function() {
    if (navigator.language.includes("ru")) {
      this.$i18n.locale = "ru";
    }
  },
  render: h => h(App)
}).$mount("#app");
