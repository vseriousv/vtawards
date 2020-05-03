<template>
  <section class="winner-block mxw1200">
    <h2>Winner <u>{{year}}</u> year</h2>
  </section>
</template>

<script>
export default {
  name: "WinnerBlock",
  props: ['year']
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.winner-block {

}
</style>
