<template>
  <v-navigation-drawer
    :mini-variant="mvarian"
    disable-resize-watcher
    app
    dark
    src="/img/imgComponents/AdminModule/Drawer/DrawerImg.jpg"
    fixed
    mobile-break-point="300px"
  >
    <div class="topMargin" />
    <v-list dense nav class="py-3">
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    mvarian: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      items: [
        { title: "General", icon: "mdi-view-dashboard", link: "/admin/general" },
        { title: "Users", icon: "mdi-account-group", link: "/admin/users" },
        { title: "Voting", icon: "mdi-ballot-outline", link: "/admin/voting" },
        { title: "Members", icon: "mdi-account-star", link: "/admin/members" },
        { title: "Сatalogs", icon: "mdi-form-dropdown", link: "/admin/catalogs" },
        { title: "On Site", icon: "mdi-page-next", link: "/" },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.topMargin {
  margin-top: 35px !important;
}
</style>
