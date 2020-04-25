<template>
  <v-app id="inspire">
    <!-- NAVICAGTION DRAWER -->
    <v-navigation-drawer
      fixed
      left
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
      style="z-index: 2147483646;"
    >
      <div class="nav-drawer">
        <div class="topBlock">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                <div class="logotype">
                  <router-link
                    to="/"
                  >
                    <img
                      class="vert-center widthMobil"
                      src="/img/twoblocks-logo.png"
                      alt="twoblocks-logo"
                    >
                    <span>{{ $t('header.head') }}</span>
                  </router-link>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />

          <div
            v-for="(item, i) in $t('menuItems')"
            :key="`drawerMenu${i}`"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  <a
                    :href="`${item.link}`"
                    class="elHover"
                    :target="`${item.target}`"
                    rel="noreferrer noopener"
                  >{{ item.text }}</a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </div>
          <div class="bottomBlock">
            <v-divider />
            <v-divider />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title d-flex">
                  <div class="d-flex align-center pr-3">
                    <v-btn
                      text
                      small
                      @click="switchLang($t('lang'))"
                    >
                      {{ $t('lang') }}
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  <v-btn
                    outlined
                    href="#targetOffer"
                  >
                    LEARN MORE
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <app-header
      @changeDrawer="changeDrawerReverse"
      @switchLang="switchLang"
    />

    <!-- PAGES BLOCKS  -->
    <router-view />

    <footer-block />
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader/AppHeader";
import FooterBlock from "@/components/FooterBlock/FooterBlock";

export default {
  name: "App",
  components: {
    AppHeader,
    FooterBlock
  },

  data() {
    return {
      drawer: false,
    };
  },
  computed: {

  },
  methods: {
    changeDrawerReverse() {
      this.drawer = !this.drawer;
    },
    switchLang: function(lang) {
      if(lang == 'ru'){
        this.$i18n.locale = 'en';
      } else {
        this.$i18n.locale = 'ru';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/index.scss";
#inspire {
  font-family: $body-font-family !important;
  .nav-drawer {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    .bottomBlock {
      .noDecoration {
        text-decoration: none;
      }
    }
  }
}
.logotype {
  width: 220px;
  display: flex;
  align-items: center;
  overflow: hidden;
  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    span {
      margin-left: 15px;
      font-weight: bold;
    }
  }
  @include respond-to(medium-screens) {
    width: 220px;
  }
  .widthMobil {
    height: 25px;
    @include respond-to(medium-screens) {
      height: 40px;
    }
  }
}
.v-btn__content {
  color: $secondaryColor !important;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: black;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: #3c3c40;
}
</style>
