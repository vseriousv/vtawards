<script>
	import JwtHelper from "../../helpers/JwtHelper";
	import RestHelper from "../../helpers/RestHelper";
	import config from "../../constants/config";
	import axios from "axios";

	const restHelper = new RestHelper();
	const jwtHelper = new JwtHelper();

	export default {
		name: "ParticipantBlockID",

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
section.ParticipiantBlockId
	v-container.mxw1200
		v-row
			v-col
				v-card.UserCard.d-flex.flex-column
					.UserCard__generalInfo.d-flex
						.UserCard__avatar
							img(:src="`${URL_AVATARS}${user.img}`" )

						.UserCard__content
							v-simple-table
								tbody.UserInfo
									tr.UserInfo__name
										td
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

					.UserCard__description
						p(v-if="$t('lang') === 'ru'" v-html="user.description_ru")
						p(v-if="$t('lang') === 'en'" v-html="user.description_en")

					.UserCard__votingSelection.d-flex.flex-column.align-center.justify-center
						v-btn(
							v-if="!isCommittee"
							@click.stop="setVote('user')"
							:disabled="disabledVoting"
							color="primary"
						) {{ $t("participantID.buttonVoting") }}

						v-select(
							v-if="isCommittee && $t('lang') === 'ru'"
							v-model="setRating"
							:items="itemRating_ru"
							:disabled="disabledVoting"
							outlined
							dense
						)
						v-select(
							v-if="isCommittee && $t('lang') === 'en'"
							v-model="setRating"
							:items="itemRating_en"
							:disabled="disabledVoting"
							outlined
							dense
						)
						v-btn(
							v-if="isCommittee"
							@click.stop="setVote('comittee')"
							:disabled="disabledVoting"
							color="primary"
						) {{ $t("participantID.buttonVoting") }}

						p.mt-3(v-if="$t('lang') === 'ru'") {{ count_voting_ru }}
						p.mt-3(v-if="$t('lang') === 'en'") {{ count_voting_en }}

				.UserComment.d-flex.flex-column.py-10
					h3 {{$t("participantID.comments")}}
					v-card.UserComment__item.pa-3.my-2(
						v-for="(comment, id) in comments"
						:key="`comment_${id}`"
						elevation="1"
					)
						.UserComment__title.d-flex.justify-space-between.align-center
							span( v-if="$t('lang') === 'ru'" ) Автор: {{comment.name_ru}}
							span( v-if="$t('lang') === 'en'" ) Author: {{comment.name_en}}
							v-btn(
								v-if="comment.isMy"
								@click.stop="deleteComment(comment.id)"
								icon
							)
								v-icon mdi-delete
						.UserComment__text.pa-2 {{comment.comment}}


					v-textarea.UserComment__writeText.mt-10(
						v-if="!isMyCard"
						name="commentText"
						:label=`$t("participantID.commentPost")`
						v-model="commentText"
						outlined
					)
					.d-flex.justify-center
						v-btn(
							v-if="!isMyCard"
							@click.stop="publicComment"
							:disabled="this.commentText === ''"
							color="primary"
						) {{$t("participantID.send")}}

</template>




<style lang="sass" scoped>
@import "ParticipantsBlock"
</style>
