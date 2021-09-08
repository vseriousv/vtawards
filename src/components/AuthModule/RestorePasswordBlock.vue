<template>
	<section class="login-block">
		<v-container class="mxw1200">
			<v-row>
				<v-col class="head">
					<h1>{{ $t("loginBlock.restorePassword") }}</h1>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="loginForm">
					<v-form class="loginForm__form" ref="form" lazy-validation>
						<v-text-field
							class="field"
							v-model="tabNumber"
							name="tabNumber"
							:label="`${$t('loginBlock.form.tabNumber')}`"
							required
							outlined
						></v-text-field>
						<div class="btn-field">
							<v-btn color="warning" @click="sendHandler" large>
								{{ $t("loginBlock.form.submit") }}
							</v-btn>
							<span class="Error">{{ errorStr }}</span>
						</div>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
import axios from "axios";
import config from "../../constants/config";
export default {
	name: "RestorePasswordBlock",
	data() {
		return {
			tabNumber: "",
			errorStr: ""
		};
	},
	methods: {
		sendHandler: function() {
			this.errorStr = "";
			const url = config.API_URL + "/users/pass-email";
			const dataSend = {
				tabNumber: this.tabNumber
			};
			if (this.tabNumber === "") {
				this.errorStr = "Поле обязательно для заполнения";
			} else {
				axios
					.post(url, dataSend)
					.then(result => {
						console.log(result);
						this.tabNumber = "";
						alert(this.$t("loginBlock.restorePasswordTrue"));
					})
					.catch(error => {
						if (error.response.status === 400) {
							this.errorStr = this.$t("loginBlock.restorePasswordFalse");
						} else {
							this.errorStr = error.response.status + "";
						}
					});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/index";
.login-block {
	background-color: #edeef0;
	width: 100%;
	height: calc(100vh - 102px);
	//   min-height: 700px;
	.head {
		text-align: center;
	}
	.loginForm {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.loginForm__form {
			width: 100%;
			max-width: 300px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.field {
				width: 100%;
			}
			.btn-field {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				.Error {
					margin-top: 25px;
					text-align: center;
					color: #ff5300;
				}
			}
		}
	}
}
</style>
