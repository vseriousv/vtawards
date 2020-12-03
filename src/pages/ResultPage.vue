<template>
  <div>
    <results-voting v-if="admin"/>
  </div>
</template>

<script>
// import ResultsVoting from "../components/ResultsVoting/ResultsVoting";
import ResultsVoting from "../components/ResultsVoting/ResultsFinalVoting";
import JwtHelper from "@/helpers/JwtHelper";
const jwtHelper = new JwtHelper();
export default {
  name: "ResultPage",

  components: {
    ResultsVoting
  },

  data() {
    return {
      admin: jwtHelper.isAdmin()
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
