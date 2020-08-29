<template>
  <div>
    <registration-block />
  </div>
</template>

<script>
import RegistrationBlock from "../components/AuthModule/RegistrationBlock";
export default {
  name: "RegistrationPage",

  components: {
    RegistrationBlock
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
