<template>
  <footer class="footer-block">
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
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
  props: {},
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.footer-block {
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(/img/imgComponents/FooterBlock/footer_bg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
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
}
</style>
