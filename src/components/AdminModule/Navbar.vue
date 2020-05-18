<template>
  <v-card color="blue-grey lighten-4" flat tile dark>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click.stop="handleDrawer" />
      <router-link to="/">
        <v-toolbar-title class="title">
          <!--          <v-img-->
          <!--            src="/img/logo_core.png"-->
          <!--            class="logotype"-->
          <!--            height="30"-->
          <!--            width="30"-->
          <!--          />-->
          <span>AbraCode: VTAWARD</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "AdminNavbar",
  methods: {
    handleDrawer: function() {
      this.$emit("changeDrawer");
    },
    logout: function() {
      this.$router.push({ name: "main" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index.scss";
.title {
  display: flex;
  padding-left: 5px !important;
  span {
    padding-left: 5px;
    color: white;
  }
}
a {
  text-decoration: none;
}
</style>
