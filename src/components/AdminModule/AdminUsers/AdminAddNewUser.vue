<template>
	<v-container fluid>
		<!--        !MODAL WINDOW       -->
		<v-row>
			<v-card class="head-card">
				<h2 class="my-3 mb-5">Заполните карточку пользователя</h2>
				<div class="head-card__item">
					<p>Таб.номер*<br />(tabNumber)</p>
					<v-text-field class="mx-3" v-model="userId.tabNumber" outlined>
					</v-text-field>
				</div>
				<div class="head-card__box">
					<div class="head-card__item">
						<p>Фамилиия*</p>
						<v-text-field class="mx-3" v-model="userId.lastnameRu" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>Lastname*</p>
						<v-text-field class="mx-3" v-model="userId.lastnameEn" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>Имя*</p>
						<v-text-field class="mx-3" v-model="userId.firstnameRu" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>Firstname*</p>
						<v-text-field class="mx-3" v-model="userId.firstnameEn" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>Отчество</p>
						<v-text-field class="mx-3" v-model="userId.patronymicRu" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>Patronymic</p>
						<v-text-field class="mx-3" v-model="userId.patronymicEn" outlined>
						</v-text-field>
					</div>

					<div class="head-card__item">
						<p>E-mail*</p>
						<v-text-field class="mx-3" v-model="userId.email" outlined>
						</v-text-field>
					</div>
				</div>
			</v-card>
		</v-row>
		<v-row>
			<v-card class="container-card">
				<div class="head-content">
					<h3>Редактируемые данные</h3>
				</div>
				<div class="form-update">
					<div class="userData">
						<div class="userData__box">
							<h3>Данные</h3>
							<v-list>
								<v-list-item class="userData__item">
									<p>Пароль пользователя</p>
									<v-text-field
										class="mx-3"
										v-model="userId.passwordText"
										outlined
									>
									</v-text-field>
								</v-list-item>
								<v-list-item class="userData__item mb-2">
									<p>Роль:</p>
									<v-autocomplete
										class="mx-3 userData__input userData__input_autocomplete"
										v-model="userId.role"
										:items="roleEn"
										dense
										filled
										outlined
										background-color="white"
									>
									</v-autocomplete>
								</v-list-item>
								<v-list-item class="userData__item">
									<p>Должность</p>
									<v-text-field
										class="mx-3"
										v-model="userId.positionName"
										outlined
									>
									</v-text-field>
								</v-list-item>

								<v-list-item class="userData__item">
									<p>Отдел</p>
									<v-text-field
										class="mx-3"
										v-model="userId.sectionName"
										outlined
									>
									</v-text-field>
								</v-list-item>

								<v-list-item class="userData__item mb-2">
									<p>Регион:</p>
									<v-autocomplete
										class="mx-3 userData__input userData__input_autocomplete"
										v-model="userId.stateId"
										:items="statesRu"
										dense
										filled
										outlined
										background-color="white"
									>
									</v-autocomplete>
								</v-list-item>

								<v-list-item class="userData__item">
									<p>Город</p>
									<v-text-field class="mx-3" v-model="userId.cityName" outlined>
									</v-text-field>
								</v-list-item>
							</v-list>
						</div>
						<div class="userData__box">
							<h3>Data</h3>
							<v-list>
								<v-list-item class="userData__item">
									<p>User Password</p>
									<v-text-field
										class="mx-3"
										v-model="userId.passwordText"
										outlined
									>
									</v-text-field>
								</v-list-item>

								<v-list-item class="userData__item mb-2">
									<p>Role:</p>
									<v-autocomplete
										class="mx-3 userData__input userData__input_autocomplete"
										v-model="userId.role"
										:items="roleEn"
										dense
										filled
										outlined
										background-color="white"
									>
									</v-autocomplete>
								</v-list-item>

								<v-list-item class="userData__item">
									<p>Position</p>
									<v-text-field
										class="mx-3"
										v-model="userId.positionNameEng"
										outlined
									>
									</v-text-field>
								</v-list-item>

								<v-list-item class="userData__item">
									<p>Section</p>
									<v-text-field
										class="mx-3"
										v-model="userId.sectionNameEng"
										outlined
									>
									</v-text-field>
								</v-list-item>

								<v-list-item class="userData__item mb-2">
									<p>States:</p>
									<v-autocomplete
										class="mx-3 userData__input userData__input_autocomplete"
										v-model="userId.stateId"
										:items="statesEn"
										dense
										filled
										outlined
										background-color="white"
									>
									</v-autocomplete>
								</v-list-item>

								<v-list-item class="userData__item">
									<p>City</p>
									<v-text-field
										class="mx-3"
										v-model="userId.cityNameEng"
										outlined
									>
									</v-text-field>
								</v-list-item>
							</v-list>
						</div>
					</div>
				</div>
				<div class="text-center my-5">
					<v-btn
						@click.stop="postDataNewUser"
						color="primary"
						:disabled="
							this.userId.email == '' ||
							this.userId.tabNumber == '' ||
							this.userId.firstnameRu == '' ||
							this.userId.lastnameRu == ''
								? true
								: false
						"
					>
						Сохранить
					</v-btn>
					<p class="my-3">* - поля обязательны для заполнения</p>
				</div>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import config from "../../../constants/config";
import axios from "axios";

const generatePassword = require("password-generator");

export default {
	name: "AdminAddNewUser",

	data() {
		return {
			dialog: false,

			URL_AVATARS: config.URL_AVATARS,

			file: "",
			showPreview: true,
			imagePreview: "",

			roleEn: [
				{ text: "User", value: "user" },
				{ text: "Admin", value: "admin" },
				{ text: "Commiti", value: "commiti" }
			],
			statesRu: [],
			statesEn: [],

			btnDisabled: [
				{ fixsetData: true, saveData: true },
				{ fixsetData: true, saveData: true },
				{ fixsetData: true, saveData: true },
				{ fixsetData: true, saveData: true }
			],
			userId: {
				tabNumber: "",
				passwordText: "",
				email: "",
				firstnameRu: "",
				lastnameRu: "",
				patronymicRu: "",
				firstnameEn: "",
				lastnameEn: "",
				patronymicEn: "",
				positionName: "",
				sectionName: "",
				cityName: "",
				positionNameEng: "",
				sectionNameEng: "",
				cityNameEng: "",
				role: "user",
				stateId: 6,
				password: ""
			}
		};
	},

	async mounted() {
		await this.getStates();
		this.generatePassword();
	},
	methods: {
		generatePassword: function() {
			let userPassword = generatePassword(6, false, /[a-z\d]/);
			this.userId.passwordText = userPassword;
			this.userId.password = userPassword;
		},

		getStates: function() {
			const url = config.API_URL + "/states";
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.parseStates(result.data);
				})
				.catch(e => console.error("getStates-error:", e));
		},

		parseStates: function(data) {
			this.statesRu = [];
			this.statesEn = [];
			data.forEach(item => {
				let statesRu = {
					text: item.value_ru,
					value: item.id
				};
				let statesEn = {
					text: item.value_en,
					value: item.id
				};
				this.statesRu.push(statesRu);
				this.statesEn.push(statesEn);
			});
		},
		postDataNewUser: async function() {
			const url = "/users/register";
			const data = this.userId;
			try {
				const postDataNewUser = await axios.post(
					config.API_URL + url,
					data,

					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("jwt")
						}
					}
				);
				console.log(postDataNewUser);
				const messageTrue =
					"Пользователь" +
					" " +
					this.userId.lastnameRu +
					" " +
					this.userId.firstnameRu +
					" " +
					"создан";
				alert(messageTrue);
			} catch (e) {
				console.error("ERROR AdminAddNewUser/postDataNewUser:", e);
				alert(
					"Ошибка создания нового пользователя. Проверьте обязательные поля для заполнения, а также правильность заполнения поля E-mail"
				);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";

.head-card {
	width: 100%;
	padding: 10px 20px 30px;
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	&__item {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-bottom: -10px;
		@include respond-to(large-screens) {
			width: 50%;
		}
	}
	&__box {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		@include respond-to(large-screens) {
			flex-direction: row;
		}
		& .head-card__item {
			p {
				padding-top: 16px;
			}
		}
		& .head-card__item:nth-child(2n) {
			padding-left: 50px;
		}

		@include respond-to(large-screens) {
			flex-direction: row;
			flex-wrap: wrap;
		}
		> * {
			margin-bottom: -10px;
		}
	}
}
.container-card {
	width: 100%;
	padding: 10px 20px;
	margin: 10px 0;
	.head-content {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.form-update {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		@include respond-to(large-screens) {
			flex-direction: row;
		}

		.img-avatar {
			max-width: 200px;
			max-height: 250px;
			width: 100%;
			height: 100%;
			overflow: hidden;
			margin: 10px 30px 20px 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			img {
				max-width: 200px;
				max-height: 250px;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.userData {
			display: flex;
			flex-direction: column;
			width: 100%;
			@include respond-to(large-screens) {
				flex-direction: row;
			}
			&__box {
				width: 100%;
				@include respond-to(large-screens) {
					width: 50%;
				}
			}
			&__item {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: -10px;
				> p {
					padding-top: 17px;
				}
			}
			&__input {
				&_autocomplete {
					padding-top: 9px;
				}
			}
			&__btn {
				padding-top: 17px;
				width: auto;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
			}
		}
	}
	.description-user {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		.head-content {
			display: flex;
			justify-content: space-between;
		}
		p {
			margin: 10px 10px 20px;
		}
	}
}
</style>
