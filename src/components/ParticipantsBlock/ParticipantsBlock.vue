<template lang="pug">
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

      .ParticipansCatalog__select
        v-select.selectNomination(
          v-model="nominationSelect"
          item-text="text"
          item-value="value"
          :items="$t('lang') === 'ru'? nominationRu: nominationEn"
          :label=`$t("ApplicationForm.nominationLabel")`
          dense
          outlined
        )
        v-select.selectStates(
          v-model="statesSelect"
          item-text="text"
          item-value="value"
          :items="$t('lang') === 'ru'? statesRu: statesEn"
          :label="$t('lang') === 'ru'? 'Выбрать регион': 'Select State'"
          dense
          outlined
        )

    v-row
      v-data-table.ParticipansCatalog__table(
        :headers="this.$t('lang') === 'ru'? headers_userRu: headers_userEn"
        :items="participants"
        :search="search_user"
      )
        template(v-slot:item="{ item }")
          tr.ParticipansCatalog__row(
              @click.stop="showParticipant(item.id)"
            )
            td.td_block.text-center
              .ParticipansCatalog__avatar
                img(:src="`${URL_AVATARS}${item.img}`")
            td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.name_ru }}
            td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.name_en }}
            td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.nomination_ru }}
            td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.nomination_en }}
            td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.state_ru }}
            td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.state_en }}


</template>

<script>
import config from "../../constants/config";
import RestHelper from "../../helpers/RestHelper";

const restHelper = new RestHelper();

export default {
  name: "ParticipantsBlock",
  data() {
    return {
      participants: [],
      statesRu:[],
      statesEn:[],
      statesSelect: 0,

      nominationRu: [],
      nominationEn: [],
      nominationSelect: 0,

      URL_AVATARS: config.URL_AVATARS,

      headers_userRu: [
        { text: "Аватар", sortable: false,value: "img" },
        { text: "ФИО", value: "name_ru" },
        { text: "Номинация", sortable: false, value: "nomination" },
        { text: "Регион", sortable: false, value: "state" },
      ],
      headers_userEn: [
        { text: "Avatar", sortable: false,value: "img" },
        { text: "Full name", value: "name_en" },
        { text: "Nomination", sortable: false, value: "nomination" },
        { text: "Region", sortable: false, value: "state" },
      ],
      search_user: "",
      users: [],
    };
  },

  created() {
    this.getParticipants();
    this.getNomination();
    this.getState();
  },

  watch: {
    nominationSelect: function(newVal, oldVal) {
      if (newVal==0) {
        this.participants = this.users
      }
      if (newVal>0 && oldVal!==null && newVal!==oldVal) {
        this.getParticipantsFromIdNomination(newVal, this.statesSelect);
      }
    },
		statesSelect: function(newVal, oldVal) {
      if (newVal==0) {
        this.participants = this.users
      }
      if (newVal>0 && oldVal!==null && newVal!==oldVal) {
				this.getParticipantsFromIdNomination(this.nominationSelect, newVal);
      }
    },
  } ,

  methods: {

    getParticipantsFromIdNomination: async function(nominationId, stateId) {
      const url = `/nomination-order/public?filter={"nominationId":${nominationId},"stateId":${stateId}}`;
      try {
          const data = await restHelper.getEntity(url, true);
          this.setParticipantsArray(data.data.rows, false);
          // console.log(this.users)
      } catch(e) {
          console.error("ERROR ParticipantsBlock/getParticipantsFromIdNomination:", e);
      }
    },


    showParticipant: function(id) {
      // this.$router.push({ path: "/nomination-order/id/" + id });
      const data = this.$router.resolve({ path: "/nomination-order/id/" + id });
      window.open(data.href, '_blank');
    },

    getParticipants: async function() {
      const url = "/nomination-order/public?filter={}";
      try {
          const data = await restHelper.getEntity(url, true);
          this.setParticipantsArray(data.data.rows, true);
      } catch(e) {
          console.error("ERROR ParticipantsBlock/getParticipants:", e);
      }
    },

    setParticipantsArray: async function(data, props) {
      this.participants= []
      for (let i = 0; i < data.length; i++) {
        const userObject = {
          id: data[i].id,
          tabNumber: data[i].user.tabNumber,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru:
            data[i].user.firstnameRu +
            " " +
            data[i].user.patronymicRu +
            " " +
            data[i].user.lastnameRu,
          name_en: data[i].user.firstnameEn + " " + data[i].user.lastnameEn,
          state_ru: data[i].user.state ? data[i].user.state.value_ru : "",
          state_en: data[i].user.state ? data[i].user.state.value_en : "",
          nominationId: data[i].nominationId,
          nomination_ru: data[i].nomination
            ? data[i].nomination.valueRu
            : "",
          nomination_en: data[i].nomination
            ? data[i].nomination.valueEn
            : "",
          voting: data[i].voting
        };
        this.participants.push(userObject);
      }
      if (props === true) {
          this.users = [...this.participants];
        }
    },

    getNomination: async function() {
      const url = "/nominations";
      try {
          const data = await restHelper.getEntity(url, true);
          this.parseNominationArray(data.data);
          // console.log(data)
      } catch(e) {
          console.error("ERROR ParticipantsBlock/getNomination:", e);
      }
    },

    parseNominationArray: function (data) {
      this.nominationRu = [];
      this.nominationEn = [];
      this.nominationRu.push({
          text: "ВСЕ НОМИНАЦИИ",
          value: 0})
      this.nominationEn.push({
          text: "ALL NOMINATIONS",
          value: 0})
      data.forEach(nomin => {
        let nominationRu = {
          text: nomin.valueRu,
          value: nomin.id
        };
        let nominationEn= {
          text: nomin.valueEn,
          value: nomin.id
        }
        this.nominationRu.push(nominationRu);
        this.nominationEn.push(nominationEn);
      })
    },

    getState: async function() {
      const url = "/states";
      try {
          const data = await restHelper.getEntity(url, true);
          this.parseStateArray(data.data);
      } catch(e) {
          console.error("ERROR ParticipantsBlock/getNomination:", e);
      }
    },

    parseStateArray: function (data) {
      this.statesRu = [];
      this.statesEn = [];
      this.statesRu.push({
          text: "ВСЕ РЕГИОНЫ",
          value: 0})
      this.statesEn.push({
          text: "ALL REGIONS",
          value: 0})
      data.forEach(states => {
        let statesRu = {
          text: states.value_ru,
          value: states.id
        };
        let statesEn= {
          text: states.value_en,
          value: states.id
        }
        this.statesRu.push(statesRu);
        this.statesEn.push(statesEn);
      })
    },
  }
};
</script>

<style lang="sass" scoped>
.selectNomination,.selectStates
  max-width: 300px
  margin-right: 20px
.ParticipansCatalog
  padding: 50px 20px 20px
  &__boxBtn
    align-items: flex-start
    justify-content: space-between
  &__select
    display: flex
    flex-direction: row
  &__addUser
    margin: 0 10px

  &__table
    width: 100%
    height: 100%

  &__row
    width: 100%

  &__avatar
    display: flex
    width: 44px
    height: 44px
    overflow: hidden
    margin: 5px
    img
        border-radius: 50%
        max-width: 44px
        max-height: 44px
        width: 100%
        height: 100%
        object-fit: cover

</style>
