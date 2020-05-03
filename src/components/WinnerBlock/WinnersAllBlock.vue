<template>
  <section class="winners-all-block">
    <h2>This is winners: <u>{{year}}</u> year, <u>{{typeVote}}</u> </h2>
  </section>
</template>

<script>
export default {
  name: "WinnersAllBlock",
  props: ['year', 'typeVote']
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.winners-all-block {

}
</style>
