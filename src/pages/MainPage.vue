<template>
  <div>
    <info-block />
    <winner-block year="latest" />
    <winners-all-block year="latest" typeVote="semifinal"/>
    <winners-all-block year="latest" typeVote="autumnStar"/>
    <winners-all-block year="latest" typeVote="autumnWin"/>
    <winners-all-block year="latest" typeVote="springStar"/>
    <winners-all-block year="latest" typeVote="springWin"/>
    <div style="height: 700px;"></div>
  </div>
</template>

<script>
import InfoBlock from "../components/InfoBlock/InfoBlock";
import WinnerBlock from '../components/WinnerBlock/WinnerBlock';
import WinnersAllBlock from "../components/WinnerBlock/WinnersAllBlock";

export default {
  name: "MainPage",

  components: {
    InfoBlock,
    WinnerBlock,
    WinnersAllBlock
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
