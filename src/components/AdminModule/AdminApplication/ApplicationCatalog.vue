<script>
	// import axios from "axios";
	import config from "../../../constants/config";
	import RestHelper from "../../../helpers/RestHelper";

	const restHelper = new RestHelper();

	export default {
		name: "ApplicationCatalog",

		data() {
			return {
				isActive: true,
				nomination: [],
				// arr: [
				// 				{
				// 					id: 1,
				// 					userId: 1,
				// 					nominationId: 3,
				// 					textRu: "dvc fdfxvc ",
				// 					textEn: "string",
				// 				arr: [
				// 				{
				// 					id: 1,
				// 					userId: 1,
				// 					nominationId: 3,
				// 					textRu: "dvc fdfxvc ",
				// 					textEn: "string",
				// 					user: {
				// 						email: "frfgfhgfvdcfg",
				// 						tab_number: "vfgbhg",
				// 						firstname_ru: "ghbgh ",
				// 						firstname_en: "fg hn",
				// 						lastname_ru: "fgbhn",
				// 						lastname_en: "bfgnh",
				// 						patronymic_ru: "fbgnh",
				// 						patronymic_en: "dfbgnh",
				// 						nomination_id: 1,
				// 						img: "string",
				// 						}
				// 					}
				// 				],	user: {
				// 						email: "frfgfhgfvdcfg",
				// 						tab_number: "vfgbhg",
				// 						firstname_ru: "ghbgh ",
				// 						firstname_en: "fg hn",
				// 						lastname_ru: "fgbhn",
				// 						lastname_en: "bfgnh",
				// 						patronymic_ru: "fbgnh",
				// 						patronymic_en: "dfbgnh",
				// 						nomination_id: 1,
				// 						img: "string",
				// 						}
				// 					}
				// 				],
				nominationsArr: [],
				headers_nomination: [
					{
						text: "Таб номер",
						align: "start",
						sortable: false,
						value: "tab_number"
					},
					{ text: "Аватар", value: "img" },
					{ text: "ФИО", value: "name_ru" },
					{ text: "Full name", value: "name_en" },
					{ text: "Email", value: "email" },
					{ text: "Номинация", value: "nomination" },
				],
				userItem: "",
				URL_AVATARS: config.URL_AVATARS,
				search_user: ""
			};
		},

		created() {
			this.getUsers();
			this.getNomination();
		},

		methods: {
			
			showUser: function(id) {
				this.$router.push({ path: "/admin/users/id/" + id });
			},

			getUsers: async function() {
				const url = "/nomination-order";
				try {
					const userData = await restHelper.getEntity(url, true);
					console.log(userData.data.rows);
					this.setUsersArray(userData.data.rows);
					// this.setUsersArray(this.arr);
				} catch(e) {
					console.error("ERROR ApplicationCatalog/getUser:", e);
				}
			},
			getNomination: async function() {
				const url = "/nominations";
				try {
					const nominationData = await restHelper.getEntity(url, true);
					this.setNominationArray(nominationData.data);
				} catch(e) {
					console.error("ERROR ApplicationCatalog/getNomination:", e);
				}
			},

			setNominationArray: function(data) {
				for (let i = 0; i < data.length; i++) {
					const NominationObject = {
						nominationId: data[i].id,
						value_ru: data[i].value_ru,
						value_en: data[i].value_en,
					}
					this.nominationsArr.push(NominationObject)
				}
			},

			setUsersArray: function(data) {
				for (let i = 0; i < data.length; i++) {
					const userObject = {
						id: data[i].id,
						userId: data[i].userId,
						nominationId: data[i].nominationId,
						// nominationRu: data[i].nominationRu,
						// nominationEn: data[i].nominationEn,
						argumentRu: data[i].textRu,
						document: data[i].textRu,
						img: data[i].user.img ? data[i].user.img : "null.png",
						email: data[i].user.email,
						tab_number: data[i].user.tab_number,
						name_ru:
							data[i].user.firstname_ru +
							" " +
							data[i].user.patronymic_ru +
							" " +
							data[i].user.lastname_ru,
						name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en
					};
					for (let element of this.nominationsArr) {
						console.log(data[i].nominationId)
						if (element.nominationId === data[i].nominationId) {
							userObject.nominationRu = element.value_ru;
							userObject.nominationEn = element.value_en;
							console.log(userObject.nominationRu)
						}
					};
					this.nomination.push(userObject);
				}
			},
			
		}
	};
</script>



<template lang="pug">
v-container.applicationCatalog(fluid)
	v-row.d-flex.justify-space-between.pb-4
		.applicationCatalog__search.d-flex.px-3
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
		v-data-table.applicationCatalog__table(
			:headers="headers_nomination"
			:items="nomination"
			:search="search_user"
		)
			template(v-slot:item="{ item }")
				tr.applicationCatalog__row(@click.stop="showUser(item.id)")
					td.text-left {{ item.tab_number }}
					td.text-left
						.applicationCatalog__avatar
							img(:src="`${URL_AVATARS}${item.img}`")
					td.text-left {{ item.name_ru }}
					td.text-left {{ item.name_en }}
					td.text-left {{ item.email }}
					td.text-left {{ item.nominationRu }}

</template>


<style lang="sass" scoped>
@import "ApplicationCatalog"
</style>
