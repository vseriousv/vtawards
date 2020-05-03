<template>
  <div class="admin-page">
    <drawer :mvarian="miniVariant" />
    <v-content>
      <navbar @changeDrawer="changeDrawer" />
      <v-container fluid>
        <!-- PAGES BLOCKS  -->
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Navbar from "../components/AdminModule/Navbar";
import Drawer from "../components/AdminModule/Drawer";
export default {
  name: "AdminPage",

  components: {
    Navbar,
    Drawer
  },
  created() {
  },
  data() {
    return {
      miniVariant: true
    };
  },
  methods: {
    changeDrawer: function() {
      this.miniVariant = !this.miniVariant;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
.admin-page {
  width: 100%;
  height: 100%;
  background-color: #edeef0;
}
</style>
