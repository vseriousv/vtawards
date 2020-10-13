<template lang="pug">
  v-card(style="height: 100%")
    v-container.ParticipansCatalog
        v-row.d-flex.pb-4.ParticipansCatalog__boxBtn
            .ParticipansCatalog__search.d-flex.px-3
                v-text-field(
                v-model="search_user"
                label="Search"
                append-icon="mdi-magnify"
                outlined
                dense
                single-line
                hide-details
                )
        v-row
            v-data-table.ParticipansCatalog__table(
                :headers="this.$t('lang') === 'ru'? headersUserRu: headersUserEn"
                :items="nominations"
                :search="search_user"
            )
                template(v-slot:item="{ item }")
                    tr.ParticipansCatalog__row(
                        @click.stop="showParticipant(item.id, item.public)"
                        )
                        td.td_block.text-center
                            .ParticipansCatalog__avatar
                                img(:src="`${URL_AVATARS}${user.img}`")
                        td.td_block.text-left.mdi.mdi-chevron-double-right(style="color: orange; font-size: 18px;")
                        td.td_block.text-center
                            .ParticipansCatalog__avatar
                                img(:src="`${URL_AVATARS}${item.imgTo}`")
                        td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'ru'") {{item.nameRuTo}}
                        td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'en'") {{item.nameEnTo}}
                        td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'ru'") {{item.nominationRu}}
                        td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'en'") {{item.nominationEn}}
                        td.td_block.text-left(v-if="item.public === true && $t('lang') === 'ru'" style="color: green;") Опубликован
                        td.td_block.text-left(v-if="item.public === true && $t('lang') === 'en'" style="color: green;") Public
                        td.td_block.text-left(v-if="item.public === false && $t('lang') === 'ru'" style="color: red;") Неопубликован
                        td.td_block.text-left(v-if="item.public === false && $t('lang') === 'en'" style="color: red;") Not Public
</template>

<script>
import config from "../../constants/config";
import axios from "axios";
export default {
  name: "ResultsVoting",
  data() {
    return {
      committee: [],
      URL_AVATARS: config.URL_AVATARS,

      headersUserRu: [
          { text: "Аватар", sortable: false, value: "" },
          { text: "",sortable: false, value: "" },
          { text: "Номинант", sortable: false, value: "" },
          { text: "ФИО", sortable: true, value: "nameRuTo" },
          { text: "Номинация", sortable: false, value: "" },
          { text: "Статус", sortable: false, value: "" },
      ],

      headersUserEn: [
          { text: "Avatar", sortable: false, value: "" },
          { text: "",sortable: false, value: "" },
          { text: "Nominee", sortable: false, value: "" },
          { text: "Full name", sortable: true, value: "nameEnTo" },
          { text: "Nomination", sortable: false, value: "" },
          { text: "Status", sortable: false, value: "" },
      ],

      nominations: [],
      search_user: "",
    };
  },
  created() {
    this.getCommittee();
  },
  methods: {
    getCommittee: function() {
      const url = config.API_URL + "/participants/isactive";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          console.log(result.data);
          this.setUsersArray(result.data);
        })
        .catch(e => console.error("committee-error:", e));
    },
    setUsersArray: async function(data) {
      for (let i = 0; i < data.length; i++) {
        let committee_avg = 0;
        if (data[i].result) {
          committee_avg =
            data[i].result.committee_votes !== 0
              ? +data[i].result.committee_votes /
                +data[i].result.committee_rating
              : 0;
        }

        const userObject = {
          id: data[i].user.id,
          tabNumber: data[i].user.tabNumber,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru:
            data[i].user.firstname_ru +
            " " +
            data[i].user.patronymic_ru +
            " " +
            data[i].user.lastname_ru,
          name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en,

          committee_rating: data[i].result ? data[i].result.committee_votes : 0,
          count_committee_votes: data[i].result
            ? data[i].result.committee_rating
            : 0,
          sr_rating: committee_avg,
          count_votes: data[i].result ? data[i].result.votes : 0,
          result_rating: data[i].result ? data[i].result.summ : 0
        };
        this.committee.push(userObject);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.result-voting {
  width: 100%;
  min-height: 600px;
  margin-top: 50px;
  .tableAll {
    width: 100%;
    height: 100%;
    .manageDelete {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .manageBTN {
        margin: 0 10px;
      }
    }
    .tr_row {
      .avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px;
        img {
          width: 44px;
          height: 44px;
        }
      }
      .td_block {
        min-height: 63px;
      }
    }
  }
}
</style>
