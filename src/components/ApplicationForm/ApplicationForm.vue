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
				user: {},
				URL_AVATARS: config.URL_AVATARS,
				itemRating_ru: [
					{ text: "1 балл", value: 1 },
					{ text: "2 балла", value: 2 },
					{ text: "3 балла", value: 3 }
				],
				itemRating_en: [
					{ text: "1 point", value: 1 },
					{ text: "2 points", value: 2 },
					{ text: "3 points", value: 3 }
				],
				setRating: 0,
				isCommittee: false,
				activeVoting: 0,
				disabledVoting: false,
				count_voting_ru: "",
				count_voting_en: "",

				comments: [],
				commentText: '',
				isMyCard: this.$route.params.id === jwtHelper.jwtParse().id
			};
		},

		created() {
			this.getActiveVoting();
			this.getUser();
			this.getComments();
			this.checkCommittee();
		},

		methods: {
			checkCommittee: function() {
				const jwtHeader = new JwtHelper();
				this.isCommittee = jwtHeader.isCommittee();
			},

			getUser: function() {
				const url = config.API_URL + "/users/" + this.$route.params.id;
				axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						// console.log(result.data)
						this.parseUserData(result.data);
					})
					.catch(e => console.error("participants-error:", e));
			},

			parseUserData: function(data) {
				this.user = {
					img: data.img || "null.png",
					name_ru:
						data.lastname_ru + " " + data.firstname_ru + " " + data.patronymic_ru,
					name_en: data.firstname_en + " " + data.lastname_en,
					position_ru: data.position ? data.position.value_ru : "",
					position_en: data.position ? data.position.value_en : "",
					section_ru: data.section ? data.section.value_ru : "",
					section_en: data.section ? data.section.value_en : "",
					state_ru: data.state ? data.state.value_ru : "",
					state_en: data.state ? data.state.value_en : "",
					city_ru: data.city ? data.city.value_ru : "",
					city_en: data.city ? data.city.value_en : "",
					nomination_ru: data.nomination ? data.nomination.value_ru : "",
					nomination_en: data.nomination ? data.nomination.value_en : "",
					description_ru: data.description_ru,
					description_en: data.description_en,
					state_id: data.state_id
				};
			},

			getVotes: function(voting_id) {
				const jwtHelper = new JwtHelper();
				const url =
					config.API_URL +
					"/votes/from/" +
					jwtHelper.jwtParse().id +
					"/voting/" +
					voting_id;
				axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						// console.log("resultVotes", result.data);
						// Voting conditions:
						const if_1 = +jwtHelper.jwtParse().id === +this.$route.params.id;
						const if_2 = +jwtHelper.jwtParse().state_id !== +this.user.state_id;

						if (if_1) {
							this.count_voting_ru = "Вы не можете голосовать за себя";
							this.count_voting_en = "You cannot vote for yourself";
							this.disabledVoting = true;
						} else if (if_2) {
							this.count_voting_ru =
								"Вы можете голосовать только за участника своего региона";
							this.count_voting_en =
								"You can only vote for a member of your region";
							this.disabledVoting = true;
						} else {
							const userFind = result.data.find(
								item => +item.user_to_id === +this.$route.params.id
							);
							if (userFind !== undefined) {
								this.count_voting_ru = "Вы уже голосовали за этого участника";
								this.count_voting_en = "You have already voted for this member";
								this.disabledVoting = true;
							} else {
								if (jwtHelper.isCommittee()) {
									//Check committee
									for (let i = 0; i < result.data.length; i++) {
										const count_vote = result.data[i].count_vote;
										for (let j = 0; j < this.itemRating_ru.length; j++) {
											if (this.itemRating_ru[j].value === count_vote) {
												this.itemRating_ru.splice(j, 1);
												this.itemRating_en.splice(j, 1);
											}
										}
									}
								} else {
									if (result.data.length === 0) {
										this.count_voting_ru = "У вас осталось 3 голоса";
										this.count_voting_en = "You have 3 votes left";
										this.disabledVoting = false;
									}
									if (result.data.length === 1) {
										this.count_voting_ru = "У вас осталось 2 голоса";
										this.count_voting_en = "You have 2 votes left";
										this.disabledVoting = false;
									}
									if (result.data.length === 2) {
										this.count_voting_ru = "У вас осталось 1 голос";
										this.count_voting_en = "You have 1 vote left";
										this.disabledVoting = false;
									}
									if (result.data.length === 3) {
										this.count_voting_ru = "У вас не осталось голосов";
										this.count_voting_en = "You have no more votes";
										this.disabledVoting = true;
									}
								}
							}
						}
					})
					.catch(err => console.log("err", err));
			},

			setVote: function(type) {
				if (type === "user") {
					this.sendVote(type, 1);
				} else {
					if (this.setRating === 0) {
						console.error("Нужно выбрать балл");
					} else {
						this.sendVote(type, this.setRating);
						this.disabledVoting = true;
					}
				}
			},

			sendVote: function(type_vote, count_vote) {
				const jwtHelper = new JwtHelper();
				const url = config.API_URL + "/votes/create";
				const dataSend = {
					user_from_id: +jwtHelper.jwtParse().id,
					user_to_id: +this.$route.params.id,
					type_vote: type_vote,
					count_vote: +count_vote,
					voting_id: +this.activeVoting
				};
				axios
					.post(url, dataSend, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => console.log("resultSend", result.data))
					.catch(err => console.log("err", err));
			},

			getActiveVoting: async function() {
				const url = config.API_URL + "/votings/isactive";
				await axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						this.activeVoting = result.data[0].id;
						return result.data[0].id;
					})
					.then(voting_id => {
						this.getVotes(voting_id);
					})
					.catch(err => {
						console.log("err", err);
					});
			},

			getComments: async function() {
				const urn = `/comments/${this.$route.params.id}`;
				try {
					const comments = await restHelper.getEntity(urn, true);
					console.log("comments", comments.data);
					this.parseComments(comments.data);
				} catch (e) {
					console.error(e);
				}
			},
			parseComments(data) {
				this.comments = [];
				data.forEach(item => {
					const newObject = {
						id: item.id,
						name_ru:
							item.userFrom.lastname_ru +
							" " + item.userFrom.firstname_ru +
							" " + item.userFrom.patronymic_ru || '',
						name_en: item.userFrom.firstname_en + " " + item.userFrom.lastname_en || '',
						isMy: item.userFrom.id === jwtHelper.jwtParse().id || false,
						comment: item.comment || ''
					}
					this.comments.push(newObject);
				});
			},

			async publicComment(){

				const urn = '/comments/create';
				const dataSend = {
					user_from_id: +jwtHelper.jwtParse().id,
					user_to_id: +this.$route.params.id,
					comment: this.commentText
				}
				// console.log(dataSend, urn);
				try {
					await restHelper.postEntity(urn, dataSend, true);
					await this.getComments();
					this.commentText = '';
				} catch (e) {
					console.error(e);
				}
			},

			async deleteComment(id) {
				const urn = '/comments/' + id;
				try {
					await restHelper.deleteEntity(urn,true);
					await this.getComments();
					this.commentText = '';
				} catch (e) {
					console.error(e);
				}
			}
		}
	};
</script>

<template lang="pug">
section
	v-container.mxw1200
		v-row
			v-col
				v-card.UserCard.d-flex.flex-column
					.UserCard__generalInfo.d-flex
						.UserCard__body
							.UserCard__avatar
								//- img(:src="`${URL_AVATARS}${user.img}`" )
								img(src="/img/avatars/users/null.png")
							.UserCard__content
								v-simple-table
									tbody.UserInfo
										tr.UserInfo__name
											td
												span.c-font-16 {{ $t("loginBlock.form.name") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) {{ user.name_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) {{ user.name_en }}

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
												) {{ user.section_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) {{ user.section_en }}

										tr.UserInfo__state
											td
												span.c-font-16 {{ $t("loginBlock.form.state") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) {{ user.state_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) {{ user.state_en }}

										tr.UserInfo__city
											td
												span.c-font-16 {{ $t("loginBlock.form.city") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) {{ user.city_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) {{ user.city_en }}

										tr.UserInfo__nomination
											td
												span.c-font-16 {{ $t("loginBlock.form.nomination") }}:
												span.c-font-16(
													v-if="$t('lang') === 'ru'"
												) {{ user.nomination_ru }}
												span.c-font-16(
													v-if="$t('lang') === 'en'"
												) {{ user.nomination_en }}

						.UserComment.d-flex.flex-column.py-5
							h3 {{$t("ApplicationForm.argumentationTitle")}}
							v-textarea.UserComment__writeText.mt-5(
								v-if="!isMyCard"
								name="commentText"
								:label=`$t("ApplicationForm.commentPost")`
								v-model="commentText"
								outlined
							)
							.argumentationBody
								p {{$t("ApplicationForm.fileArgumentation")}}
								v-file-input.ArgumentationBody__input(
									chips = true
									multiple = true
									counter
									:label=`$t("ApplicationForm.labelArgumentation")`
									outlined
								)
							v-btn.btnArgumentation(
								v-if="!isMyCard"
								@click.stop="publicComment"
								:disabled="this.commentText === ''"
								color="primary"
							) {{$t("ApplicationForm.btnArgumentation")}}

</template>

<style lang="sass" scoped>

@import './src/sass/variables.sass' 
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
			max-width: 100%
			max-height: 100%
			border: 1px double #ffb900
			border-radius: 5px


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
.UserComment
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
.btnArgumentation
	max-width: 250px
	width: 100%
	margin-left: auto
	margin-top: 30px

		
</style>

