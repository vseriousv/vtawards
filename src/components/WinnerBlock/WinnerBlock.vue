<template>
  <section class="winner-block mxw1200 mt-6">
    <h2 class="text-center">{{$t("winnerBlock.head")}} <u>{{year_block}}</u> {{$t("winnerBlock.year")}}</h2>
  </section>
</template>

<script>
export default {
  name: "WinnerBlock",
  props: ['year'],
  data() {
    return {
      year_block: '',
      winner_img: '',
      winner_id: ''
    }
  },
  created() {
    this.getYear();
  },
  methods: {
    getYear: function () {
      let date = new Date();
      this.year_block = (this.$props.year === 'latest') ? date.getFullYear() : this.$props.year;
    },
    getWinner: function () {

    }
  }
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.winner-block {

}
</style>
