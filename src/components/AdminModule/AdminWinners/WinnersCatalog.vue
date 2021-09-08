<script>
import axios from "axios";
import config from "../../../constants/config";
export default {
	name: "MemberCatalog",

	data() {
		return {
			winners: [],
			headers_winners: [
				{
					text: "Таб номер",
					align: "start",
					value: "tabNumber"
				},
				{ text: "Аватар", value: "img" },
				{ text: "ФИО", value: "name_ru" },
				{ text: "Год голосования", value: "year" },
				{ text: "Тип голосования", value: "type" },
				{ text: "Модификация", value: "modify", align: "end", sortable: false }
			],
			userItem: "",
			search_winner: "",
			URL_AVATARS: config.URL_AVATARS
		};
	},

	created() {
		this.getWinners();
	},

	methods: {
		createField: function() {
			this.$emit("handleModal", null, "winners");
		},

		updateWinnersID: function(id) {
			this.$store.commit("setWinnerId", "");
			this.$store.commit("setWinnerUser_Id", "");
			this.$store.commit("setWinnerVotingId", "");
			this.$store.commit(
				"setWinnerId",
				this.winners.find(item => item.id === id).id
			);
			this.$store.commit(
				"setWinnerUser_Id",
				this.winners.find(item => item.id === id).user_id
			);
			this.$store.commit(
				"setWinnerVotingId",
				this.winners.find(item => item.id === id).voting_id
			);
			this.$emit("handleModal", id, "winners");
		},

		getWinners: function() {
			const url = config.API_URL + "/winners";
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.setUsersArray(result.data);
				})
				.catch(e => console.error("winners-error:", e));
		},

		setUsersArray: async function(data) {
			for (let i = 0; i < data.length; i++) {
				const userObject = {
					id: data[i].user.id,
					tabNumber: data[i].user.tabNumber,
					img: data[i].user.img ? data[i].user.img : "null.png",
					name_ru:
						data[i].user.firstname_ru +
						" " +
						data[i].user.lastname_ru +
						" " +
						data[i].user.patronymic_ru,
					year: data[i].voting ? data[i].voting.year : "",
					type: data[i].voting ? data[i].voting.type_voting : ""
				};
				this.winners.push(userObject);
			}
		},

		removeWinners: function(id) {
			const url = config.API_URL + "/winners/" + id;
			axios
				.delete(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.getWinners();
					return result;
				})
				.catch(e => console.error("winners-error:", e));
		},

		showUser: function(id) {
			this.$router.push({ path: "/admin/users/id/" + id });
		}
	}
};
</script>

<template lang="pug">
	v-container.WinnersTool(fluid)
		v-row.d-flex.justify-space-between.pb-4.px-3
			.WinnersTool__search.d-flex.justify-space-between
				v-text-field(
					v-model="search_winner"
					label="Search"
					append-icon="mdi-magnify"
					outlined
					dense
					single-line
					hide-details
				)
			.WinnersTool.d-flex.justify-end
				.WinnersCatalog__create.px-2
					v-btn.manageBTN(
						@click.stop="createField"
						color="green lighten-2"
						dark
						small
						outlined
					)
						v-icon mdi-plus
						span Create
				.WinnersCatalog__update.px-2
					v-btn.manageBTN(
						@click.stop="getWinners"
						color="green lighten-2"
						dark
						small
					)
						v-icon mdi-refresh
						span Update


		v-row.WinnersTable
			v-data-table.WinnersTable__table(
				:headers="headers_winners"
				:items="winners"
				:search="search_winner"
			)
				template(v-slot:item="{ item }")
					tr.WinnersTable__row(@click.stop="showUser(item.id)")
						td.text-left {{ item.tabNumber }}
						td.text-left
							.WinnersTable__avatar
								img(:src="`${URL_AVATARS}${item.img}`")
						td.text-left {{ item.name_ru }}
						td.text-left {{ item.year }}
						td.text-left {{ item.type }}
						td.WinnersTable__field.WinnersTable__btn.d-flex.justify-end.align-center
							v-btn.WinnersCatalog__btn--delete(
								@click.stop="updateVotingID(item.id)"
								color="green lighten-2"
								dark
								small
								icon
							)
								v-icon mdi-update
							v-btn.WinnersTable__btn--delete(
								@click.stop="removeVoting(item.id)"
								color="red lighten-2"
								dark
								small
								icon
							)
								v-icon mdi-delete
</template>

<style lang="scss" scoped>
@import "WinnersCatalog";
</style>
