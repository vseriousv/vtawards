<template>
  <section class="participant-block-id ">
    <v-container class="mxw1200">
      <v-row>
        <v-col>
          <v-card class="user-card">
            <div class="row-one">
              <div class="img-avatar">
                <img :src="`${URL_AVATARS}${user.img}`" />
              </div>
              <div class="content-user">
                <v-simple-table class="table-data-user">
                  <tbody>
                    <tr>
                      <td>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.name_ru }}</span
                        >
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.name_en }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="font-card-user"
                          >{{ $t("loginBlock.form.position") }}:
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.position_ru }}
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.position_en }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="font-card-user"
                          >{{ $t("loginBlock.form.section") }}:
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.section_ru }}
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.section_en }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="font-card-user"
                          >{{ $t("loginBlock.form.state") }}:
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.state_ru }}
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.state_en }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="font-card-user"
                          >{{ $t("loginBlock.form.city") }}:
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.city_ru }}
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.city_en }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="font-card-user"
                          >{{ $t("loginBlock.form.nomination") }}:
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'ru'">
                          {{ user.nomination_ru }}
                        </span>
                        <span class="font-card-user" v-if="$t('lang') === 'en'">
                          {{ user.nomination_en }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </div>
            <div class="card-description">
              <p v-if="$t('lang') === 'ru'" v-html="user.description_ru" />
              <p v-if="$t('lang') === 'en'" v-html="user.description_en" />
            </div>
            <div class="voting-selection">
              <v-btn
                v-if="!isCommittee"
                color="primary"
                @click.stop="setVote('user')"
                :disabled="disabledVoting"
                >{{ $t("participantID.buttonVoting") }}</v-btn
              >
              <v-select
                v-if="isCommittee && $t('lang') === 'ru'"
                outlined
                dense
                :items="itemRating_ru"
                v-model="setRating"
                :disabled="disabledVoting"
              />
              <v-select
                v-if="isCommittee && $t('lang') === 'en'"
                outlined
                dense
                :items="itemRating_en"
                v-model="setRating"
                :disabled="disabledVoting"
              />
              <v-btn
                v-if="isCommittee"
                color="primary"
                @click.stop="setVote('comittee')"
                :disabled="disabledVoting"
                >{{ $t("participantID.buttonVoting") }}</v-btn
              >
              <p class="mt-3" v-if="$t('lang') === 'ru'">
                {{ count_voting_ru }}
              </p>
              <p class="mt-3" v-if="$t('lang') === 'en'">
                {{ count_voting_en }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import JwtHelper from "../../helpers/JwtHelper";
import config from "../../constants/config";
import axios from "axios";

export default {
  name: "ParticipantBlockID",
  data() {
    return {
      user: {},
      URL_AVATARS: config.URL_AVATARS,
      itemRating_ru: [
        { text: "1 балл", value: 1 },
        { text: "2 балла", value: 2 },
        { text: "3 балла", value: 3 }
      ],
      itemRating_en: [
        { text: "1 point", value: 1 },
        { text: "2 points", value: 2 },
        { text: "3 points", value: 3 }
      ],
      setRating: 0,
      isCommittee: false,
      activeVoting: 0,
      disabledVoting: false,
      count_voting_ru: "",
      count_voting_en: ""
    };
  },
  created() {
    this.getActiveVoting();
    this.getUser();
    this.checkCommittee();
  },
  methods: {
    checkCommittee: function() {
      const jwtHeader = new JwtHelper();
      this.isCommittee = jwtHeader.isCommittee();
    },
    getUser: function() {
      const url = config.API_URL + "/users/" + this.$route.params.id;
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          // console.log(result.data)
          this.parseUserData(result.data);
        })
        .catch(e => console.error("participants-error:", e));
    },
    parseUserData: function(data) {
      const newObject = {
        img: data.img || "null.png",
        name_ru:
          data.lastname_ru + " " + data.firstname_ru + " " + data.patronymic_ru,
        name_en: data.firstname_en + " " + data.lastname_en,
        position_ru: data.position ? data.position.value_ru : "",
        position_en: data.position ? data.position.value_en : "",
        section_ru: data.section ? data.section.value_ru : "",
        section_en: data.section ? data.section.value_en : "",
        state_ru: data.state ? data.state.value_ru : "",
        state_en: data.state ? data.state.value_en : "",
        city_ru: data.city ? data.city.value_ru : "",
        city_en: data.city ? data.city.value_en : "",
        nomination_ru: data.nomination ? data.nomination.value_ru : "",
        nomination_en: data.nomination ? data.nomination.value_en : "",
        description_ru: data.description_ru,
        description_en: data.description_en,
        state_id: data.state_id
      };
      this.user = newObject;
    },
    getVotes: function(voting_id) {
      const jwtHelper = new JwtHelper();
      const url =
        config.API_URL +
        "/votes/from/" +
        jwtHelper.jwtParse().id +
        "/voting/" +
        voting_id;
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          // console.log("resultVotes", result.data);
          // Voting conditions:
          const if_1 = +jwtHelper.jwtParse().id === +this.$route.params.id;
          const if_2 = +jwtHelper.jwtParse().state_id !== +this.user.state_id;

          if (if_1) {
            this.count_voting_ru = "Вы не можете голосовать за себя";
            this.count_voting_en = "You cannot vote for yourself";
            this.disabledVoting = true;
          } else if (if_2) {
            this.count_voting_ru =
              "Вы можете голосовать только за участника своего региона";
            this.count_voting_en =
              "You can only vote for a member of your region";
            this.disabledVoting = true;
          } else {
            const userFind = result.data.find(
              item => +item.user_to_id === +this.$route.params.id
            );
            if (userFind !== undefined) {
              this.count_voting_ru = "Вы уже голосовали за этого участника";
              this.count_voting_en = "You have already voted for this member";
              this.disabledVoting = true;
            } else {
              if (jwtHelper.isCommittee()) {
                //Check committee
                for (let i = 0; i < result.data.length; i++) {
                  const count_vote = result.data[i].count_vote;
                  for (let j = 0; j < this.itemRating_ru.length; j++) {
                    if (this.itemRating_ru[j].value === count_vote) {
                      this.itemRating_ru.splice(j, 1);
                      this.itemRating_en.splice(j, 1);
                    }
                  }
                }
              } else {
                if (result.data.length === 0) {
                  this.count_voting_ru = "У вас осталось 3 голоса";
                  this.count_voting_en = "You have 3 votes left";
                  this.disabledVoting = false;
                }
                if (result.data.length === 1) {
                  this.count_voting_ru = "У вас осталось 2 голоса";
                  this.count_voting_en = "You have 2 votes left";
                  this.disabledVoting = false;
                }
                if (result.data.length === 2) {
                  this.count_voting_ru = "У вас осталось 1 голос";
                  this.count_voting_en = "You have 1 vote left";
                  this.disabledVoting = false;
                }
                if (result.data.length === 3) {
                  this.count_voting_ru = "У вас не осталось голосов";
                  this.count_voting_en = "You have no more votes";
                  this.disabledVoting = true;
                }
              }
            }
          }
        })
        .catch(err => console.log("err", err));
    },
    setVote: function(type) {
      if (type === "user") {
        this.sendVote(type, 1);
      } else {
        if (this.setRating === 0) {
          console.error("Нужно выбрать балл");
        } else {
          this.sendVote(type, this.setRating);
          this.disabledVoting = true;
        }
      }
    },
    sendVote: function(type_vote, count_vote) {
      const jwtHelper = new JwtHelper();
      const url = config.API_URL + "/votes/create";
      const dataSend = {
        user_from_id: +jwtHelper.jwtParse().id,
        user_to_id: +this.$route.params.id,
        type_vote: type_vote,
        count_vote: +count_vote,
        voting_id: +this.activeVoting
      };
      axios
        .post(url, dataSend, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => console.log("resultSend", result.data))
        .catch(err => console.log("err", err));
    },
    getActiveVoting: async function() {
      const url = config.API_URL + "/votings/isactive";
      await axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.activeVoting = result.data[0].id;
          return result.data[0].id;
        })
        .then(voting_id => {
          this.getVotes(voting_id);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.participant-block-id {
  .user-card {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    flex-direction: column;
    .row-one {
      display: flex;
      .img-avatar {
        max-width: 300px;
        width: 100%;
        max-height: 300px;
        height: 100%;
        padding: 10px;
        img {
          max-width: 100%;
          max-height: 100%;
          border: 1px double #ffb900;
          border-radius: 5px;
        }
      }
      .content-user {
        width: 100%;
        margin: 10px;
        .table-data-user {
          .font-card-user {
            font-size: 16px;
          }
        }
      }
    }
    .card-description {
      padding: 10px;
      p {
        font-size: 14px;
      }
    }
    .voting-selection {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      margin: 10px;
    }
  }
}
</style>
