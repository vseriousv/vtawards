<template>
  <nav :class="`AppHeader ${fixedTopMenu} ${AdminPanel}`">
    <div class="appBar mxw1200">
      <router-link
        v-for="menuItem in $t('menuItems')"
        :key="menuItem.id"
        :to="menuItem.link"
        class="hidden-sm-and-down"
      >
        <span v-html="menuItem.text" />
      </router-link>

      <v-app-bar-nav-icon
        icon
        class="hidden-md-and-up"
        @click.stop="$emit('change-drawer-reverse')"
      >
      </v-app-bar-nav-icon>
    </div>
  </nav>
</template>

<script>
import JwtHelper from "../../helpers/JwtHelper";
export default {
  name: "AppHeader",
  props: ["fixedTopMenu", "adminTrue"],
  data() {
    return {
      AdminPanel: ""
    };
  },
  created() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin: function() {
      const jwtHelper = new JwtHelper();
      if (jwtHelper.isAdmin()) {
        this.AdminPanel = "adminTrueNavbar";
      } else {
        this.AdminPanel = "adminFalse";
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.AppHeader {
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 50px -5px black;
  background-color: white;
  .appBar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    a {
      color: black;
      text-decoration: none;
      height: 100%;
      padding: 0 20px;
      transition: 0.2s;
      &:hover {
        transition: 0.2s;
        color: $primaryTextColor;
      }
    }
  }
}
.noFixedTop {
  transition: 0.2s;
  top: 0 !important;
  position: relative;
}
.fixedTop {
  transition: 0.2s;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999999;
}
</style>
