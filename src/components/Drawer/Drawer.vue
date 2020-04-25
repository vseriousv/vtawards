<template>
  <!-- NAVICAGTION DRAWER -->
  <v-navigation-drawer
    fixed
    left
    temporary
    v-model="drawer"
    class="hidden-md-and-up"
    style="z-index: 2147483646;"
  >
    <div class="nav-drawer">
      <div class="topBlock">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <div class="logotype">
                <router-link to="/">
                  <img
                    class="vert-center widthMobil"
                    src="/img/twoblocks-logo.png"
                    alt="twoblocks-logo"
                  />
                  <span>{{ $t("header.head") }}</span>
                </router-link>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <div v-for="(item, i) in $t('menuItems')" :key="`drawerMenu${i}`">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                <a
                  :href="`${item.link}`"
                  class="elHover"
                  :target="`${item.target}`"
                  rel="noreferrer noopener"
                  >{{ item.text }}</a
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </div>
        <div class="bottomBlock">
          <v-divider />
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title d-flex">
                <div class="d-flex align-center pr-3">
                  <v-btn text small @click="switchLang($t('lang'))">
                    {{ $t("lang") }}
                  </v-btn>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                <v-btn outlined href="#targetOffer">
                  LEARN MORE
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    menuItems: {
      type: Array,
      default: null
    }
  },
  computed: {
    getmenuItems() {
      return this.menuItems;
    }
  },
  data() {
    return {
      thisDrawer: true
    };
  }
};
</script>
<style lang="scss" scope>
@import "../../assets/styles/index";
</style>
