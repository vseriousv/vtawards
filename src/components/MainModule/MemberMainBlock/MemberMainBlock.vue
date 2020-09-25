<template>
  <section class="member" id="member">
    <div class="mxw1200">
      <h2>Номинанты</h2>
      <div class="member-content">
        <span class="member-card-btn"></span>

        <!--            ВОТ ТУТ КАПЕЦ ЧТО_ТО            -->
        <div class="member-card">
          <h3 v-if="$t('lang') === 'ru'">{{itemRegionHeader_ru}}</h3>
          <h3 v-if="$t('lang') === 'en'">{{itemRegionHeader_en}}</h3>
          <v-list class="member-card-list">

            <template
              v-for="(item, id) in participants"
            >
              <v-list-item

                      :key="`participant${id}`"
                      class="member-card-list-item d-flex cursor-pointer"
                      @click.stop="goParticipantCard(item.id)"
                      v-if="item.region === itemRegionId"
              >
                <v-list-item-avatar>
                  <v-img :src="`${URL_AVATARS}${item.img}`" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name_ru"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

          </v-list>
          <div class="d-flex justify-center mb-6">
            <v-btn
              outlined
              color="primary"
              to="/participants"
            >
              {{$t('memberMainBlock.button')}}
            </v-btn>
          </div>
        </div>
        <!--            ВОТ ДО СЮДА                     -->
        <div class="member-map member-map-none">
          <ul :class="`member-map-list active_${active}`">
            <li v-for="(item, id) in itemRegion" :key="`region_${id}`" :class="`member-map-list-item ${item.style} active_${id} `">
              <span v-if="$t('lang') === 'ru'" @click.stop="setItemActive(id)">{{item.value_ru}}</span>
              <span v-if="$t('lang') === 'en'" @click.stop="setItemActive(id)">{{item.value_en}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from "../../../constants/config";
import axios from "axios";

export default {
  name: "MemberMainBlock",
  data() {
    return {
      active: 5,
      itemRegion: [],
      participants: [],
      URL_AVATARS: config.URL_AVATARS,
    }
  },
  created() {
    this.getParticipants();
    this.getRegions();
  },
  computed: {
    itemRegionHeader_ru: function () {
      if(this.itemRegion.length !== 0) {
        return this.itemRegion[this.active].value_ru
      } else {
        return '';
      }
    },
    itemRegionHeader_en: function () {
      if(this.itemRegion.length !== 0) {
        return this.itemRegion[this.active].value_en
      } else {
        return '';
      }
    },
    itemRegionId: function () {
      if(this.itemRegion.length !== 0) {
        return this.itemRegion[this.active].id
      } else {
        return 0;
      }
    },
  },
  methods: {
    goParticipantCard: function (id) {
      this.$router.push("/participants/id/"+id)
    },
    setItemActive: function (id) {
      this.active = id;
    },
    getRegions: function () {
      const url = config.API_URL + "/states";
      axios.get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      })
      .then(result => {
        this.getRegionsArray(result.data);
      })
      .catch(e => console.error("participants-error:", e));
    },
    getRegionsArray: async function(data) {
      for (let i = 0; i < data.length; i++) {

        // Специальные условия:
        let regionText_ru = '';
        if (data[i].id === 3) {
          regionText_ru = data[i].value_en;
        } else if (data[i].id === 2) {
          regionText_ru = 'Дальний восток';
        } else {
          regionText_ru = data[i].value_ru;
        }

        const stateObject = {
          id: data[i].id,
          value_ru: regionText_ru,
          value_en: data[i].value_en,
          style: "state_" + data[i].id
        };
        this.itemRegion.push(stateObject);
      }
    },
    getParticipants: function () {
      const url = config.API_URL + "/participants";
      axios.get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.setUsersArray(result.data);
        })
        .catch(e => console.error("participants-error:", e));
    },
    setUsersArray: async function(data) {
      for (let i = 0; i < data.length; i++) {
        const userObject = {
          id: data[i].user.id,
          tabNumber: data[i].user.tabNumber,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru: data[i].user.firstname_ru + " " + data[i].user.patronymic_ru + " " + data[i].user.lastname_ru,
          name_en: data[i].user.firstname_en + " " + data[i].user.patronymic_en + " " + data[i].user.lastname_en,
          region: data[i].user.state_id,
          voting: data[i].voting
        };
        this.participants.push(userObject);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.member {
  margin: 0 12px 95px;
}

.member h2 {
  margin: 0;
  margin-bottom: 30px;

  text-align: left;
}

.member-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.member-card {
  position: relative;
  z-index: 1;

  width: 394px;
  padding: 0;

  border-radius: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.member-card-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  display: none;
  width: 100%;
  height: 110px;

  opacity: 0;
}

.member-card h3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  margin: 0;
  margin-bottom: 25px;
  padding: 0px 27px;
  height: 110px;

  background: #fdcc08;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.member-card-list {
  padding: 0;
  margin: 0;
  margin-bottom: 38px;

  list-style: none;
}

.member-card-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  width: 100%;

  -webkit-transition: all 0.3s ease;

  -o-transition: all 0.3s ease;

  transition: all 0.3s ease;
}

.member-card-list-item:hover {
  background: #fdcc08;
}

.member-card-list-item img {
  width: 65px;
  height: 65px;

  border-radius: 1000px;
  -o-object-fit: cover;
  object-fit: cover;
}

.member-card-list-item-text h4 {
  margin: 0;
  margin-bottom: 5px;
  padding: 0;

  font-size: 18px;
  color: #2d2d2d;
}

.member-card-list-item-text p {
  margin: 0;
  padding: 0;

  font-size: 14px;
  font-weight: 300;
  color: #2d2d2d;
}

.member-card .btn,
.member-card .btn:visited {
  margin: 0 auto;
  margin-bottom: 38px;

  border-color: #2d2d2d;
  color: #2d2d2d;
}

.member-card .btn:hover,
.member-card .btn:focus {
  border-color: #fdcc08;
  background-color: #fdcc08;
  color: #fff;
}

.member-map {
  width: 750px;
  height: 586px;

  background-image: url(/img/imgComponents/StartVoting/Map.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
}

.member-map-list {
  position: relative;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  list-style: none;
}

.member-map-list-item {
  position: absolute;
}

.member-map-list-item span,
.member-map-list-item span:visited {
  position: relative;

  padding: 3px 10px;

  font-size: 18px;
  font-weight: 500;
  color: #2d2d2d;

  background-color: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.member-map-list-item span:hover,
.member-map-list-item span:focus {
  background-color: #fdcc08;
  color: #000;
  cursor: pointer;
}

.active_0 .active_0 span,
.active_1 .active_1 span,
.active_2 .active_2 span,
.active_3 .active_3 span,
.active_4 .active_4 span,
.active_5 .active_5 span,
.active_6 .active_6 span,
.active_7 .active_7 span,
.active_8 .active_8 span,
{
  background-color: #fdcc08 !important;
  color: #000 !important;
  &::before span {
    background-color: #fdcc08 !important;
  }
}

.member-map-list-item span::before {
  content: "";

  position: absolute;
  bottom: -15px;
  left: 0;

  height: 30px;
  width: 2px;

  background: #fff;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.member-map-list-item span:hover::before,
.member-map-list-item span:focus::before {
  background-color: #fdcc08;
}

.headoffice,
.state_6 {
  left: 10%;
  top: 72%;
}

.kuzbass,
.state_4 {
  left: 19%;
  top: 78%;
}

.zapsib,
.state_7 {
  left: 16%;
  top: 64%;
}

.westsib,
.state_1 {
  left: 36%;
  top: 74%;
}

.yakutia,
.state_8 {
  left: 65%;
  top: 48%;
}

.fareast,
.state_2 {
  left: 78%;
  top: 22%;
}

.fareast a::before {
  display: none;
}

.krasnoyarsk,
.state_5 {
  top: 47%;
  left: 30%;
}

.novokuz,
.state_3 {
  left: 19%;
  top: 86%;
}

.strong-state {
  top: 40%;
  left: 10%;
}

.strong-state a::before {
  display: none;
}

@-webkit-keyframes appIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes appIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.active-card {
  display: block;
  -webkit-animation: appIn 0.5s;
  animation: appIn 0.5s;
}

@media screen and (max-width: 1280px) {
  .headoffice {
    left: 10%;
    top: 62%;
  }

  .kuzbass {
    left: 19%;
    top: 68%;
  }

  .zapsib {
    left: 16%;
    top: 54%;
  }

  .westsib {
    left: 36%;
    top: 64%;
  }

  .yakutia {
    left: 65%;
    top: 38%;
  }

  .fareast {
    left: 70%;
    top: 28%;
  }
}

@media screen and (max-width: 1024px) {
  .member-card h3 {
    padding: 20px 15px;
  }

  .member-card-list-item {
    padding: 10px 15px;
  }

  .member-card-list-item-text p {
    display: none;
  }

  .member-map-list-item span,
  .member-map-list-item span:visited {
    -webkit-box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1),
      0 10px 10px rgba(0, 0, 0, 0.12);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.12);
  }

  .member-map-list-item span::before {
    display: none;
  }
}

@media screen and (max-width: 960px) {
  .member {
    margin-bottom: 50px;
  }

  .member-content {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .member-map-list-item {
    position: static;
  }

  .member-map-list-item span {
    display: block;
    width: 90%;
    margin-right: auto;
    padding: 15px 10px;
    margin-bottom: 5px;
  }

  .member-map {
    background: none;
  }

  .member-card {
    width: 60%;
  }

  .member-map {
    width: 40%;
  }
}

@media screen and (max-width: 640px) {
  .member-content {
    position: relative;
  }

  .member-card {
    width: 100%;
  }

  .member-card h3 {
    position: relative;
    padding-right: 20px;
  }

  .member-card h3::after {
    content: "";

    position: absolute;
    right: 18px;
    top: 50%;
    margin-top: -10px;

    padding: 0 8px;
    width: 20px;
    height: 20px;

    text-align: center;

    background-image: url(/img/imgComponents/StartVoting/drop-down-arrow.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }

  .member-card-btn {
    display: block;
  }

  .member-map {
    position: absolute;
    z-index: 5;
    top: 110px;

    width: 100%;
  }

  .member-map-none {
    display: none;
  }

  .member-map-list-item span {
    width: 100%;
    margin: 0;
    border-bottom: 1px solid #b1b1b1;
    border-radius: 0px;
  }
}
</style>
