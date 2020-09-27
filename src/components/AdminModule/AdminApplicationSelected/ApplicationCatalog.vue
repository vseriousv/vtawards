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
				headers_nomination: [
					{
						text: "Таб номер",
						align: "start",
						sortable: false,
						value: "tabNumber"
					},
					// { text: "Заявитель", value: "curse" },
					{ text: "Аватар", value: "img", sortable: false, },
					{ text: "Номинант", value: "name_ru" },
					{ text: "Full name", value: "name_en" },
					{ text: "Email", value: "email" },
					{ text: "Номинация", value: "nomination", sortable: false,},
				],
				userItem: "",
				URL_AVATARS: config.URL_AVATARS,
				search_user: ""
			};
		},

		created() {
			this.getUsers();
		},

		methods: {

			showUser: function(id) {
				this.$router.push({ path: "/admin/applications/id/" + id });
			},

			getUsers: async function() {
				const url = "/nomination-order/selected";
				try {
					const { data } = await restHelper.getEntity(url, true);
					console.log(data.rows)
					this.setUsersArray(data.rows);
				} catch(e) {
					console.error("ERROR ApplicationCatalog/getUser:", e);
				}
			},

			setUsersArray: function(data) {
				for (let i = 0; i < data.length; i++) {
					const userObject = {
						idFrom: data[i].userFrom,
						id: data[i].id,
						userId: data[i].userId,
						nominationId: data[i].nominationId,
						nominationRu: data[i].nomination.valueRu,
						nominationEn: data[i].nomination.valueEn,
						argumentRu: data[i].textRu,
						document: data[i].textRu,
						img: data[i].user.img ? data[i].user.img : "null.png",
						isNew: data[i].isNew,
						email: data[i].user.email,
						tabNumber: data[i].user.tabNumber,
						name_ru:
							data[i].user.firstnameRu +
							" " +
							data[i].user.patronymicRu +
							" " +
							data[i].user.lastnameRu,
						name_en: data[i].user.firstnameEn + " " + data[i].user.lastnameEn
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
				tr.applicationCatalog__row(@click.stop="showUser(item.id)" :class="item.isNew ? 'orderRead' : 'orderNotRead'")
					td.text-left {{ item.tabNumber }}
					//- td.text-left {{ item.idFrom }}
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
.orderRead
	background-color: #F2F2F2
</style>
