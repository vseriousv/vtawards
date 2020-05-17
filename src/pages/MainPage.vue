<template>
  <div>
    <info-block />


<!--    {text: 'Финал', value: 'final_voting'},                     -->
    <winner-block voting_id="4"/>
<!--    {text: 'Полуфинал', value: 'semifinal_voting'},             -->
    <winners-all-block voting_id="5"/>
<!--    {text: 'Осень "звезда"', value: 'autumn_committee_voting'}, -->
    <winners-all-block voting_id="6"/>
<!--    {text: 'Осень "народное"', value: 'autumn_users_voting'},   -->
    <winners-all-block voting_id="3"/>
<!--    {text: 'Весна "звезда"', value: 'spring_committee_voting'}, -->
    <winners-all-block voting_id="2"/>
<!--    {text: 'Весная "народное"', value: 'spring_users_voting'},  -->
    <winners-all-block voting_id="1"/>


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
