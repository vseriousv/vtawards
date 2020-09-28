<template>
  <header class="header-block">
    <!-- <div id="home" class="target-class" /> -->
    <v-container class="mxw1200 px-0 py-0">
      <v-row class="logoAndLang">
        <v-col cols="12" class="logoAndLang__col">
          <router-link to="/">
            <img
              class="logotype"
              width="150"
              :src="`/img/imgComponents/HeaderBlock/${$t('header.logotype')}.png`"
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
    <v-container class="mxw1200 header__content px-0 py-0">
      <v-row class="title-head">
        <div class="title-head_col">
          <div class="title-head_col__text">
            <h1 v-html="$t('header.head')"></h1>
            <p class="header-tagline">{{ $t("header.subHeadText") }}</p>
          </div>
        </div>
      </v-row>
      <v-row class="body-head">
        <!-- <div class="body-head_col">
          <p class="body-head_col__text">{{ $t("header.bodyText") }}</p>
          <img
            class="title-head_col__image"
            width="58"
            height="68"
            :src="`/img/imgComponents/HeaderBlock/star_of_team.png`"
            alt="star_of_team"
          />
        </div> -->
        <div class="body-button ">
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
        </div>
      </v-row>
      <!-- <v-row class="body-button">

      </v-row> -->
      <v-row class="body-voteStatus">
        <v-col class="body-voteStatus_col d-flex flex-column align-start">
					<div class="body-voteStatus_col__text">{{$t("header.statusVote.statusCancel")}}</div>
					<div class="Timer-view d-flex">
            <div class="boxTime">
              <p class="boxTime__title">{{$t("header.time.d")}}</p>
              <span class="Timer-view__card days">{{timer.days}}</span>
            </div>
            <div class="boxTime">
              <p class="boxTime__title">{{$t("header.time.hr")}}</p>
              <span class="Timer-view__card hours">{{timer.hours}}</span>
            </div>
            <div class="boxTime">
              <p class="boxTime__title">{{$t("header.time.min")}}</p>
              <span class="Timer-view__card minutes">{{timer.minutes}}</span>
            </div>
            <div class="boxTime">
              <p class="boxTime__title">{{$t("header.time.sec")}}</p>
              <span class="Timer-view__card seconds">{{timer.seconds}}</span>
            </div>
					</div>
<!--          <p class="body-voteStatus_col__text">-->
<!--&lt;!&ndash;            {{ $t("header.statusVote.statusProc") }}&ndash;&gt;-->
<!--						-->
<!--          </p>-->
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
// import moment from 'moment';

export default {
  name: "HeaderBlock",
  data() {
    return {
			nowLast: '',
			timer: {
				seconds: '',
				minutes: '',
				hours: '',
				days: '',
			}
		};
  },

	created() {
		setInterval(() => {this.getLastTime()}, 1000)
	},

	methods: {
  	getLastTime: function(){
			let nowDate = new Date();
			let achiveDate = new Date(2020,9,18,23,59,59);
			let result = (achiveDate - nowDate)+1000;
			if (result < 0) {
				this.timer.seconds = '--';
				this.timer.minutes = '--';
				this.timer.hours = '--';
				this.timer.days = '--';
			} else {
				this.timer.seconds = Math.floor((result/1000)%60);
				this.timer.minutes = Math.floor((result/1000/60)%60);
				this.timer.hours = Math.floor((result/1000/60/60)%24);
				this.timer.days = Math.floor(result/1000/60/60/24);

				if (this.timer.seconds < 10) this.timer.seconds = '0' + this.timer.seconds;
				if (this.timer.minutes < 10) this.timer.minutes = '0' + this.timer.minutes;
				if (this.timer.hours < 10) this.timer.hours = '0' + this.timer.hours;
			}
  	}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.Timer-view {
	font-size: 45px;
  line-height: 80%;
	color: white;
  margin-top: 8px;
	// .Timer-view__card {
	// 	padding: 7px 7px 7px 0;
	// 	margin: 7px 7px 7px 0;
	// }
}

.header-block {
  background-image: url(/img/imgComponents/HeaderBlock/Header_BG.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100vh;
  padding: 50px 16px 30px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  .logoAndLang {
    .logoAndLang__col {
      display: flex;
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
  .header__content {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    height: 100%;
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
            font-size: 40px;
            text-align: left;
            font-weight: 700;
            color: white;
            clear: both;
            line-height: 60px;
            @include respond-to(medium-screens) {
              font-size: 56px;
              line-height: 85px;
            }
            @include respond-to(large-screens) {
              font-size: 86px;
              line-height: 100px;
            }
          }
          p.header-tagline {
            color: white;
            text-align: left;
            font-size: 18px;
            margin: 10px 0 0;
          }
        }
      }
    }
    .body-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 20px;
      .body-head_col {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        padding: 0 12px;
        margin-bottom: 20px;
        @include respond-to(large-screens) {
          justify-content: flex-start;
          flex-direction: row;
          align-items: center;
        }

        img {
          margin-bottom: 20px;
          margin-left: auto;
          margin-right: auto;

          @include respond-to(apple5) {
            display: none;
          }
          @include respond-to(large-screens) {
            margin: 0;
          }
        }
        .body-head_col__text {
          color: #FEBA13;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.04em;
          max-width: 605px;
          margin-bottom: 0;
          // text-align: center;
          @include respond-to(medium-screens) {
            font-size: 16px;
            line-height: 26px;
          }
          @include respond-to(large-screens) {
            text-align: left;
          }
        }
      }
      .body-button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 12px;
        p {
          color: white;
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
      // margin-top: 20px;
      // @include respond-to(large-screens) {
      //   margin-top: 40px;
      // }
      .body-voteStatus_col {
        display: flex;
        justify-content: center;
        align-items: center;
        @include respond-to(large-screens) {
          justify-content: flex-start;
        }
        .body-voteStatus_col__text {
          color: white;
          font-size: 14px;
          // line-height: 20px;
          // letter-spacing: 0.04em;
          max-width: 605px;
          text-align: center;
          margin: 0;
          @include respond-to(medium-screens) {
            font-size: 16px;
            line-height: 26px;
          }
          @include respond-to(large-screens) {
            text-align: left;
          }
        }
      }
      .boxTime {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        .boxTime__title {
          font-size: 18px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
