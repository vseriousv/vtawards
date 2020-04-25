<template>
  <div>
    <header-block />
    <why-us-block />
    <advantages-block />
    <portfolio-block />
  </div>
</template>

<script>
  import HeaderBlock from "../components/HeaderBlock/HeaderBlock";
  import WhyUsBlock from "../components/WhyUsBlock/WhyUsBlock";
  import AdvantagesBlock from "../components/AdvantagesBlock/AdvantagesBlock";
  import PortfolioBlock from "../components/PortfolioBlock/PortfolioBlock";

  export default {
  name: "App",

  components: {
    HeaderBlock,
    WhyUsBlock,
    AdvantagesBlock,
    PortfolioBlock
  },

  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/index.scss";
</style>
