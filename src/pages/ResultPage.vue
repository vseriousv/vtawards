<template>
  <div>
    <results-voting />
  </div>
</template>

<script>
import ResultsVoting from "../components/ResultsVoting/ResultsVoting";
export default {
  name: "ResultPage",

  components: {
    ResultsVoting
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
