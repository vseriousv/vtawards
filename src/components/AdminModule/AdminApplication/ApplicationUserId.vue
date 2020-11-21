<script>
import config from "../../../constants/config";
import axios from "axios";
import RestHelper from "../../../helpers/RestHelper";


const restHelper = new RestHelper();


export default {
	name: "ApplicationUserID",

	data() {
		return {
			URL_AVATARS: config.URL_AVATARS,
			userID: this.$route.params.id,

			user: {},
			userOrder: {},
			usersAll: [],
			userFromRu: "",
			userFromEn: "",

			usersCompleteRu: [],
			usersCompleteEng: [],
			userValue: 0,
			nominationItemsRu: [],
			nominationItemsEng: [],
			argumentationTextRu: "",
			argumentationTextEn: "",
			nominationSelect: "",

			autocompleteFix: true,
			autocompleteFixBtn: true,
			nominationFix: true,
			nominationFixBtn: true,
			argumentationFixRu: true,
			argumentationFixBtnRu: true,
			argumentationFixEn: true,
			argumentationFixBtnEn: true,

			public: false,
			isSelectedCard: false,
			step2: false,
			step3: false,
		};
	},

	async mounted() {
		try {
			await restHelper.getEntity('/nomination-order/read/' + this.userID, true);
		} catch (e) {
			throw new Error(e);
		}
		await this.getUserId(this.userID);
		await this.getUser();
		await this.getNomination();

	},

	watch: {
		userValue: function (newVal, oldVal) {
			if (oldVal !== null || oldVal > 0 && newVal > 0) {
				this.user = this.usersAll.find((element) => {
					if (element.id == newVal) {
						return element;
					}
				});
			}
		},
	},
	methods: {
		getUserId: async function (id) {
			const url = "/nomination-order/" + id;
			try {
				const data = await restHelper.getEntity(url, true);
				this.parseDataUser(data.data);
			} catch (e) {
				console.error("ERROR ApplicationUserId/getUserId:", e);
			}
		},

		parseDataUser: function (item) {
			this.userOrder = {
				userId: item.userId,
				userFrom: item.userFrom,
				argumentationRu: item.textRu,
				argumentationEn: item.textEn,
				files: item.files ? item.files : "",
				nominationId: item.nomination.id,
				public: item.public,
				isSelected: item.isSelected,
				step2: (item.step2 === null || item.step2 === false || item.step2 === undefined) ? false : item.step2,
				step3: (item.step3 === null || item.step3 === false || item.step3 === undefined) ? false : item.step3
			}
			this.public = item.public;
			this.isSelectedCard = item.isSelected;
			this.step2 = (item.step2 === null || item.step2 === false || item.step2 === undefined) ? false : item.step2
			this.step3 = (item.step3 === null || item.step3 === false || item.step3 === undefined) ? false : item.step3
			// console.log(this.userOrder)
		},

		setUserFrom: function (data) {
			const userFrom = this.usersAll.find(item => {
				if (item.id === data) return item;
			})
			this.userFromRu = userFrom.name_ru
			this.userFromEn = userFrom.name_en
		},

		getUser: async function () {
			const url = "/users";
			try {
				const {data} = await restHelper.getEntity(url, true);
				this.setUserArray(data)
			} catch (e) {
				console.error("ERROR ApplicationUserId/getUser:", e);
			}
		},

		setUserArray: function (users) {
			this.usersCompleteRu = [];
			this.usersCompleteEng = [];
			this.usersAll = [];
			users.forEach(item => {
				let userPropRu = {
					text: item.lastnameRu + " " + item.firstnameRu,
					value: item.id,
				};
				let userPropEng = {
					text: item.firstnameEn + " " + item.lastnameEn,
					value: item.id,
				};
				let userAll = {
					id: item.id,
					img: item.img || "null.png",
					name_ru:
						item.lastnameRu + " " + item.firstnameRu + " " + item.patronymicRu,
					name_en: item.firstnameEn + " " + item.lastnameEn,
					position_ru: item.positionName ? item.positionName : "",
					position_en: item.positionNameEng ? item.positionNameEng : "",
					section_ru: item.sectionName ? item.sectionName : "",
					section_en: item.sectionNameEng ? item.sectionNameEng : "",
					state_ru: item.state ? item.state.value_ru : "",
					state_en: item.state ? item.state.value_en : "",
					city_ru: item.cityName ? item.cityName : "",
					city_en: item.cityNameEng ? item.cityNameEng : "",
					state_id: item.state_id
				}
				this.usersAll.push(userAll);
				this.usersCompleteRu.push(userPropRu);
				this.usersCompleteEng.push(userPropEng);
			})
			this.userValue = this.userOrder.userId
			this.nominationSelect = this.userOrder.nominationId
			this.argumentationTextRu = this.userOrder.argumentationRu
			this.argumentationTextEn = this.userOrder.argumentationEn
			this.setUserFrom(this.userOrder.userFrom)
		},

		getNomination: async function () {
			const url = "/nominations";
			try {
				const nomination = await restHelper.getEntity(url, true);
				this.setNomination(nomination);
			} catch (e) {
				console.error("ERROR ApplicationForm/getNomination:", e);
			}
		},

		setNomination: function (nominations) {
			this.nominationItemsRu = [];
			this.nominationItemsEng = [];
			nominations.data.forEach(nomin => {
				let nominationRu = {
					text: nomin.valueRu,
					value: nomin.id
				};
				let nominationEng = {
					text: nomin.valueEn,
					value: nomin.id
				}
				this.nominationItemsRu.push(nominationRu);
				this.nominationItemsEng.push(nominationEng);
			})
		},
		fixsetData: function (data) {
			switch (data) {
				case "autocomplete":
					this.autocompleteFix = false
					this.autocompleteFixBtn = false
					break
				case "nomination":
					this.nominationFix = false
					this.nominationFixBtn = false
					break
				case "argumentationTextRu":
					this.argumentationFixRu = false
					this.argumentationFixBtnRu = false
					break
				case "argumentationTextEn":
					this.argumentationFixEn = false
					this.argumentationFixBtnEn = false
					break
			}
		},
		saveData: function (data) {
			switch (data) {
				case "autocomplete":
					this.autocompleteFix = true
					this.autocompleteFixBtn = true
					this.postNewData({"userId": this.userValue})
					break
				case "nomination":
					this.nominationFix = true
					this.nominationFixBtn = true
					this.postNewData({"nominationId": this.nominationSelect})
					break
				case "argumentationTextRu":
					this.argumentationFixRu = true
					this.argumentationFixBtnRu = true
					this.postNewData({"textRu": this.argumentationTextRu})
					break
				case "argumentationTextEn":
					this.argumentationFixEn = true
					this.argumentationFixBtnEn = true
					this.postNewData({"textEn": this.argumentationTextEn})
					break
			}
		},

		postNewData: async function (data) {
			const url = "/nomination-order/" + this.userID;
			try {
				const PostFormNomination = await axios.patch(
					config.API_URL + url,
					data,

					{
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('jwt'),
						}
					},
				);
				console.log(PostFormNomination)
			} catch (e) {
				console.error("ERROR ApplicationUserId/postNewData:", e);
			}
		},
		postCardNomination: function (data) {
			this.postNewData({"public": data})
			if (data === true) {
				alert("Карточка номинанта опубликована")
				this.public = true
			} else {
				alert("Карточка номинанта снята с публикации")
				this.public = false
			}
		},

		selectNomination: function (data) {
			this.postNewData({"isSelected": data})
			if (data === true) {
				alert("Карточка выбрана для публикации")
				this.isSelectedCard = true
			} else {
				alert("Карточка удалина из избранных")
				this.isSelectedCard = false
			}
		},

		patchNominationStepTwo: function (data) {
			this.postNewData({"step2": data})
			if (data === true) {
				alert("Карточка номинанта опубликована")
				this.step2 = true
			} else {
				alert("Карточка номинанта снята с публикации")
				this.step2 = false
			}
		},

		patchNominationStepThree: function (data) {
			this.postNewData({"step3": data})
			if (data === true) {
				alert("Карточка номинанта опубликована")
				this.step3 = true
			} else {
				alert("Карточка номинанта снята с публикации")
				this.step3 = false
			}
		},

		showUser: function () {
			this.$router.push({path: "/admin/users/id/" + this.userOrder.userFrom});
		}
	}
};
</script>


<template lang="pug">
section
	v-container.mxw1200
		v-row
			v-col
				v-card.autocomplete.UserCard.mb-5.pb-0
					v-autocomplete(
						v-model="userValue"
						:items="$t('lang') === 'ru'? usersCompleteRu: usersCompleteEng"
						dense
						filled
						outlined
						:disabled="this.autocompleteFix"
						background-color= "white"
						:label=`$t("ApplicationForm.autocomplete")`
					)
					.autocomplete__btn
						v-btn.mx-1(
						x-small
						color="secondary"
						@click.stop="fixsetData('autocomplete')"
						) Редактировать

						v-btn.mx-1(
						x-small
						:disabled="this.autocompleteFixBtn"
						color="primary"
						@click.stop="saveData('autocomplete')"
						) Сохранить

				v-card.UserCard.d-flex.flex-column.mb-5
					.UserCard__generalInfo.d-flex
						.UserCard__body
							.UserCard__avatar
								img(v-if="userValue > 1")(:src="`${URL_AVATARS}${user.img}`")
								img(v-else)(src="/img/avatars/users/null.png")
							.UserCard__content
								v-simple-table
									tbody.UserInfo
										tr.UserInfo__name
											td
												span.c-font-16 {{ $t("loginBlock.form.name") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) &ensp; {{ user.name_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) &ensp; {{ user.name_en }}

										tr.UserInfo__position
											td
												span.c-font-16 {{ $t("loginBlock.form.position") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) &ensp; {{ user.position_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) &ensp; {{ user.position_en }}

										tr.UserInfo__section
											td
												span.c-font-16 {{ $t("loginBlock.form.section") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) &ensp; {{ user.section_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) &ensp; {{ user.section_en }}

										tr.UserInfo__state
											td
												span.c-font-16 {{ $t("loginBlock.form.state") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) &ensp; {{ user.state_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) &ensp; {{ user.state_en }}

										tr.UserInfo__city
											td
												span.c-font-16 {{ $t("loginBlock.form.city") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) &ensp; {{ user.city_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) &ensp; {{ user.city_en }}
				v-card.UserCard.mb-5
					h3.mb-3 {{$t("ApplicationForm.applicant")}}
					h4.userFrom( @click.stop="showUser"
						v-if="$t('lang') === 'ru'") {{this.userFromRu}}
					h4.userFrom( @click.stop="showUser"
						v-if="$t('lang') === 'en'") {{this.userFromEn}}
				v-card.UserCard.mb-5
					h3.mb-3 {{$t("ApplicationForm.nominationTitle")}}
					.nomination
						v-select(
							v-model="nominationSelect"
							:items="$t('lang') === 'ru'? nominationItemsRu: nominationItemsEng"
							:label=`$t("ApplicationForm.nominationLabel")`
							dense
							style="max-width: 500px;"
							:disabled="this.nominationFix"
							outlined
						)
						.nomination__btn
							v-btn.mx-1(
							x-small
							color="secondary"
							@click.stop="fixsetData('nomination')"
							) Редактировать
							v-btn.mx-1(
							x-small
							:disabled="this.nominationFixBtn"
							color="primary"
							@click.stop="saveData('nomination')"
							) Сохранить

					.UserArgumentation.d-flex.flex-column
						h3.mb-3 {{$t("ApplicationForm.argumentationTitle")}}
						.nominationText
							v-textarea.UserArgumentation__writeText(
								v-model="argumentationTextRu"
								name="argumentationTextRu"
								style="max-width: 500px;"
								:disabled="this.argumentationFixRu"
								:label=`$t("ApplicationForm.commentPost")`
								outlined
							)
							.nominationText__btn
								v-btn.mx-1(
								x-small
								color="secondary"
								@click.stop="fixsetData('argumentationTextRu')"
								) Редактировать

								v-btn.mx-1(
								x-small
								:disabled="this.argumentationFixBtnRu"
								color="primary"
								@click.stop="saveData('argumentationTextRu')"
								) Сохранить
						.nominationText
							v-textarea.UserArgumentation__writeText(
								v-model="argumentationTextEn"
								name="argumentationTextEn"
								style="max-width: 500px;"
								:disabled="this.argumentationFixEn"
								:label=`$t("ApplicationForm.commentPost")`
								outlined
							)
							.nominationText__btn
								v-btn.mx-1(
								x-small
								color="secondary"
								@click.stop="fixsetData('argumentationTextEn')"
								) Редактировать

								v-btn.mx-1(
								x-small
								:disabled="this.argumentationFixBtnEn"
								color="primary"
								@click.stop="saveData('argumentationTextEn')"
								) Сохранить
					.UserFilesArgumentation
						a(
							v-for="file in this.userOrder.files"
							:key="`file${file.id}`"
							target="_blank"
							:href='"https://files.vtaward.ru/" + file.filePath'
						)
							img.UserFilesArgumentation__img(
							:src='"https://files.vtaward.ru/" + file.filePath'
							)
				v-card.UserCard.footerApplication.mb-5
					p.footerApplication__text Выбрать карточку для публикации, нажимая на кнопку, карточка не будет опубликована, а добавится в избранное
					v-btn(
						v-if="(this.isSelectedCard === false)"
						x-small
						color="secondary"
						@click.stop='selectNomination(true)'
						) Добавить в избранное
					v-btn(
						v-else
						x-small
						color="error"
						@click.stop='selectNomination(false)'
						) Убрать из избранных

				v-card.UserCard.footerApplication.mb-5
					p.footerApplication__text(v-html='$t("ApplicationForm.publishForm")')
					v-btn(
						v-if="(this.public === false)"
						x-small
						color="secondary"
						@click.stop='postCardNomination(true)'
						) Опубликовать
					v-btn(
						v-else
						x-small
						color="error"
						@click.stop='postCardNomination(false)'
						) Снять с публикации

				v-card.UserCard.footerApplication.mb-5
					p.footerApplication__text(v-html='$t("ApplicationForm.step2")')
					v-btn(
						v-if="(this.step2 === false)"
						x-small
						color="secondary"
						@click.stop='patchNominationStepTwo(true)'
						) Опубликовать
					v-btn(
						v-else
						x-small
						color="error"
						@click.stop='patchNominationStepTwo(false)'
						) Снять с публикации

				v-card.UserCard.footerApplication.mb-5
					p.footerApplication__text(v-html='$t("ApplicationForm.step3")')
					v-btn(
						v-if="(this.step3 === false)"
						x-small
						color="secondary"
						@click.stop='patchNominationStepThree(true)'
						) Опубликовать
					v-btn(
						v-else
						x-small
						color="error"
						@click.stop='patchNominationStepThree(false)'
						) Снять с публикации
</template>

<style lang="sass">
.UserArgumentation
	textarea
		min-height: 250px
</style>

<style lang="sass" scoped>
@import './src/assets/styles/index.scss'
.autocomplete
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px
.nomination
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px
.nominationText
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px

.autocomplete
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px
.nomination
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px
.nominationText
	display: flex
	flex-direction: row
	&__btn
		margin-left: 20px
		margin-top: 8px
.UserCard
	max-width: 800px
	margin: 0 auto
	padding: 30px

	&__generalInfo
		display: flex
		flex-direction: column
		width: 100%
		.UserCard__body
			display: flex
			flex-direction: row

	&__avatar
		max-width: 300px
		width: 100%
		max-height: 300px
		height: 100%
		overflow: hidden
		img
			border: 1px solid #ffb900
			border-radius: 5px
			max-width: 300px
			width: 100%
			max-height: 300px
			height: 100%
			object-fit: cover

	&__content
		width: 100%
		margin: 10px

	&__description
		padding: 10px
		p
			font-size: 14px

	&__votingSelection
		width: 100%
		padding: 10px
		margin: 10px

.c-font-16
	font-size: 16px
.UserArgumentation
	max-width: 800px
	width: 100%
	margin: 0 auto
	&__item
		span
			font-style: italic
	.argumentationBody
		display: flex
		flex-direction: column
		@include respond-to(large-screens)
			flex-direction: row
		p
			max-width: 300px
	.argumentationBody__btn
		display: flex
		flex-direction: row
		align-items: center
		justify-content: space-between
		margin: 20px 0
		p
			margin: 0
	.btnArgumentation
		max-width: 250px
		width: 100%
		margin-left: auto
.UserFilesArgumentation
	margin-top: -10px
	max-width: 500px
	.UserFilesArgumentation__img
		max-width: 150px
		width: 100%
		max-height: 100px
		height: 100%
		margin: 10px 15px 10px 0
		object-fit: cover
		object-position: center center
.footerApplication
	display: flex
	justify-content: space-between
	align-items: center
	&__text
		max-width: 280px
		padding: 0
		margin: 0
.userFrom
	cursor: pointer
	&:hover
		color: #ffb900
</style>
