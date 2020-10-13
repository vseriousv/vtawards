<template lang="pug">
  v-card(style="height: 100%")
    .ParticipansCatalog
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
import RestHelper from "../../helpers/RestHelper";

const restHelper = new RestHelper();

export default {
  name: "ResultsVoting",
  data() {
    return {
      committee: [],
      URL_AVATARS: config.URL_AVATARS,

      headersUserRu: [
          { text: "Аватар", sortable: false, value: "" },
          { text: "ФИО", sortable: true, value: "nameRu" },
          { text: "Номинация", sortable: false, value: "" },
          { text: "Регион", sortable: false, value: "" },
          { text: "Голоса", sortable: false, value: "" },
      ],

      headersUserEn: [
          { text: "Avatar", sortable: false, value: "" },
          { text: "Full name", sortable: true, value: "nameEn" },
          { text: "Nomination", sortable: false, value: "" },
          { text: "State", sortable: false, value: "" },
          { text: "Voices", sortable: false, value: "" },
      ],

      nominations: [],
      search_user: "",
    };
  },
  created() {
    this.getParticipants();
  },
  methods: {
    getParticipants: async function() {
      const url = "/nomination-order/public?filter={}";
      try {
          const data = await restHelper.getEntity(url, true);
          this.setParticipantsArray(data.data.rows, true);
      } catch(e) {
          console.error("ERROR ParticipantsBlock/getParticipants:", e);
      }
    },
    
  }
};
</script>

<style lang="sass" scoped>
.selectNomination,.selectStates
  max-width: 300px
  margin-right: 20px
.ParticipansCatalog
  padding: 30px 20px 20px
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
