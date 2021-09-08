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
                    :items="applications"
                    :search="search_user"
                )
                    template(v-slot:item="{ item }")
                        tr.ParticipansCatalog__row
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
</template>

<script>
import config from "../../constants/config";
import JwtHelper from "../../helpers/JwtHelper";
import RestHelper from "../../helpers/RestHelper";

const restHelper = new RestHelper();
const jwtHelper = new JwtHelper();

export default {
	name: "MyApplications",

	data() {
		return {
			myId: jwtHelper.jwtParse().id,
			URL_AVATARS: config.URL_AVATARS,

			headersUserRu: [
				{ text: "Аватар", sortable: false, value: "" },
				{ text: "", sortable: false, value: "" },
				{ text: "Номинант", sortable: false, value: "" },
				{ text: "ФИО", sortable: true, value: "nameRuTo" },
				{ text: "Номинация", sortable: false, value: "" }
			],

			headersUserEn: [
				{ text: "Avatar", sortable: false, value: "" },
				{ text: "", sortable: false, value: "" },
				{ text: "Nominee", sortable: false, value: "" },
				{ text: "Full name", sortable: true, value: "nameEnTo" },
				{ text: "Nomination", sortable: false, value: "" }
			],

			user: {},

			applications: [],

			search_user: ""
		};
	},

	created() {
		this.getUser();
		this.getApplication();
	},

	methods: {
		getUser: async function() {
			const url = "/users/" + this.myId;
			try {
				const user = await restHelper.getEntity(url, true);
				this.parseUser(user.data);
				// console.log(user.data)
			} catch (e) {
				console.error("ERROR MyApplications/getUser:", e);
			}
		},

		parseUser: function(data) {
			this.user = {
				img: data.img || "null.png"
			};
		},

		getApplication: async function() {
			const url = "/nomination-order";
			try {
				const application = await restHelper.getEntity(url, true);
				this.parseApplication(application.data.rows);
				// console.log(application.data.rows)
			} catch (e) {
				console.error("ERROR MyApplications/getApplication:", e);
			}
		},

		parseApplication: function(data) {
			data.forEach(item => {
				if (item.userFrom == this.myId) {
					let application = {
						id: item.id,
						nameRuFrom: item.user.firstnameRu + " " + item.user.lastnameRu,
						nameEnFrom: item.user.firstnameEn + " " + item.user.lastnameEn,
						public: item.public,
						imgTo: item.userOrder.img || "null.png",
						nominationRu: item.nomination.valueRu,
						nominationEn: item.nomination.valueEn,
						nameRuTo:
							item.userOrder.firstnameRu + " " + item.userOrder.lastnameRu,
						nameEnTo:
							item.userOrder.firstnameEn + " " + item.userOrder.lastnameEn
					};
					this.applications.push(application);
					// console.log(this.applications)
				}
			});
		}
		// showParticipant: function(id, isPublic) {
		//     isPublic? this.showParticipantId(id): alert ("Заявка на участие в конкурсе этого пользователя еще не прошла подтверждения админимтратором.")
		// },
		// showParticipantId: function(id){
		//     this.$router.push({ path: "/nomination-order/id/" + id })
		// },
	}
};
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
