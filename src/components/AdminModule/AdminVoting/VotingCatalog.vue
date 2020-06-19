<script>
	import axios from "axios";
	import config from "../../../constants/config";
	export default {
		name: "VotingCatalog",
		data() {
			return {
				voting: []
			};
		},
		created() {
			this.getVoting();
		},
		methods: {
			createField: function() {
				this.$emit("handleModal", null, "votings");
			},
			updateVotingID: function(id) {
				this.$store.commit("setVotingYear", "");
				this.$store.commit("setVotingType", "");
				this.$store.commit(
					"setVotingYear",
					this.voting.find(item => item.id === id).year
				);
				this.$store.commit(
					"setVotingType",
					this.voting.find(item => item.id === id).type_voting
				);
				this.$emit("handleModal", id, "votings");
			},
			getVoting: function() {
				const url = config.API_URL + "/votings";
				axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => (this.voting = result.data))
					.catch(e => console.error("voting-error:", e));
			},
			removeVoting: function(id) {
				const url = config.API_URL + "/votings/" + id;
				axios
					.delete(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						this.getVoting();
						return result;
					})
					.catch(e => console.error("voting-error:", e));
			}
		}
	};
</script>

<template lang="pug">
v-container.contTabs(fluid)
		v-row.VotingTool.d-flex.justify-end
			.VotingTool__create
				v-btn.manageBTN(
					@click.stop="createField"
					color="green lighten-2"
					dark
					small
					outlined
				)
					v-icon mdi-plus
					span Create
			.VotingTool__update
				v-btn.manageBTN(
					@click.stop="getVoting"
					color="green lighten-2"
					dark
					small
				)
					v-icon mdi-refresh
					span Update

		v-row.VotingTable
			v-simple-table.VotingTable__table
				template(v-slot:default)
					thead
						tr
							th.text-left Номер
							th.text-left Год
							th.text-left Тип голосования
							th.text-left Статус
							th.text-right Удалить/Исправить
					tbody
						tr(
							v-for="(itemField, id) in voting"
							:key="`itemField${itemField.id}`"
						)
							td.VotingTable__field {{ id + 1 }}
							td.VotingTable__field {{ itemField.year  }}
							td.VotingTable__field {{ itemField.type_voting }}
							td.VotingTable__field
								v-checkbox(
									v-model="itemField.is_active"
									readonly
									dense
								)
							td.VotingTable__field.VotingTable__btn.d-flex.justify-end.align-center
								v-btn.VotingTable__btn--delete(
									@click.stop="updateVotingID(itemField.id)"
									color="green lighten-2"
									dark
									small
									icon
								)
									v-icon mdi-update
								v-btn.VotingTable__btn--delete(
									@click.stop="removeVoting(itemField.id)"
									color="red lighten-2"
									dark
									small
									icon
								)
									v-icon mdi-delete
</template>

<style lang="sass" scoped>
@import "AdminVoting"
</style>
