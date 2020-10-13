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
                        :items="commits"
                        :search="search_user"
                    )
                        template(v-slot:item="{ item }")
                            tr.ParticipansCatalog__row(
                                @click.stop="showComments(item.id)"
                                )
                                td.td_block.text-center
                                    .ParticipansCatalog__avatar
                                        img(:src="`${URL_AVATARS}${item.img}`")
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.name_ru }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.name_en }}
                                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.toNameRu }}
                                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.toNameEn }}
                                td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'ru'") {{ item.comment }}
                                td.td_block.text-left.ParticipansCatalog__commit(v-if="$t('lang') === 'en'") {{ item.comment }}
                                td.td_block.text-left(v-if="item.public === true" style="color: green;") Опубликован
                                td.td_block.text-left(v-if="item.public === false" style="color: red;") Неопубликован

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

        allUser: [],

        commits:[],

        headers_user: [
            { text: "Аватар", sortable: false, value: "" },
            { text: "ФИО",sortable: true, value: "name_ru" },
            { text: "Цель комментария", sortable: true, value: "toNameRu" },
            { text: "Комментарий", sortable: false, value: "" },
            { text: "Статус", sortable: false, value: "" },
        ],
        search_user: "",
        };
    },

    async created() {
        await this.getAllUser();
        await this.getCommits();
        await this.getUserPublic();
    },

    methods: {
        getCommits: async function() {
            const url = "/comments";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseCommitsArray(data.data.rows);
                // console.log(data.data.rows)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getNomination:", e);
            }
        },

        getUserPublic: async function() {
            const url = "/nomination-order/public?filter={}";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseUserArray(data.data.rows);
                console.log(data.data.rows)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getParticipants:", e);
            }
        },

        getAllUser: async function() {
            const url = "/users";
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseAllUser(data.data);
                // console.log(data.data)
            } catch(e) {
                console.error("ERROR ParticipantsBlock/getAllUser:", e);
            }
        },

        showComments: function(id) {
            this.$router.push({ path: "/admin/comment/id/" + id });
        },

        parseCommitsArray: async function(data) {
            this.commits= []
            for (let i = 0; i < data.length; i++) {
                const commitObject = {
                    id: data[i].id,
                    idTo: data[i].nominationOrderId,
                    idFrom: data[i].userFromId,
                    toNameRu: '',
                    toNameEn: '',
                    comment: data[i].comment,
                    img: '',
                    name_ru: '',
                    name_en: '',
                    public: data[i].public,
                };
                this.addDataFromUser(commitObject)
                this.commits.push(commitObject);
            }
        },

        parseUserArray: function (data) {
            data.forEach(item => {
                let nameUserTo = {
                    id: item.id,
                    nameRu: item.user.firstnameRu + " " + item.user.lastnameRu,
                    nameEn: item.user.firstnameEn + " " + item.user.lastnameEn,
                };
                this.UserNameTo(nameUserTo);
            })
        },

        UserNameTo: function(data) {
            this.commits.forEach(item => {
                if (item.idTo === data.id) {
                    item.toNameRu = data.nameRu
                    item.toNameEn = data.nameEn
                }
                // console.log(this.commits)
            })
        },

        parseAllUser: function(data){
            this.allUser = []
            data.forEach(item => {
                let dataUser = {
                    id: item.id,
                    img: item.img,
                    name_ru: item.firstnameRu + " " + item.lastnameRu,
                    name_en: item.firstnameEn + " " + item.lastnameEn,
                }
                this.allUser.push(dataUser)
            })
            // console.log(this.allUser)
        },

        addDataFromUser: function(data) {
            this.allUser.forEach(item => {
                if (item.id === data.idFrom) {
                    data.img = item.img
                    data.name_ru = item.name_ru
                    data.name_en = item.name_en
                }
                // console.log(data)
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

    &__commit
        overflow: hidden
        white-space: nowrap
        max-width: 300px
        text-overflow: ellipsis
</style>
