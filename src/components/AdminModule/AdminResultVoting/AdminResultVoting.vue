<template lang="pug">
v-card(style="height: 100%")
    v-tabs.contTabs( style="background-color:white; color:#FEBA13;")
        v-tab( v-for="tabOne in tabs" :key="`items${tabOne.id}`" ) {{tabOne.name}}
        v-tab-item
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
                        :headers="headers_user"
                        :items="allVoting"
                        :search="search_user"
                    )
                        template(v-slot:item="{ item }")
                            tr.ParticipansCatalog__row
                                td.td_block.text-left {{ item.id }}
                                td.td_block.text-left
                                    .ParticipansCatalog__avatar
                                        img(:src="`${URL_AVATARS}${item.img}`")
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.nameRuFrom }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.nameEnFrom}}
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.nameRuTo }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.nameEnTo }}
                                td.td_block.text-center {{ item.range }}
                                td.td_block.text-center {{ item.type }}
                                
</template>

<script>
import config from "../../../constants/config";
// import axios from "axios";
import RestHelper from "../../../helpers/RestHelper";

const restHelper = new RestHelper();

export default {
    name: "AdminResultVoting",
    data() {
        return {
            URL_AVATARS: config.URL_AVATARS,

            tabs: [{ id: 0, name: "Итоги голосования", value: "votig" },],

            allVoting: [],

            headers_user: [
                { text: "ID", sortable: true, value: "id", },
                { text: "Аватар", sortable: false, value: "",},
                { text: "ФИО",sortable: true, value: "nameRuFrom", },
                { text: "Цель голоса", sortable: true, value: "nameRuTo" },
                { text: "Балл", sortable: false, value: "range",align: 'center' },
                { text: "Тип", sortable: true, value: "type", align: 'center'},
            ],
            search_user: "",
        };
    },

    async created() {
        await this.getUserVoting();
    },

    methods: {
        getUserVoting: async function() {
            const url = "/user-voting";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseUserArray(data.data.rows);
                console.log(data.data.rows)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getParticipants:", e);
            }
        },

        parseUserArray: function (data) {
            data.forEach(item => {
                const voting = {
                    id: item.id,
                    range: item.range,
                    img: item.img || "null.png",
                    nameRuFrom: item.user.firstnameRu + " " + item.user.lastnameRu,
                    nameEnFrom: item.user.firstnameEn + " " + item.user.lastnameEn,
                    nameRuTo: item.nominationOrder.user.firstnameRu + " " + item.nominationOrder.user.lastnameRu,
                    nameEnTo: item.nominationOrder.user.firstnameEn + " " + item.nominationOrder.user.lastnameEn,
                    type: item.type,

                };
                this.allVoting.push(voting);
            })
        },

    }
}
</script>

<style lang="sass" scoped>
.selectNomination.selectStates
    max-width: 300px
    margin-right: 20px
.ParticipansCatalog
    background-color: #fff
    padding: 20px 20px 20px
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
