<template>
  <header class="header-block">
    <div id="home" class="target-class" />
    <v-container class="mxw1200 height100pr">
      <v-row class="logoAndLang">
        <v-col cols="12" class="logoAndLang__col">
          <div class="title-head_col">
            <!-- <img
              class="title-head_col__image"
              width="58"
              height="68"
              :src="`/img/imgComponents/HeaderBlock/star_of_team.png`"
              alt="star_of_team"
            /> -->
            <div class="title-head_col__text">
              <h1>
                {{ this.$t("lang") === "en" ? headName_en : headName_ru }}
              </h1>
            </div>
          </div>
          <div class="btnBoxHeader">
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
            <router-link to="/my-profile">
              <div class="mdi mdi-account-edit"></div>
            </router-link>
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
  background-image: url(/img/imgComponents/FooterBlock/footer_bg.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  height: 200px;
  .logoAndLang {
    height: 100%;
    .logoAndLang__col {
      display: flex;
      justify-content: space-between;
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
            font-size: 30px;
            text-align: center;
            font-weight: 700;
            color: white;
            clear: both;
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
      .btnBoxHeader {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        @include respond-to(apple5) {
          flex-direction: column-reverse;
        }
        a {
          text-decoration: none;
        }
        .mdi-account-edit {
          display: flex;
          font-size: 40px;
          line-height: 70%;
          color: white;
          margin-left: 15px;
          cursor: pointer;
          &:hover {
            color:orange;
          }
          @include respond-to(apple5) {
            margin-left: 40px;
            margin-bottom: 20px;
          }
          @include respond-to(medium-screens) {
            margin-left: 60px;
          }
          
        }
        .lang {
          display: flex;
          justify-content: flex-end;
          flex: 1;
          .langButton {
            width: 56px;
            height: 32px;
            border: 1px solid white;
            font-size: 18px;
            line-height: 18px;
            font-weight: 700;
            color:  white;
            &:hover {
              color: $primaryTextColor;
            }
          }
          &.ru .ruInput {
            background: white;
            color: black;
          }
          &.en .enInput {
            background: white;
            color: black;
          }
        }
      }
    }
  }
}
</style>
