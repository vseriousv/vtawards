<template>
  <div>
    <restore-password-block />
  </div>
</template>

<script>
import RestorePasswordBlock from "../components/AuthModule/RestorePasswordBlock";
export default {
  name: "RestorePasswordPage",

  components: {
    RestorePasswordBlock
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
