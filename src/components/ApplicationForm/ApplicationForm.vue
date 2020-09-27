<script>
	import JwtHelper from "../../helpers/JwtHelper";
	import RestHelper from "../../helpers/RestHelper";
	import config from "../../constants/config";
	import axios from "axios";

	const restHelper = new RestHelper();
	const jwtHelper = new JwtHelper();

	export default {
		name: "ApplicationForm",

		data() {
			return {
				URL_AVATARS: config.URL_AVATARS,
				user: {},
				userValue: '',
				usersCompleteRu: [],
				usersCompleteEng: [],
				usersAll: [],

				formsArr: [],
				argumentationText: "",
				argumentationFile: "",

				nominationSelect: "",
				nominationItemsRu: [],
				nominationItemsEng: [],
				isMyCard: this.$route.params.id === jwtHelper.jwtParse().id,
				file: "",
			};
		},

		created() {
			this.getUser();
			this.getNomination();
		},
		mounted () {
			this.argumentationFile = this.value
		},
		watch: {
			userValue: function(newVal, oldVal) {
				if (newVal>0 && oldVal!==null && newVal!==oldVal) {
					this.user = this.usersAll.find((element) =>
						{
							if (element.id == newVal) {
								return element;
							}
						});
				}
			},
			value (v) {
				this.argumentationFile = v
			}
		} ,

		methods: {
			getUser: async function() {
				const url = "/users";
				try {
					const {data} = await restHelper.getEntity(url, true);
					this.setUserArray(data)
				} catch(e) {
					console.error("ERROR ApplicationForm/getUser:", e);
				}
			},

			getNomination: async function() {
				const url = "/nominations";
				try {
					const nomination = await restHelper.getEntity(url, true);
					this.setNomination(nomination);
				} catch(e) {
					console.error("ERROR ApplicationForm/getNomination:", e);
				}
			},

			setUserArray: function(users) {
				this.usersCompleteRu= [];
				this.usersCompleteEng= [];
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
							item.lastnameRu + " " + item.firstnameRu,
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
			},

			setNomination: function(nominations) {
				this.nominationSelect = "",
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

			argumentationClearFile: function() {
				this.argumentationFile = []
			},

			postDataForm: function() {
				let formData = new FormData();
				formData.append("userId",this.userValue);
				formData.append("nominationId",this.nominationSelect);
				formData.append("textRu",this.argumentationText);
				formData.append("textEn",'engVersion');
				for (const fileItem of this.file) {
					formData.append('files', fileItem);
				}
				this.PostFormNomination(formData);
				this.user = {},
				this.userValue = "";
				this.nominationSelect = "";
				this.argumentationText = "";
				this.argumentationFile = [],
				this.file = [];
				this.formsArr = [];
			},

			PostFormNomination: async function(data) {
				const url = "/nomination-order";
				try {
					// const PostFormNomination = await restHelper.postFormData(url, data, true);
					const PostFormNomination = await axios.post(
						config.API_URL + url,
						data,
						
						{ headers: {
								Authorization: 'Bearer ' + localStorage.getItem('jwt'),
								'content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
							}
						},
					);
					console.log(PostFormNomination)
					alert("Ваша заявка успешно сформирована и отправлена. Она будет опубликована после модерации администратором.");
				} catch(e) {
					// if (e.response.message=== 401) {
					// 	alert("Ошибка данных: проверьте максимальный размер отправляемых документов");
					// } else {
						console.log(e.message)
						console.error("ERROR ApplicationForm/PostFormNomination:", e);
					
				}
			},

			getFormData (files) {
				this.formsArr = []
				for (const file of files) {
				const form = new FormData()
				form.append("files", file, file.name)
				this.formsArr.push(form)
				}
				return this.formsArr
			},
			onFocus () {
				if (!this.disabled) {
				this.$refs.fileInput.click()
				}
			},
			onFileChange ($event) {
				const files = $event.target.files || $event.dataTransfer.files
				const form = this.getFormData(files)
				if (files) {
				if (files.length > 0) {
					this.argumentationFile = [...files].map(file => file.name).join(', ')
				} else {
					this.argumentationFile = null
				}
				} else {
				this.argumentationFile = $event.target.value.split('\\').pop()
				}
				this.$emit('input', this.argumentationFile)
				this.$emit('formData', form)
			},

			handleFileUpload() {
				this.file = this.$refs.file.files;
			},
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
						background-color= "white"
						:label=`$t("ApplicationForm.autocomplete")`
					)
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
				v-card.UserCard
					h3.mb-3 {{$t("ApplicationForm.nominationTitle")}}*
					v-select(
						v-model="nominationSelect"
						:items="$t('lang') === 'ru'? nominationItemsRu: nominationItemsEng"
						:label=`$t("ApplicationForm.nominationLabel")`
						dense
						outlined
					)
					.UserArgumentation.d-flex.flex-column
						h3.mb-3 {{$t("ApplicationForm.argumentationTitle")}}*
						v-textarea.UserArgumentation__writeText(
							v-model="argumentationText"
							name="argumentationText"
							:label=`$t("ApplicationForm.commentPost")`
							outlined
						)

						.argumentationBody
							p(v-html='$t("ApplicationForm.fileArgumentation")')
							input(type="file"
								id="file"
								ref="file"
								multiple
								v-on:change="handleFileUpload()"
								)

						.argumentationBody__btn
							p(v-html="$t('ApplicationForm.argumentationBtnTitle')")
							v-btn.btnArgumentation(
								@click.stop="postDataForm"
								:disabled="this.userValue === '' || this.argumentationText === '' || this.nominationSelect === ''"
								color="primary"
							) {{$t("ApplicationForm.btnArgumentation")}}

</template>

<style lang="sass">
.UserArgumentation
	textarea
		min-height: 250px
</style>

<style lang="sass" scoped>
@import './src/assets/styles/index.scss'

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
		padding: 10px
		img
			width: 100%
			// height: 100%
			border: 1px double #ffb900
			border-radius: 5px
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
		flex-direction: row
		justify-content: space-between
		@include respond-to(large-screens)
			flex-direction: row
		p
			max-width: 350px
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
</style>

