<template lang="pug">
    v-card.nomDialog
      v-card-title.nomDialog__title(v-html="nomtitle")
      v-card-text.nomDialog__text(v-html="nomtext")
      v-card-actions
        v-spacer
        v-btn.nomDialog__btn(
          text
          @click="$emit('dialogShow', false, '')"
        )(v-html="$t('NominationBlock.buttonNomText')")
</template>

<script>
export default {
    props: {
        nomtitle: {
          type: String,
          default: null
        },
        nomtext: {
          type: String,
          default: null
        }
    },
    name: "NominationModal",
};
</script>

<style lang="scss">
@import "../../../assets/styles/index";

.v-dialog {
    // ul {
    //   list-style: none;
    //   padding: 0 0 0 14px;
    //   @include respond-to(medium-screens) {
    //     padding: 0 0 0 25px;
    //   }
    //   li{
    //     margin: 8px 0;
    //     &:before {
    //       content: "\●";
    //       padding-right: 10px;
    //       color: #ffb900;
    //   }
    // }
  // }
  .nomDialog {
    .nomDialog__title {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: normal;
      @include respond-to(medium-screens) {
        font-size: 24px;
      }
    }
    .nomDialog__text p,ul{
      font-size: 14px;
      line-height: normal;
      @include respond-to(medium-screens) {
        font-size: 16px;
        line-height: normal;
      }
      @include respond-to(large-screens) {
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
  .nomDialog__btn {
    color: black;
      &:hover {
        color: #ffb900;
    }
  }
}
</style>