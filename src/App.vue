<template>
  <v-app id="inspire">
    <!-- NAVICAGTION DRAWER -->
    <v-navigation-drawer
      fixed
      left
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
      style="z-index: 2147483646;"
    >
      <drawer-list/>
    </v-navigation-drawer>

    <!-- ROUTER VIEW HEADER SITE WITHOUT BODY  -->
    <router-view name="header" @switchLang="switchLang" :headName_en="headName_en"/>

    <app-header
      :fixedTopMenu="this.fixedTop"
      @changeDrawerReverse="changeDrawerReverse"
    />
    <div :style="`height: 50px; display: ${displayMargin}`" />

    <!-- ROUTER VIEW BODY SITE WITHOUT HEADER  -->
    <router-view  name="body"/>
    <footer-block @switchLang="switchLang" />
  </v-app>
</template>

<script>
import DrawerList from "./components/DrawerList/DrawerList";
import AppHeader from "./components/AppHeader/AppHeader";
import FooterBlock from "./components/FooterBlock/FooterBlock";

export default {
  name: "App",
  props: ['headName_en','headName_ru'],
  components: {
    DrawerList,
    AppHeader,
    FooterBlock
  },
  computed: {
  },
  data() {
    return {
      fixedTop: "noFixedTop",
      displayMargin: "none",
      spec: true,
      drawer: false
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
