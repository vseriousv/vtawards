<template>
  <nav :class="`AppHeader ${fixedTopMenu}`">
    <div class="appBar mxw1200">
      <router-link
        v-for="menuItem in $t('menuItems')"
        :key="menuItem.id"
        :to="menuItem.link"
        class="hidden-sm-and-down"
      >
        <span
          v-html="menuItem.text"
        />
      </router-link>

      <v-app-bar-nav-icon
        icon
        class="hidden-md-and-up"
        @click.stop="$emit('changeDrawerReverse')"
      >
      </v-app-bar-nav-icon>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  props: ["fixedTopMenu"]
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
      transition: .2s;
      &:hover {
        transition: .2s;
        color: $primaryTextColor;
      }
    }
  }
}
.noFixedTop{
  transition: .2s;
  position: relative;
}
.fixedTop {
  transition: .2s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999999;
}
</style>
