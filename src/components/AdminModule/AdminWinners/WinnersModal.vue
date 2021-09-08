<template>
	<v-card>
		<v-card-title class="headline grey lighten-2" primary-title>
			{{ this.dialogHead }}
		</v-card-title>

		<v-card-text class="card-form-create">
			<v-form class="form-create">
				<v-autocomplete
					class="form-create__field"
					label="Пользователь"
					single-line
					outlined
					v-model="winnerUser_Id"
					:items="usersItems"
				></v-autocomplete>
				<v-autocomplete
					class="form-create__field"
					label="Голосование"
					single-line
					outlined
					v-model="winnerVotingId"
					:items="votingsItems"
				></v-autocomplete>
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
import config from "../../../constants/config";
import axios from "axios";

export default {
	name: "WinnersModal",
	props: ["idField", "dataTable"],
	data() {
		return {
			dialogHead: "Победители",
			dialogTable: "winners",
			usersItems: [],
			votingsItems: [],
			errForm: ""
		};
	},
	created() {
		this.getTable("users");
		this.getTable("votings");
	},
	methods: {
		sendData: function() {
			const dataValue = {
				user_id: this.$store.state.winnerUser_Id,
				voting_id: this.$store.state.winnerVotingId
			};
			if (
				this.$store.state.winnerUser_Id === "" ||
				this.$store.state.winnerVotingId === ""
			) {
				this.errForm = "Все поля обязательны для заполнения";
			} else {
				if (this.idField == null) {
					this.$emit("addFieldTable", "winners", dataValue);
				} else {
					this.$emit("updateFieldTableID", "winners", dataValue);
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
			this.$store.commit("setWinnerId", "");
			this.$store.commit("setWinnerUser_Id", "");
			this.$store.commit("setWinnerVotingId", "");
		},
		getTable: function(table) {
			const url = config.API_URL + "/" + table;
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					switch (table) {
						case "users":
							this.usersItems = this.parserUserData(result.data);
							break;
						case "votings":
							this.votingsItems = this.parserVotingsData(result.data);
							break;
						default:
							console.log("ERROR");
							break;
					}
				})
				.catch(e => console.error("users or votings -error:", e));
		},
		parserUserData: function(data) {
			let resultDataRu = [];
			// let resultDataEn = [];
			for (let i = 0; i < data.length; i++) {
				const text_ru =
					data[i].tabNumber +
					": " +
					data[i].firstname_ru +
					" " +
					data[i].lastname_ru +
					" " +
					data[i].patronymic_ru;
				// const text_en = data[i].value_en;
				const code = data[i].id;
				resultDataRu.push({ text: text_ru, value: code });
				// resultDataEn.push({text: text_en, value: code });
			}
			return resultDataRu;
		},
		parserVotingsData: function(data) {
			let resultDataRu = [];
			// let resultDataEn = [];
			for (let i = 0; i < data.length; i++) {
				const text_ru = data[i].year + " " + data[i].type_voting;
				// const text_en = data[i].value_en;
				const code = data[i].id;
				resultDataRu.push({ text: text_ru, value: code });
				// resultDataEn.push({text: text_en, value: code });
			}
			return resultDataRu;
		}
	},
	computed: {
		winnerId: {
			get() {
				return this.$store.state.winnerId;
			},
			set(id) {
				this.$store.commit("setWinnerId", id);
			}
		},
		winnerUser_Id: {
			get() {
				return this.$store.state.winnerUser_Id;
			},
			set(value) {
				this.$store.commit("setWinnerUser_Id", value);
			}
		},
		winnerVotingId: {
			get() {
				return this.$store.state.winnerVotingId;
			},
			set(value) {
				this.$store.commit("setWinnerVotingId", value);
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
