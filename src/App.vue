<template>
  <v-app id="inspire">
    <router-view name="adminPanel" :adminTrue="adminTruePanel" :dnone="dnone" @checkAdminPanel="checkAdminPanel"/>
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

    <router-view name="nav" :fixedTopMenu="this.fixedTop" @changeDrawerReverse="changeDrawerReverse" adminTrue="adminTrueNavbar"/>

    <div :style="`height: 50px; display: ${displayMargin}`" />

    <!-- ROUTER VIEW BODY SITE WITHOUT HEADER  -->
    <router-view name="body"/>
    <router-view name="footer" @switchLang="switchLang" />
  </v-app>
</template>

<script>
import DrawerList from "./components/DrawerList/DrawerList";
import JwtHelper from "./helpers/JwtHelper";

const jwtHeader = new JwtHelper();

export default {
  name: "App",
  props: ['headName_en','headName_ru'],
  components: {
    DrawerList,
  },
  computed: {
  },
  data() {
    return {
      fixedTop: "noFixedTop",
      displayMargin: "none",
      spec: true,
      drawer: false,
      dnone: '',
      adminTrueNavbar: '',
      adminTruePanel: '',
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
    },
    checkAdminPanel: function () {
      if (jwtHeader.isAdmin()) {
        this.dnone = 'displayActive';
        this.adminTrueNavbar = 'adminTrueNavbar';
        this.adminTruePanel = 'adminTruePanel';
      } else {
        this.dnone = 'displayNone';
        this.adminTrueNavbar = 'adminFalse';
        this.adminTruePanel = 'adminFalse';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/index.scss";

</style>
