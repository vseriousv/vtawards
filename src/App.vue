<template>
  <v-app id="inspire">
    <header-block @switchLang="switchLang" />
    <app-header :fixedTopMenu="this.fixedTop" />
    <div :style="`height: 50px; display: ${displayMargin}`"></div>
    <!-- PAGES BLOCKS  -->
    <router-view />
    <div style="height: 1700px;"></div>
    <footer-block />
  </v-app>
</template>

<script>
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import AppHeader from "./components/AppHeader/AppHeader";
import FooterBlock from "./components/FooterBlock/FooterBlock";

export default {
  name: "App",
  components: {
    HeaderBlock,
    AppHeader,
    FooterBlock
  },

  data() {
    return {
      drawer: false,
      fixedTop: "noFixedTop",
      displayMargin: "none"
    };
  },
  created() {
    window.addEventListener("scroll", this.handleFixed);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleFixed);
  },
  methods: {
    changeDrawerReverse() {
      this.drawer = !this.drawer;
    },
    switchLang: function(lang) {
      this.$i18n.locale = lang;
    },
    handleFixed: function() {
      this.fixedTop = window.pageYOffset >= 700 ? "fixedTop" : "noFixedTop";
      this.displayMargin = window.pageYOffset >= 700 ? "block" : "none";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/index.scss";
</style>
