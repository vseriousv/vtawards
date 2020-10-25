<script>
	import axios from "axios";
	import config from "../../../constants/config";

	export default {
		name: "UsersCatalog",

		data() {
			return {
				isActive: true,
				users: [],
				headers_user: [
					{
						text: "Таб номер",
						align: "start",
						sortable: true,
						value: "tabNumber"
					},
					{ text: "Аватар", value: "img" },
					{ text: "ФИО", sortable: true, value: "name_ru" },
					{ text: "Full name", value: "name_en" },
					{ text: "Email", value: "email" },
					{ text: "Роль", value: "role" }
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
			createField: function() {
				this.$router.push({ path: "/admin/creat-user"});
			},

			showUser: function(id) {
				this.$router.push({ path: "/admin/users/id/" + id });
			},

			getUsers: function() {
				const url = config.API_URL + "/users";
				axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						this.setUsersArray(result.data);
						// console.log(result.data)
					})
					.catch(e => console.error("users-error:", e));
			},

			setUsersArray: async function(data) {
				for (let i = 0; i < data.length; i++) {
					const userObject = {
						id: data[i].id,
						tabNumber: data[i].tabNumber,
						img: data[i].img ? data[i].img : "null.png",
						email: data[i].email,
						role: data[i].role,
						name_ru:
							data[i].lastnameRu +
							" " +
							data[i].firstnameRu +
							" " +
							data[i].patronymicRu,
						name_en: data[i].firstnameEn + " " + data[i].lastnameEn
					};
					this.users.push(userObject);
				}
			}
		}
	};
</script>



<template lang="pug">
v-container.UsersCatalog(fluid)
	v-row.d-flex.justify-space-between.pb-4
		.UsersCatalog__search.d-flex.px-3
			v-text-field(
				v-model="search_user"
				label="Search"
				append-icon="mdi-magnify"
				outlined
				dense
				single-line
				hide-details
			)
		v-btn.UsersCatalog__addUser.mr-6(
			@click.stop="createField"
			color="green lighten-2"
			dark
			small
			outlined
		)
			v-icon mdi-plus
			span Create user


	v-row
		v-data-table.UsersCatalog__table(
			:headers="headers_user"
			:items="users"
			:search="search_user"
		)
			template(v-slot:item="{ item }")
				tr.UsersCatalog__row(@click.stop="showUser(item.id)")
					td.text-left {{ item.tabNumber }}
					td.text-left
						.UsersCatalog__avatar
							img(:src="`${URL_AVATARS}${item.img}`")
					td.text-left {{ item.name_ru }}
					td.text-left {{ item.name_en }}
					td.text-left {{ item.email }}
					td.text-left {{ item.role }}


</template>


<style lang="sass" scoped>
@import "UsersCatalog"
</style>
