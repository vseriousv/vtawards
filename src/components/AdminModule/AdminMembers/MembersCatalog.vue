<script>
import axios from "axios";
import config from "../../../constants/config";
export default {
	name: "MemberCatalog",
	data() {
		return {
			participants: [],
			URL_AVATARS: config.URL_AVATARS
		};
	},
	created() {
		this.getParticipants();
	},
	methods: {
		createField: function() {
			this.$emit("handleModal", null, "participants");
		},
		updateParticipantsID: function(id) {
			this.$store.commit("setMemberId", "");
			this.$store.commit("setMemberUser_Id", "");
			this.$store.commit("setMemberVotingId", "");
			this.$store.commit(
				"setMemberId",
				this.participants.find(item => item.id === id).id
			);
			this.$store.commit(
				"setMemberUser_Id",
				this.participants.find(item => item.id === id).user_id
			);
			this.$store.commit(
				"setMemberVotingId",
				this.participants.find(item => item.id === id).voting_id
			);
			this.$emit("handleModal", id, "participants");
		},
		getParticipants: function() {
			const url = config.API_URL + "/participants";
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.setUsersArray(result.data);
				})
				.catch(e => console.error("participants-error:", e));
		},
		setUsersArray: async function(data) {
			this.participants = [];
			for (let i = 0; i < data.length; i++) {
				const userObject = {
					id: data[i].user.id,
					tabNumber: data[i].user.tabNumber,
					img: data[i].user.img ? data[i].user.img : "null.png",
					name_ru:
						data[i].user.firstname_ru +
						" " +
						data[i].user.patronymic_ru +
						" " +
						data[i].user.lastname_ru,
					name_en:
						data[i].user.firstname_en +
						" " +
						data[i].user.patronymic_en +
						" " +
						data[i].user.lastname_en,
					voting: data[i].voting
				};
				this.participants.push(userObject);
			}
		},
		removeParticipants: function(id) {
			const url = config.API_URL + "/participants/" + id;
			axios
				.delete(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.getParticipants();
					return result;
				})
				.catch(e => console.error("participants-error:", e));
		},

		showUser: function(id) {
			this.$router.push({ path: "/admin/users/id/" + id });
		}
	}
};
</script>

<template lang="pug">
	v-container.contTabs(fluid)
		v-row.ParticipantTool.d-flex.justify-end
			.ParticipantTool__create
				v-btn.manageBTN(
					@click.stop="createField"
					color="green lighten-2"
					dark
					small
					outlined
				)
					v-icon mdi-plus
					span Create
			.ParticipantTool__update
				v-btn.manageBTN(
					@click.stop="getParticipants"
					color="green lighten-2"
					dark
					small
				)
					v-icon mdi-refresh
					span Update

		v-row.ParticipantTable
			v-simple-table.ParticipantTable__table
				template(v-slot:default)
					thead
						tr
							th.text-left Номер
							th.text-left Аватар
							th.text-left Имя
							th.text-left Год голосования
							th.text-left Тип голосования
							th.text-right Удалить/Исправить
					tbody
						tr(
							v-for="(itemField, id) in participants"
							:key="`itemField${itemField.id}`"
							@click.stop="showUser(itemField.id)"
						)
							td.ParticipantTable__field {{ id + 1 }}
							td.ParticipantTable__field
								.ParticipantTable__avatar
									img(:src="`${URL_AVATARS}${itemField.img}`")
							td.ParticipantTable__field {{ itemField.name_ru  }}
							td.ParticipantTable__field {{ itemField.voting.year  }}
							td.ParticipantTable__field {{ itemField.voting.type_voting }}
							td.ParticipantTable__field.ParticipantTable__btn.d-flex.justify-end.align-center
								v-btn.ParticipantTable__btn--delete(
									@click.stop="updateParticipantsID(itemField.id)"
									color="green lighten-2"
									dark
									small
									icon
								)
									v-icon mdi-update
								v-btn.ParticipantTable__btn--delete(
									@click.stop="removeParticipants(itemField.id)"
									color="red lighten-2"
									dark
									small
									icon
								)
									v-icon mdi-delete
</template>

<style lang="sass" scoped>
@import "AdminMembers"
</style>
