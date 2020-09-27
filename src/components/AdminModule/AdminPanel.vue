<template>
  <div>
    <div :class="`admin-panel ${dnone}`">
      <span class="adminText_logo">AbraCode</span>
      <div class="contentPanel d-none d-md-flex">
        <router-link to="/admin/general">Админка</router-link>
        <router-link to="/admin/applications">Управление заявками</router-link>
        <router-link to="/admin/users">Управление пользователями</router-link>
<!--        <router-link to="/admin/members">Управление участниками</router-link>-->
<!--        <router-link to="/admin/voting">Управление голосованием</router-link>-->
<!--        <router-link to="/admin/catalogs">Управление справочниками</router-link>-->
      </div>
      <div class="contentPanel d-md-none">
        <v-menu
          transition="slide-x-transition"
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }" >
            <v-icon
              color="white"
              v-bind="attrs"
              v-on="on">
                mdi-cog
            </v-icon>
          </template>
          <v-list class="listCog d-flex flex-column">
            <router-link class="listCog__item" to="/admin/general">Админка</router-link>
            <router-link class="listCog__item" to="/admin/applications">Управление заявками</router-link>
            <router-link class="listCog__item" to="/admin/users">Управление пользователями</router-link>
<!--            <router-link class="listCog__item" to="/admin/members">Управление участниками</router-link>-->
<!--            <router-link class="listCog__item" to="/admin/voting">Управление голосованием</router-link>-->
<!--            <router-link class="listCog__item" to="/admin/catalogs">Управление справочниками</router-link>-->
          </v-list>
        </v-menu>
      </div>
    </div>
    <div :class="`${adminTrue}`"></div>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  props: ["adminTrue", "dnone"],
  created() {
    this.$emit("checkAdminPanel");
  }
};
</script>


<style lang="scss">
.listCog {
  padding: 20px;
  .listCog__item {
    color: black;
    text-decoration: none;
    margin-bottom: 6px;
  }
}
</style>
<style lang="scss" scoped>
@import "./src/assets/styles/index.scss";

.admin-panel {
  position: fixed;
  width: 100%;
  min-height: 40px;
  background-color: #202020;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000000;
  .contentPanel {
    padding: 0 15px;
    display: flex;
  }
  a {
    color: white !important;
    text-decoration: none;
    font-size: 12px;
    margin: 0 10px;
    &:hover {
      color: #ffb900 !important;
    }
  }
}
.adminText_logo {
  color: white;
  padding: 0 15px;
}
.displayNone {
  display: none;
}
.displayActive {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
