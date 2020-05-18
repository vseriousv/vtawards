<template>
  <section v-if="typeVoting != ''" class="winner-all-block">
    <h2 class="text-center">
      <span v-if="typeVoting === 'semifinal_voting'"
        >{{ $t("winnersAllBlock.head.text1") }}
        {{ $t("winnersAllBlock.head.semifinal_voting") }}</span
      >
      <span v-if="typeVoting === 'autumn_committee_voting'"
        >{{ $t("winnersAllBlock.head.text1") }}
        {{ $t("winnersAllBlock.head.autumn_committee_voting") }}</span
      >
      <span v-if="typeVoting === 'autumn_users_voting'"
        >{{ $t("winnersAllBlock.head.text1") }}
        {{ $t("winnersAllBlock.head.autumn_users_voting") }}</span
      >
      <span v-if="typeVoting === 'spring_committee_voting'"
        >{{ $t("winnersAllBlock.head.text1") }}
        {{ $t("winnersAllBlock.head.spring_committee_voting") }}</span
      >
      <span v-if="typeVoting === 'spring_users_voting'"
        >{{ $t("winnersAllBlock.head.text1") }}
        {{ $t("winnersAllBlock.head.spring_users_voting") }}</span
      >
    </h2>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex winnerCards">
          <div
            class="winnerCard"
            v-for="(winner, id) in winners"
            :key="`winner${id}`"
          >
            <v-avatar size="100px">
              <img
                :src="`${URL_AVATARS}${winner.img}`"
                :alt="`${winner.name_en}`"
              />
            </v-avatar>
            <div class="mt-3 nameBlock ">
              <h5 v-if="$t('lang') === 'ru'" v-html="winner.name_ru" />
              <h5 v-if="$t('lang') === 'en'" v-html="winner.name_en" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import config from "../../constants/config";
import axios from "axios";

export default {
  name: "WinnerBlock",
  props: ["voting_id"],
  data() {
    return {
      URL_AVATARS: config.URL_AVATARS,
      winners: [],
      yearVoting: 0,
      typeVoting: ""
    };
  },
  created() {
    this.getWinner(this.$props.voting_id);
  },
  methods: {
    getWinner: function(id) {
      const url = config.API_URL + "/winners/voting/" + id;
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          console.log("RUSULT", result.data);
          this.yearVoting =
            result.data.length === 0 ? 0 : result.data[0].voting.year;
          this.typeVoting =
            result.data.length === 0 ? 0 : result.data[0].voting.type_voting;
          this.setUsersArray(result.data);
        })
        .catch(error => console.error("ERROR", error));
    },
    setUsersArray: async function(data) {
      for (let i = 0; i < data.length; i++) {
        const userObject = {
          id: data[i].user.id,
          tab_number: data[i].user.tab_number,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru:
            data[i].user.lastname_ru +
            "<br />" +
            data[i].user.firstname_ru +
            " " +
            data[i].user.patronymic_ru,
          name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en,
          position_ru: data[i].user.position
            ? data[i].user.position.value_ru
            : "",
          position_en: data[i].user.position
            ? data[i].user.position.value_en
            : "",
          state_ru: data[i].user.state ? data[i].user.state.value_ru : "",
          state_en: data[i].user.state ? data[i].user.state.value_en : "",
          city_ru: data[i].user.city ? data[i].user.city.value_ru : "",
          city_en: data[i].user.city ? data[i].user.city.value_en : "",
          nomination_ru: data[i].user.nomination
            ? data[i].user.nomination.value_ru
            : "",
          nomination_en: data[i].user.nomination
            ? data[i].user.nomination.value_en
            : "",
          voting: data[i].voting
        };
        this.winners.push(userObject);
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.winner-all-block {
  width: 100%;
  max-width: 990px;
  margin: 100px auto;
  .winnerCards {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    .winnerCard {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 10px;
      .nameBlock {
        width: 200px;
        text-align: center;
      }
    }
  }
}
</style>
