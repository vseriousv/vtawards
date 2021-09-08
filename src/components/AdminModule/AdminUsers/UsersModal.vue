<template>
	<v-card>
		<v-card-title class="headline grey lighten-2" primary-title>
			{{ this.dialogHead }}
		</v-card-title>

		<v-card-text class="card-form-create">
			<v-form class="form-create">
				<v-select
					class="form-create__field"
					label="Роль"
					:items="roleItems"
					outlined
					v-model="adminUser_role"
				></v-select>
				<v-autocomplete
					class="form-create__field"
					label="Должность"
					:items="positionItems"
					outlined
					v-model="adminUser_position_id"
				></v-autocomplete>
				<v-autocomplete
					class="form-create__field"
					label="Отдел"
					:items="sectionItems"
					outlined
					v-model="adminUser_section_id"
				></v-autocomplete>
				<v-autocomplete
					class="form-create__field"
					label="Регион"
					:items="stateItems"
					outlined
					v-model="adminUser_state_id"
				></v-autocomplete>
				<v-autocomplete
					class="form-create__field"
					label="Город"
					:items="cityItems"
					outlined
					v-model="adminUser_city_id"
				></v-autocomplete>
				<v-autocomplete
					class="form-create__field"
					label="Номинация"
					:items="nominationItems"
					outlined
					v-model="adminUser_nomination_id"
				></v-autocomplete>
				<v-text-field
					class="form-create__field"
					label="Количество заявок"
					single-line
					outlined
					v-model="adminUser_count_z"
				></v-text-field>
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
	name: "UsersModal",
	props: ["idField", "dataTable"],
	data() {
		return {
			dialogHead: "Данные пользователя",
			dialogTable: "users",

			roleItems: [
				{ text: "Администратор", value: "admin" },
				{ text: "Комиссия", value: "comittee" },
				{ text: "Пользователь", value: "user" }
			],
			positionItems: [],
			sectionItems: [],
			stateItems: [],
			cityItems: [],
			nominationItems: [],

			errForm: ""
		};
	},
	created() {
		this.getTable("positions");
		this.getTable("sections");
		this.getTable("states");
		this.getTable("cities");
		this.getTable("nominations");
	},
	methods: {
		sendData: function() {
			const dataValue = {
				role: this.$store.state.adminUser_role,
				position_id: this.$store.state.adminUser_position_id,
				section_id: this.$store.state.adminUser_section_id,
				state_id: this.$store.state.adminUser_state_id,
				city_id: this.$store.state.adminUser_city_id,
				nomination_id: this.$store.state.adminUser_nomination_id,
				count_z: +this.$store.state.adminUser_count_z
			};
			if (
				this.$store.state.adminUser_role === "" ||
				this.$store.state.adminUser_state_id === "" ||
				this.$store.state.adminUser_count_z === ""
			) {
				this.errForm = "Роль, Регион и количество заявок - обязательные поля";
			} else {
				this.$emit("updateFieldTableID", dataValue);
				this.resetForm();
			}
		},
		closeModal: function() {
			this.$emit("handleReversModal");
			this.resetForm();
		},
		resetForm: function() {
			this.errForm = "";
			this.$store.commit("setAdminUser_role", "");
			this.$store.commit("setAdminUser_position_id", "");
			this.$store.commit("setAdminUser_section_id", "");
			this.$store.commit("setAdminUser_state_id", "");
			this.$store.commit("setAdminUser_city_id", "");
			this.$store.commit("setAdminUser_nomination_id", "");
			this.$store.commit("setAdminUser_count_z", "");
		},
		getTable: function(table) {
			const url = config.API_URL + "/" + table;
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					switch (table) {
						case "positions":
							this.positionItems = this.parserData(result.data);
							break;
						case "sections":
							this.sectionItems = this.parserData(result.data);
							break;
						case "states":
							this.stateItems = this.parserData(result.data);
							break;
						case "cities":
							this.cityItems = this.parserData(result.data);
							break;
						case "nominations":
							this.nominationItems = this.parserData(result.data);
							break;
						default:
							console.log("ERRRRRO");
							break;
					}
				})
				.catch(e => console.error(table + "-Error:", e));
		},
		parserData: function(data) {
			let resultDataRu = [];
			for (let i = 0; i < data.length; i++) {
				const text_ru = data[i].value_ru;
				const id = data[i].id;
				resultDataRu.push({ text: text_ru, value: id });
			}
			return resultDataRu;
		}
	},
	computed: {
		adminUser_role: {
			get() {
				return this.$store.state.adminUser_role;
			},
			set(value) {
				this.$store.commit("setAdminUser_role", value);
			}
		},
		adminUser_position_id: {
			get() {
				return this.$store.state.adminUser_position_id;
			},
			set(value) {
				this.$store.commit("setAdminUser_position_id", value);
			}
		},
		adminUser_section_id: {
			get() {
				return this.$store.state.adminUser_section_id;
			},
			set(value) {
				this.$store.commit("setAdminUser_section_id", value);
			}
		},
		adminUser_state_id: {
			get() {
				return this.$store.state.adminUser_state_id;
			},
			set(value) {
				this.$store.commit("setAdminUser_state_id", value);
			}
		},
		adminUser_city_id: {
			get() {
				return this.$store.state.adminUser_city_id;
			},
			set(value) {
				this.$store.commit("setAdminUser_city_id", value);
			}
		},
		adminUser_nomination_id: {
			get() {
				return this.$store.state.adminUser_nomination_id;
			},
			set(value) {
				this.$store.commit("setAdminUser_nomination_id", value);
			}
		},
		adminUser_count_z: {
			get() {
				return this.$store.state.adminUser_count_z;
			},
			set(value) {
				this.$store.commit("setAdminUser_count_z", value);
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
