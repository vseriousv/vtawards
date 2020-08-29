<template>
  <header class="header-block">
    <div id="home" class="target-class" />
    <v-container class="mxw1200 height100pr">
      <v-row class="logoAndLang">
        <v-col cols="12" class="logoAndLang__col">
          <div class="title-head_col"></div>
          <div :class="`d-flex align-center lang ${$t('lang')}`">
            <input
              class="langButton ruInput"
              type="button"
              value="ru"
              @click="$emit('switchLang', 'ru')"
            />
            <input
              class="langButton enInput"
              type="button"
              value="en"
              @click="$emit('switchLang', 'en')"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
export default {
  name: "HeaderBlock",
  props: ["headName_en", "headName_ru"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.header-block {
  background-color: #edeef0;
  height: 100px;
  .logoAndLang {
    height: 100%;
    .logoAndLang__col {
      display: flex;
      justify-content: center;
      align-items: center;
      .title-head_col {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @include respond-to(large-screens) {
          flex-direction: row-reverse;
        }
        .title-head_col__text {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          @include respond-to(large-screens) {
            margin-right: 30px;
          }
          h1 {
            font-size: 18px;
            text-align: center;
            font-weight: 700;
            color: white;
            clear: both;
            @include respond-to(medium-screens) {
              font-size: 26px;
            }
            @include respond-to(large-screens) {
              font-size: 40px;
            }
          }
          p.header-tagline {
            color: white;
            text-align: center;
            font-size: 18px;
            @include respond-to(medium-screens) {
            }
            @include respond-to(large-screens) {
              text-align: right;
              margin-top: -20px;
            }
          }
        }
        .title-head_col__image {
          margin-top: -30px;
        }
      }
      .lang {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        .langButton {
          width: 56px;
          height: 32px;
          border: 1px solid black;
          font-size: 18px;
          line-height: 18px;
          font-weight: 700;
          &:hover {
            color: $primaryTextColor;
          }
        }
        &.ru .ruInput {
          background: black;
          color: $primaryTextColor;
        }
        &.en .enInput {
          background: black;
          color: $primaryTextColor;
        }
      }
    }
  }
}
</style>
