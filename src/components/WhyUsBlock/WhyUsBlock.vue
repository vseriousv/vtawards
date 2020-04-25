<template>
  <section class="why-us-block">
    <div id="why-us" class="target-class" />
    <v-container class="mxw1200">
      <v-row>
        <v-col>
          <h2 class="header__text__section_block header_section_head">{{ $t('whyUsBlock.head') }}</h2>
        </v-col>
      </v-row>
      <v-row class="row-body-Block" align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card class="whyUsBlockText someText" elevation="16">
            <div
              v-for="(whyUsBlockItem, i) in $t('whyUsBlock.texts')"
              :key="`whyUsBlockItem${i}`"
              class="whyUsBlockText__item"
            >
              <span>{{ whyUsBlockItem.item }}</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="imgBlock">
            <v-img src="/img/imgComponents/WhyUsBlock/whyUsBlock_team.jpg"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
    export default {
        name: "WhyUsBlock"
    }
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.why-us-block{
  position: relative;
  padding: 50px 0;
  @include respond-to(large-screens) { padding: 100px 0; }
  .row-body-Block{
    .whyUsBlockText{
      margin-top: 0px;
      padding: 15px 35px;
      @include respond-to(large-screens) { margin-top: 50px }
      .whyUsBlockText__item {
        font-size: 14px;
        padding: 10px 0;
        max-width: 500px;
        @include respond-to(medium-screens) { font-size: 16px; }
        @include respond-to(large-screens) { font-size: 20px; }
      }
    }
    .imgBlock{
      display: none;
      @include respond-to(large-screens) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
