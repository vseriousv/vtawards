<template>
  <section class="header-block">
    <div id="home" class="target-class" />
    <v-container class="mxw1200 height100pr">
      <v-row class="header-block-width ">
        <v-col cols="12" md="6" class="header_text">
          <h1 v-html="$t('header.bodyText')"></h1>
          <input type="button" class="header-block__learnMore" href="#why-us" :value="$t('header.subscribeBtn')">
        </v-col>
        <v-col cols="12" md="6" class="img_header_column">

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "HeaderBlock",
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.header-block{
  position: relative;
  height: 100vh;
  padding-top: 56px;
  background-color: $primarySurface;
  .header-block-width {
    height: 100%;
    .header_text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      @include respond-to(large-screens) { align-items: flex-start; }
      h1 {
        font-size: 25px;
        text-align: center;
        color: white;
        @include respond-to(large-screens) {
          font-size: 45px;
          text-align: left;
        }
      }
      .header-block__learnMore{
        margin-top: 60px;
        width: 200px;
        height: 45px;
        text-align: center;
        border-radius: 4px;
        background-color: $secondaryColor;
        text-transform: uppercase;
        font-weight: 500;
        transition: .2s;
        &:hover {
          transition: .2s;
          box-shadow: 0 4px 10px -3px #FFC300;
          background-color: #FFC300;
        }
      }
    }
    .img_header_column{

    }
  }
}
</style>
