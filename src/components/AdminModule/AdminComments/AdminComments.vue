<template lang="pug">
v-card(style="height: 100%")
    v-tabs.contTabs( style="background-color:white; color:#FEBA13;")
        v-tab( v-for="tabOne in tabs" :key="`items${tabOne.id}`" ) {{tabOne.name}}
        v-tab-item
            v-container.ParticipansCatalog
                //- h2 Комментарии
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
                        :items="commits"
                        :search="search_user"
                    )
                        template(v-slot:item="{ item }")
                            tr.ParticipansCatalog__row(
                                @click.stop=""
                                )
                                td.td_block.text-center
                                    .ParticipansCatalog__avatar
                                        img(:src="`${URL_AVATARS}${item.img}`")
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.name_ru }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.name_en }}
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.toNameRu }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.toNameEn }}
                                td.td_block.text-left(
                                    v-if="$t('lang') === 'ru'"
                                    style="max-width: 300px;overflow: hidden;") {{ item.comment }}


</template>

<script>
import config from "../../../constants/config";
// import axios from "axios";
import RestHelper from "../../../helpers/RestHelper";

const restHelper = new RestHelper();

export default {
    name: "AdminComments",
    data() {
        return {
        URL_AVATARS: config.URL_AVATARS,

        tabs: [{ id: 0, name: "Комментарии", value: "commits" },],

        participants: [],
        commits:[{
            id: 168,
            idTo: 4549,
            comment: "dfvdbghndcsfdvscdvfbevscsdfbfnhgnfewdfghnfrefgbfrefg ngfredfg bgfedf gfefbg bgfg bnfg nbfg bnfvb svfbgeddfbrgtnyhnbgvfdcsfvbrytsdvdfxvfxvsdbv sfxbc sfxb fdrbvfdsc",
            img: "null.png",
            name_ru: "fdvdfxdfx fvfdxcv fdfb vdfxv",
            name_en: "cvdbf",
            toNameRu: '',
            toNameEn: '',
        },
        {
            id: 168,
            idTo: 4545,
            comment: "dfvdbghn",
            img: "null.png",
            name_ru: "fdvdfxdfx fvfdxcv fdfb vdfxv",
            name_en: "cvdbf",
            toNameRu: '',
            toNameEn: '',
        }],

        headers_user: [
            { text: "Аватар", sortable: false, value: "" },
            { text: "ФИО",sortable: true, value: "name_ru" },
            { text: "Цель комментария", sortable: false, value: "" },
            { text: "Комментарий", sortable: false, value: "" },
        ],
        search_user: "",

        };
    },

    async created() {
        await this.getUserPublic();
        this.getCommits();
    },

    methods: {
        getCommits: async function() {
            const url = "/comments";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseCommitsArray(data.data);
                // console.log(data.data)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getNomination:", e);
            }
        },

        getUserPublic: async function() {
            const url = "/users";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseUserArray(data.data);
                // console.log(data.data)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getParticipants:", e);
            }
        },

        showComments: function(id) {
            this.$router.push({ path: "/comments/id/" + id });
        },

        parseCommitsArray: async function(data) {
            // this.commits= []
            for (let i = 0; i < data.length; i++) {
                const commitObject = {
                    id: data[i].id,
                    idTo: data[i].user_to_id,
                    toNameRu: '',
                    toNameEn: '',
                    comment: data[i].comment,
                    img: data[i].userFrom.img ? data[i].userFrom.img : "null.png",
                    name_ru:
                        data[i].userFrom.firstnameRu +
                        " " +
                        data[i].userFrom.patronymicRu +
                        " " +
                        data[i].userFrom.lastnameRu,
                    name_en: data[i].userFrom.firstnameEn + " " + data[i].userFrom.lastnameEn,
                };
                this.commits.push(commitObject);
            }
        },

        parseUserArray: function (data) {
            this.participants = [];
            data.forEach(item => {
                let nameUserTo = {
                    id: item.id,
                    nameRu: item.firstnameRu + " " + item.lastnameRu,
                    nameEn: item.firstnameEn + " " + item.lastnameEn,
                };
                this.UserNameTo(nameUserTo);
            })
        },

        UserNameTo: function(data) {
            this.commits.forEach(item => {
                if (item.idTo === data.id) {
                    item.toNameRu = data.nameRu
                    item.toNameEn = data.nameEn
                    console.log(item)
                }
                
            })
            
        }
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
        width: 44px
        height: 44px
        border-radius: 50%
        overflow: hidden
        margin: 5px
        img
        width: 44px
        height: 44px

</style>
