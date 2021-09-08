<template>
	<v-card>
		<v-card-title class="headline grey lighten-2" primary-title>
			{{ this.dialogHead }}
		</v-card-title>

		<v-card-text class="card-form-create">
			<v-form class="form-create">
				<v-select
					class="form-create__field"
					label="Год"
					single-line
					outlined
					v-model="votingYear"
					:items="itemsYears"
				></v-select>
				<v-select
					class="form-create__field"
					label="Тип голосования"
					single-line
					outlined
					v-model="votingType"
					:items="itemsVotingType"
				></v-select>
				<v-select
					class="form-create__field"
					label="Статус"
					single-line
					outlined
					v-model="votingStatus"
					:items="itemVotingStatus"
				></v-select>
				<span class="Error">{{ errForm }}</span>
			</v-form>
		</v-card-text>

		<v-divider></v-divider>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="green lighten-2" outlined @click.stop="sendData">
				Отправить
			</v-btn>
			<v-btn color="red lighten-2" text @click.stop="closeModal">
				Закрыть
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "VotingsModal",
	props: ["idField", "dataTable"],
	data() {
		return {
			dialogHead: "Голосование",
			dialogTable: "votings",
			itemsYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
			itemsVotingType: [
				{ text: 'Весная "народное"', value: "spring_users_voting" },
				{ text: 'Весна "звезда"', value: "spring_committee_voting" },
				{ text: 'Осень "народное"', value: "autumn_users_voting" },
				{ text: 'Осень "звезда"', value: "autumn_committee_voting" },
				{ text: "Полуфинал", value: "semifinal_voting" },
				{ text: "Финал", value: "final_voting" }
			],
			itemVotingStatus: [true, false],
			errForm: ""
		};
	},
	methods: {
		sendData: function() {
			const dataValue = {
				year: this.$store.state.votingYear,
				type_voting: this.$store.state.votingType,
				is_active: this.$store.state.votingStatus
			};
			console.log(dataValue);
			if (
				this.$store.state.votingYear === "" ||
				this.$store.state.votingType === "" ||
				this.$store.state.votingStatus === ""
			) {
				this.errForm = "Все поля обязательны для заполнения";
			} else {
				if (this.idField == null) {
					this.$emit("addFieldTable", "votings", dataValue);
				} else {
					this.$emit("updateFieldTableID", "votings", dataValue);
				}
				this.resetForm();
			}
		},
		closeModal: function() {
			this.$emit("handleReversModal");
			this.resetForm();
		},
		resetForm: function() {
			this.errForm = "";
			this.$store.commit("setVotingId", "");
			this.$store.commit("setVotingType", "");
			this.$store.commit("setVotingYear", "");
			this.$store.commit("setVotingStatus", "");
		}
	},
	computed: {
		votingId: {
			get() {
				return this.$store.state.votingId;
			},
			set(id) {
				this.$store.commit("setVotingId", id);
			}
		},
		votingYear: {
			get() {
				return this.$store.state.votingYear;
			},
			set(value) {
				this.$store.commit("setVotingYear", value);
			}
		},
		votingType: {
			get() {
				return this.$store.state.votingType;
			},
			set(value) {
				this.$store.commit("setVotingType", value);
			}
		},
		votingStatus: {
			get() {
				return this.$store.state.votingStatus;
			},
			set(value) {
				this.$store.commit("setVotingStatus", value);
			}
		},
		adminErrorStr: {
			get() {
				return this.$store.state.adminErrorStr;
			},
			set(value) {
				this.$store.commit("setAdminErrorStr", value);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.card-form-create {
	display: flex;
	justify-content: center;
	width: 100%;
	.form-create {
		width: 100%;
		margin-top: 20px;
		margin-bottom: -20px;
		.form-create__field {
		}
	}
}
.Error {
	margin-top: 25px;
	text-align: center;
	color: #ff5300;
	width: 100%;
}
</style>
