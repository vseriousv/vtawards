<template>
  <header class="header-block">
    <div id="home" class="target-class" />
    <v-container class="mxw1200">
      <v-row class="logoAndLang">
        <v-col cols="12" class="logoAndLang__col">
          <router-link to="/">
            <img
              class="logotype"
              width="150"
              :src="
                `/img/imgComponents/HeaderBlock/${$t('header.logotype')}.png`
              "
              alt="vtaward"
            />
          </router-link>
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
      <v-row class="title-head">
        <div class="title-head_col">
          <div class="title-head_col__text">
            <h1 v-html="$t('header.head')"></h1>
            <p class="header-tagline">{{ $t("header.subHeadText") }}</p>
          </div>
          <img
            class="title-head_col__image"
            width="58"
            height="68"
            :src="`/img/imgComponents/HeaderBlock/star_of_team.png`"
            alt="star_of_team"
          />
        </div>
      </v-row>
      <v-row class="body-head">
        <v-col class="body-head_col">
          <p class="body-head_col__text">{{ $t("header.bodyText") }}</p>
        </v-col>
      </v-row>
      <v-row class="body-button">
        <v-col class="body-button_col">
          <p v-html='$t("header.btnHeader.beforeText")'></p>
          <!-- <a :href="`/files/${$t('header.btnHeader.link')}`" target="_blank">
            <input
              type="button"
              id="headerBtn"
              class="body-button_col__button"
              :value="$t('header.btnHeader.text')"
            />
          </a> -->
          <router-link to="/application">
             <input
              type="button"
              id="headerBtn"
              class="body-button_col__button"
              :value="$t('header.btnHeader.text')"
            />
          </router-link>
        </v-col>
      </v-row>
      <v-row class="body-voteStatus">
        <v-col class="body-voteStatus_col">
          <p class="body-voteStatus_col__text">
            {{ $t("header.statusVote.statusEnd") }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
export default {
  name: "HeaderBlock",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";

.header-block {
  background-image: url(/img/imgComponents/HeaderBlock/Header_BG.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 700px;
  .logoAndLang {
    .logoAndLang__col {
      display: flex;
      .logotype {
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
  .title-head {
    padding: 12px;
    // margin-top: 100px;
    .title-head_col {
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      // @include respond-to(large-screens) {
      //   flex-direction: row-reverse;
      // }
      .title-head_col__text {
        display: flex;
        flex-direction: column;
        justify-content: start;
        // height: 174px;
        // @include respond-to(large-screens) {
        //   margin-right: 30px;
        // }
        h1 {
          font-size: 56px;
          text-align: left;
          font-weight: 700;
          color: white;
          clear: both;
          line-height: 110px;
          @include respond-to(medium-screens) {
            font-size: 76px;
          }
          @include respond-to(large-screens) {
            font-size: 86px;
          }
        }
        p.header-tagline {
          color: white;
          text-align: left;
          font-size: 18px;
          margin-top: 10px;
        }
      }
      .title-head_col__image {
        margin-left: 50px;
      }
    }
  }
  .body-head {
    .body-head_col {
      display: flex;
      justify-content: center;
      @include respond-to(large-screens) {
        justify-content: flex-start;
      }
      .body-head_col__text {
        color: white;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.04em;
        max-width: 605px;
        text-align: center;
        @include respond-to(medium-screens) {
          font-size: 16px;
          line-height: 26px;
        }
        @include respond-to(large-screens) {
          text-align: left;
        }
      }
    }
  }
  .body-button {
    .body-button_col {
      display: flex;
      flex-direction: row;
      justify-content: center;
      p {
        margin-right: 50px;
      }
      @include respond-to(large-screens) {
        justify-content: flex-start;
        p {
          color: white;
          max-width: 280px;
        }
      }
      .body-button_col__button {
        color: white;
        width: 220px;
        height: 56px;
        border: 1px solid white;
        border-radius: 5px;
        transition: 0.2s;
        &:hover {
          transition: 0.2s;
          color: black;
          background-color: white;
        }
      }
    }
  }
  .body-voteStatus {
    margin-top: 20px;
    @include respond-to(large-screens) {
      margin-top: 40px;
    }
    .body-voteStatus_col {
      display: flex;
      justify-content: center;
      @include respond-to(large-screens) {
        justify-content: flex-start;
      }
      .body-voteStatus_col__text {
        color: white;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.04em;
        max-width: 605px;
        text-align: center;
        @include respond-to(medium-screens) {
          font-size: 16px;
          line-height: 26px;
        }
        @include respond-to(large-screens) {
          text-align: left;
        }
      }
    }
  }
}
</style>
