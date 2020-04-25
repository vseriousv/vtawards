<template>
  <section :class="`AppHeader ${fixedTopMenu}`">
    <h5>AppHeader</h5>
  </section>
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
}
.fixedTop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999999;
}
</style>
