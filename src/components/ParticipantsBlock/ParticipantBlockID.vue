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
				
				votes: [],
				errorVote: '',
				userFrom: {},
				comments: [],
				commentText: '',
				my: jwtHelper.jwtParse().id,
				isMyCard: this.$route.params.id === jwtHelper.jwtParse().id
			};
		},

		created() {
			// this.getActiveVoting();
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
				const url = config.API_URL + "/nomination-order/" + this.$route.params.id;
				axios
					.get(url, {
						headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
					})
					.then(result => {
						console.log(result.data)
						this.parseUserData(result.data);
					})
					.catch(e => console.error("participants-error:", e));
			},

			parseUserData: function(data) {
				this.user = {
					img: data.user.img || "null.png",
					name_ru:
						data.user.lastnameRu + " " + data.user.firstnameRu + " " + data.user.patronymicRu,
					name_en: data.user.firstnameEn + " " + data.user.lastnameEn,
					position_ru: data.user.positionName ? data.user.positionName : "",
					position_en: data.user.positionNameEng ? data.user.positionNameEng : "",
					section_ru: data.user.sectionName ? data.user.sectionName : "",
					section_en: data.user.sectionNameEng ? data.user.sectionNameEng : "",
					state_ru: data.user.state ? data.user.state.value_ru : "",
					state_en: data.user.state ? data.user.state.value_en : "",
					city_ru: data.user.cityName ? data.user.cityName : "",
					city_en: data.user.cityNameEng ? data.user.cityNameEng : "",
					nomination_ru: data.nomination ? data.nomination.valueRu : "",
					nomination_en: data.nomination ? data.nomination.valueEn : "",
					state_id: data.user.state_id,
					argumentationRu: data.textRu ? data.textRu : "---",
					argumentationEn: data.textEn ? data.textEn : "---",
					votes: data.votes,
					errorVote: data.errorVotes,
				};
				this.errorVotes(this.user.errorVote)
				this.votes = data.votes
			},

			getComments: async function() {
				const urn = `/comments/nomination-order/${this.$route.params.id}/public`;
				try {
					const comments = await restHelper.getEntity(urn, true);
					// console.log("comments", comments.data.rows);
					this.parseComments(comments.data.rows);
				} catch (e) {
					console.error(e);
				}
			},
			parseComments(data) {
				this.comments = [];
				data.forEach(item => {
					const newObject = {
						id: item.id,
						name_ru: '',
						name_en: '',
						isMy: item.userFromId === jwtHelper.jwtParse().id || false,
						userFromId: item.userFromId,
						comment: item.comment || ''
					}
					this.comments.push(newObject);
					this.getUserFrom(item.userFromId, newObject.id)
					// console.log(this.comments)
				});
			},
			
			getUserFrom: async function(data, id) {
				const urn = `/users/` + data;
				try {
					const userFrom = await restHelper.getEntity(urn, true);
					// console.log("userFrom", userFrom.data);
					this.parseUserFrom(userFrom.data, id);
				} catch (e) {
					console.error(e);
				}
			},
			parseUserFrom: function(data, id) {
				this.comments.forEach(item => {
					if (item.id == id) {
						item.name_ru = data.lastnameRu + " " + 
							data.firstnameRu + " " + 
							data.patronymicRu || ''
						item.name_en = data.firstnameEn + " " + data.lastnameEn || ''
					}
				})
				// console.log(this.comments)
			},

			async publicComment(){
				const urn = '/comments';
				const dataSend = {
					userFromId: +jwtHelper.jwtParse().id,
					nominationOrderId: +this.$route.params.id,
					comment: this.commentText
				}
				// console.log(dataSend, urn);
				try {
					await restHelper.postEntity(urn, dataSend, true);
					await this.getComments();
					this.commentText = '';
					if (this.$t('lang') === 'ru') {
						alert("Комментарий успешно создан. Он будет опубликован после модерации администратором.")
					}
					if (this.$t('lang') === 'en') {
						alert("The comment was successfully created. It will be published after admin moderation.")
					}
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
			},
			errorVotes: function(error) {
				switch (error) {
					case "only-my-region": 
						this.errorVote = `${this.$t("participantID.only_my_region")}`
						break
					case "is-have": 
						this.errorVote = `${this.$t("participantID.is_have")}`
						break
					case "no-self": 
						this.errorVote = `${this.$t("participantID.no_self")}`
						break	
				}
			},
			postVote: async function(point) {
				if (this.$t('lang') === 'ru') {
					const promt = confirm("Вы уверены что хотите отдать свой голос за" + " " + this.user.name_ru + "?")
					if (!promt) return
				}
				if (this.$t('lang') === 'en') {
					const promt = confirm("Are you sure you want to vote for" + " " + this.user.name_en + "?")
					if (!promt) return
				}
				console.log(point)
				const urn = "/user-voting";
				const data = {
					nominationOrderId: this.$route.params.id,
					range: point,
					type: "users",
				}
				try {
					await restHelper.postEntity(urn, data, true);
					if (this.$t('lang') === 'ru') {
						alert("Ваш голос засчитан")
					}
					if (this.$t('lang') === 'en') {
						alert("Your vote has been counted")
					}
					this.getUser()
				} catch (e) {
					console.log("Ошибка отправки голоса:", e);
				}
			},
			// onlyAdmin: function() {
			// 	const hoAdmin = jwtHelper.jwtParse().role
			// 	if (hoAdmin == "admin") {
			// 		return true 
			// 	} else {
			// 		return false
			// 	}
			// }
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
											span.c-font-16.label {{ $t("loginBlock.form.name") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &nbsp;{{ user.name_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &nbsp;{{ user.name_en }}

									tr.UserInfo__position
										td
											span.c-font-16.label {{ $t("loginBlock.form.position") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &ensp; {{ user.position_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &ensp; {{ user.position_en }}

									tr.UserInfo__section
										td
											span.c-font-16.label  {{ $t("loginBlock.form.section") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &ensp;{{ user.section_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &ensp;{{ user.section_en }}

									tr.UserInfo__state
										td
											span.c-font-16.label  {{ $t("loginBlock.form.state") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &ensp;{{ user.state_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &ensp;{{ user.state_en }}

									tr.UserInfo__city
										td
											span.c-font-16.label  {{ $t("loginBlock.form.city") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &ensp;{{ user.city_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &ensp;{{ user.city_en }}

									tr.UserInfo__nomination
										td
											span.c-font-16.label  {{ $t("loginBlock.form.nomination") }}:
											span.c-font-16(
												v-if="$t('lang') === 'ru'"
											) &ensp;{{ user.nomination_ru }}
											span.c-font-16(
												v-if="$t('lang') === 'en'"
											) &ensp;{{ user.nomination_en }}

									tr.UserInfo__numberVotes
										td
											span.c-font-16.label  {{ $t("loginBlock.form.numberOrders") }}:
											span.c-font-16

					.UserCard__description(v-if="this.errorVote && this.errorVote !== ''")
						p.text-center.mt-3 <b>{{this.errorVote}}</b>

					.UserCard__description(v-else)
						p.text-left.mb-6(v-if="$t('lang') === 'ru'") Голосовать за <b>{{ user.name_ru }}</b>
						p.text-left.mb-6(v-if="$t('lang') === 'en'") Vote for <b>{{ user.name_en }}</b>
							
						.UserCard__vote
							.vote
								v-btn(
									@click.stop="postVote(1)"
									:disabled="!votes.includes(1)"
									color="secondary"
								) {{ $t("participantID.vote_1") }}
							.vote
								v-btn(
									@click.stop="postVote(2)"
									:disabled="!votes.includes(2)"
									color="secondary"
								) {{ $t("participantID.vote_2") }}
							.vote
								v-btn(
									@click.stop="postVote(3)"
									:disabled="!votes.includes(3)"
									color="secondary"
								) {{ $t("participantID.vote_3") }}

					
				v-card.UserCard.d-flex.flex-column.mt-5
					h3.UserCard__argumentation.mb-3(
						v-if="$t('lang') === 'ru'"
					) Аргументация
					p.UserCard__argumentation(
						v-if="$t('lang') === 'ru'"
						id="argumentationTextRu"
						label='Аргументация'
						v-html="this.user.argumentationRu"
					) 

					h3.UserCard__argumentation.mb-3(
						v-if="$t('lang') === 'en'"
					) Argumentation
					p.UserCard__argumentation(
						v-if="$t('lang') === 'en'"
						id="argumentationTextEn"
						label='Argumentation'
						v-html="this.user.argumentationEn"
					)

				.UserComment.d-flex.flex-column.py-10
					h3 {{$t("participantID.comments")}}
					v-card.UserComment__item.px-3.my-2(
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
								color="error"
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



<style lang="sass">
.UserCard__argumentation
	textarea
		min-height: 250px
</style>
<style lang="sass" scoped>
@import "ParticipantsBlock"
</style>
