<script>
	import JwtHelper from "../../helpers/JwtHelper";
	import RestHelper from "../../helpers/RestHelper";
	import config from "../../constants/config";
	// import axios from "axios";


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
			// argumentationFile: function(newVal, oldVal) {
			// 	if (newVal!==oldVal && newVal.length !== 0) {
			// 		this.argumentationFileOut = [];
			// 		this.argumentationFile.forEach( file => {
			// 			let reader = new FileReader();
			// 				reader.readAsText(file)
			// 				reader.onload = () => {
			// 					this.argumentationFileOut.push(reader.result);
			// 				}
			// 			}
			// 		)
			// 	}
			// },
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
						text: item.lastname_ru + " " + item.firstname_ru,
						value: item.id,
					};
					let userPropEng = {
						text: item.firstname_en + " " + item.lastname_en,
						value: item.id,
					};
					let userAll = {
						id: item.id,
						img: item.img || "null.png",
						name_ru:
							item.lastname_ru + " " + item.firstname_ru,
						name_en: item.firstname_en + " " + item.lastname_en,
						position_ru: item.position ? item.position.value_ru : "",
						position_en: item.position ? item.position.value_en : "",
						section_ru: item.section ? item.section.value_ru : "",
						section_en: item.section ? item.section.value_en : "",
						state_ru: item.state ? item.state.value_ru : "",
						state_en: item.state ? item.state.value_en : "",
						city_ru: item.city ? item.city.value_ru : "",
						city_en: item.city ? item.city.value_en : "",
						nomination_ru: item.nomination ? item.nomination.value_ru : "",
						nomination_en: item.nomination ? item.nomination.value_en : "",
						description_ru: item.description_ru,
						description_en: item.description_en,
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
						text: nomin.value_ru,
						value: nomin.id
					};
					let nominationEng = {
						text: nomin.value_en,
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
				formData.append("files", this.formsArr);
				console.log(this.formsArr)
				this.PostFormNomination(formData);
				this.userValue = '';
				this.nominationSelect = '';
				this.argumentationText = '';
				this.argumentationFile = [];
			},
			PostFormNomination: async function(data) {
				const url = "/nomination-order";
				try {
					const PostFormNomination = await restHelper.postFormData(url, data, true);
					console.log(PostFormNomination)
				} catch(e) {
					console.error("ERROR ApplicationForm/PostFormNomination:", e);
				}
			},
			getFormData (files) {
				this.formsArr = []
				for (const file of files) {
				const form = new FormData()
				form.append('data', file, file.name)
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
					this.filename = [...files].map(file => file.name).join(', ')
				} else {
					this.filename = null
				}
				} else {
				this.filename = $event.target.value.split('\\').pop()
				}
				this.$emit('input', this.filename)
				this.$emit('formData', form)
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
							p {{$t("ApplicationForm.fileArgumentation")}}*
							v-text-field.ArgumentationBody__input(
								prepend-icon=false 
								single-line
								v-model="argumentationFile" 
								:label=`$t("ApplicationForm.labelArgumentation")`
								@click.native="onFocus"
								ref="fileTextField"
							)
							input(type="file" 
								accept=".txt, .jpg, .pdf, .doc, .png"
								multiple=true
								ref="fileInput" 
								@change="onFileChange"
							)
							//- file-input.ArgumentationBody__input(
							//- 	v-model="argumentationFile"
							//- 	:label=`$t("ApplicationForm.labelArgumentation")`
							//- 	accept=".txt, .jpg, .pdf, .doc, .png"
							//- 	multiple = true
							//- )
							//- v-file-input.ArgumentationBody__input(
							//- 	accept=".txt, .jpg, .pdf, .doc, png"
							//- 	v-model="argumentationFile"
							//- 	chips = true
							//- 	multiple = true
							//- 	counter
							//- 	:label=`$t("ApplicationForm.labelArgumentation")`
							//- 	outlined
							//- 	@click:clear="argumentationClearFile"
							//- )

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
		
		
	
</style>

