<template>
  <section class="winner-block mxw1200 mt-6">
    <h2 class="text-center">
      {{$t("winnerBlock.head")}}
        <u v-for="(winner, id) in winners" :key="`voting${id}`">
          {{winner.voting.year}}
        </u>
      {{$t("winnerBlock.year")}}
    </h2>
    <v-container v-for="(winner, id) in winners" :key="`winner${id}`" class="mxw1200 mt-3">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
          <v-avatar size="200px">
            <img
                :src="`${URL_AVATARS}${winner.img}`"
                :alt="`${winner.name_en}`"
            >
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column align-center align-md-start">
          <div class="mb-2">
            <h3 v-if="$t('lang') === 'ru'">{{winner.name_ru}}</h3>
            <h3 v-if="$t('lang') === 'en'">{{winner.name_en}}</h3>
          </div>
          <div>
            <span v-if="$t('lang') === 'ru'">Должность: {{winner.position_ru}}</span>
            <span v-if="$t('lang') === 'en'">Position: {{winner.position_en}}</span>
          </div>
          <div>
            <span v-if="$t('lang') === 'ru'">Регион: {{winner.state_ru}}</span>
            <span v-if="$t('lang') === 'en'">Region: {{winner.state_en}}</span>
          </div>
          <div>
            <span v-if="$t('lang') === 'ru'">Город: {{winner.city_ru}}</span>
            <span v-if="$t('lang') === 'en'">City: {{winner.city_en}}</span>
          </div>
          <div>
            <span v-if="$t('lang') === 'ru'">Номинация: {{winner.nomination_ru}}</span>
            <span v-if="$t('lang') === 'en'">Nomination: {{winner.nomination_en}}</span>
          </div>
          <div class="mt-6">
            <v-btn
              color="primary"
              :to="`/participants/id/${winner.id}`"
            >
              {{$t("winnerBlock.more")}}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import config from "../../constants/config";
import axios from 'axios';

export default {
  name: "WinnerBlock",
  props: ['voting_id'],
  data() {
    return {
      URL_AVATARS: config.URL_AVATARS,
      winners: [],
    }
  },
  created() {
    this.getWinner(this.$props.voting_id,);
  },
  methods: {
    getWinner: function (id) {
      const url = config.API_URL + '/winners/voting/' + id;
      axios.get(url, {headers: {Authorization: "Bearer " + localStorage.getItem("jwt")}})
      .then(result => {
        console.log("RUSULT", result.data);
        this.setUsersArray(result.data);
      })
      .catch(error => console.error("ERROR", error));
    },
    setUsersArray: async function (data) {
      for (let i = 0; i < data.length; i++){
        const userObject = {
          id: data[i].user.id,
          tab_number: data[i].user.tab_number,
          img: data[i].user.img ? data[i].user.img  : 'null.png',
          name_ru: data[i].user.lastname_ru + ' ' + data[i].user.firstname_ru + ' ' + data[i].user.patronymic_ru,
          name_en: data[i].user.firstname_en + ' ' + data[i].user.lastname_en,
          position_ru: data[i].user.position ? data[i].user.position.value_ru : '',
          position_en: data[i].user.position ? data[i].user.position.value_en : '',
          state_ru: data[i].user.state ? data[i].user.state.value_ru : '',
          state_en: data[i].user.state ? data[i].user.state.value_en : '',
          city_ru: data[i].user.city ? data[i].user.city.value_ru : '',
          city_en: data[i].user.city ? data[i].user.city.value_en : '',
          nomination_ru: data[i].user.nomination ? data[i].user.nomination.value_ru : '',
          nomination_en: data[i].user.nomination ? data[i].user.nomination.value_en : '',
          voting: data[i].voting
        };
        this.winners.push(userObject);
      }
    },
  }
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.winner-block {

}
</style>
