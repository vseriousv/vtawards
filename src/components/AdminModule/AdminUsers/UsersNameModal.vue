<template>
	<v-card>
		<v-card-title class="headline grey lighten-2" primary-title>
			{{ this.dialogHead }}
		</v-card-title>

		<v-card-text class="card-form-create">
			<v-form class="form-create">
				<v-text-field
					class="form-create__field"
					label="E-mail"
					outlined
					v-model="adminUser_email"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Таб номер"
					outlined
					v-model="adminUser_tabNumber"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Имя (Ru)"
					outlined
					v-model="adminUser_firstname_ru"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Имя (En)"
					outlined
					v-model="adminUser_firstname_en"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Фамилия (Ru)"
					outlined
					v-model="adminUser_lastname_ru"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Фамилия (En)"
					outlined
					v-model="adminUser_lastname_en"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Отчество (Ru)"
					outlined
					v-model="adminUser_patronymic_ru"
				></v-text-field>
				<v-text-field
					class="form-create__field"
					label="Отчество (En)"
					outlined
					v-model="adminUser_patronymic_en"
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
export default {
	name: "UsersNameModal",
	props: ["idField", "dataTable"],
	data() {
		return {
			dialogHead: "Данные сотрудника",
			dialogTable: "users",

			errForm: ""
		};
	},
	created() {},
	methods: {
		sendData: function() {
			const dataValue = {
				email: this.$store.state.adminUser_email,
				tabNumber: this.$store.state.adminUser_tabNumber,
				firstname_ru: this.$store.state.adminUser_firstname_ru,
				firstname_en: this.$store.state.adminUser_firstname_en,
				lastname_ru: this.$store.state.adminUser_lastname_ru,
				lastname_en: this.$store.state.adminUser_lastname_en,
				patronymic_ru: this.$store.state.adminUser_patronymic_ru,
				patronymic_en: this.$store.state.adminUser_patronymic_en
			};
			if (
				this.$store.state.adminUser_email === "" ||
				this.$store.state.adminUser_tabNumber === "" ||
				this.$store.state.adminUser_firstname_ru === "" ||
				this.$store.state.adminUser_firstname_en === "" ||
				this.$store.state.adminUser_lastname_ru === "" ||
				this.$store.state.adminUser_lastname_en === "" ||
				this.$store.state.adminUser_patronymic_ru === "" ||
				this.$store.state.adminUser_patronymic_en === ""
			) {
				this.errForm = "Все поля обязательны для заполнения";
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
			this.$store.commit("setAdminUser_email", "");
			this.$store.commit("setAdminUser_tabNumber", "");
			this.$store.commit("setAdminUser_firstname_ru", "");
			this.$store.commit("setAdminUser_firstname_en", "");
			this.$store.commit("setAdminUser_lastname_ru", "");
			this.$store.commit("setAdminUser_lastname_en", "");
			this.$store.commit("setAdminUser_patronymic_ru", "");
			this.$store.commit("setAdminUser_patronymic_en", "");
		}
	},
	computed: {
		adminUser_email: {
			get() {
				return this.$store.state.adminUser_email;
			},
			set(id) {
				this.$store.commit("setAdminUser_email", id);
			}
		},
		adminUser_tabNumber: {
			get() {
				return this.$store.state.adminUser_tabNumber;
			},
			set(id) {
				this.$store.commit("setAdminUser_tabNumber", id);
			}
		},
		adminUser_firstname_ru: {
			get() {
				return this.$store.state.adminUser_firstname_ru;
			},
			set(id) {
				this.$store.commit("setAdminUser_firstname_ru", id);
			}
		},
		adminUser_firstname_en: {
			get() {
				return this.$store.state.adminUser_firstname_en;
			},
			set(id) {
				this.$store.commit("setAdminUser_firstname_en", id);
			}
		},
		adminUser_lastname_ru: {
			get() {
				return this.$store.state.adminUser_lastname_ru;
			},
			set(id) {
				this.$store.commit("setAdminUser_lastname_ru", id);
			}
		},
		adminUser_lastname_en: {
			get() {
				return this.$store.state.adminUser_lastname_en;
			},
			set(id) {
				this.$store.commit("setAdminUser_lastname_en", id);
			}
		},
		adminUser_patronymic_ru: {
			get() {
				return this.$store.state.adminUser_patronymic_ru;
			},
			set(id) {
				this.$store.commit("setAdminUser_patronymic_ru", id);
			}
		},
		adminUser_patronymic_en: {
			get() {
				return this.$store.state.adminUser_patronymic_en;
			},
			set(id) {
				this.$store.commit("setAdminUser_patronymic_en", id);
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
