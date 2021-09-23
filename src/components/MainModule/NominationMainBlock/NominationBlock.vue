<template lang="pug">

	section.nomination#nomination
		v-dialog(
			v-model="dialog"
			max-width="900"
		)
			NominationModal(
				:nomtitle="nomtitle"
				:nomtext="nomtext"
				@dialogShow="dialogShow"
			)
		div.mxw1200.nomination-container
			div.nomination-text
				h2 {{$t('NominationBlock.head')}}
				p {{$t('NominationBlock.headText')}}
				router-link(to="/application")
					input(
						type="button"
						id="headerBtn"
						class="body-button_col__button"
						:value="$t('header.btnHeader.text')"
					)
			div.nomination-icons
				ul.nomination-list
					li.nomination-list-item
						a(@click.stop="dialogShow(true, 'attrLeader')")
							img(
								src="/img/imgComponents/StartVoting/networking.svg"
								alt="Достижения и лидерство"
								width="58"
								height="58"
							)
							p(v-html="$t('NominationBlock.liderNom')")

					li.nomination-list-item
						a(@click.stop="dialogShow(true, 'attrProfi')")
							img(
								src="/img/imgComponents/StartVoting/creative.svg"
								alt="Профессионализм и новации"
								width="58"
								height="58"
							)
							p(v-html="$t('NominationBlock.professionalNom')")

					li.nomination-list-item
						a(@click.stop="dialogShow(true, 'attrGoldman')")
							img(
								src="/img/imgComponents/StartVoting/goal.svg"
								alt="Золотой человек"
								width="58"
								height="58"
							)
							p(v-html="$t('NominationBlock.goldManNom')")
</template>

<script>
import NominationModal from './NominationModal';

export default {
	name: 'NominationMainBlock',

	data() {
		return {
			dialog: false,
			nomtitle: '',
			nomtext: ''
		};
	},

	methods: {
		dialogShow: function (isTrue, name) {
			this.dialog = isTrue;
			switch (name) {
				case 'attrLeader':
					this.nomtitle = this.$t('NominationBlock.liderNomTitle');
					this.nomtext = this.$t('NominationBlock.liderNomText');
					break;
				case 'attrProfi':
					this.nomtitle = this.$t('NominationBlock.professionalNomTitle');
					this.nomtext = this.$t('NominationBlock.professionalNomText');
					break;
				case 'attrGoldman':
					this.nomtitle = this.$t('NominationBlock.goldManNomTitle');
					this.nomtext = this.$t('NominationBlock.goldManNomText');
					break;
				default:
					break;
			}
		}
	},

	components: {
		NominationModal
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";

.nomination {
	padding-top: 100px;
	padding-bottom: 90px;
	margin-bottom: 100px;
	padding-left: 10px;
	padding-right: 10px;
	border-top: 250px transparent;
	/*margin-top: -50px;*/
	background-image: url(/img/imgComponents/StartVoting/award.svg);
	background-repeat: no-repeat;
	background-position: -10% center;
	background-size: contain;
}

.nomination-container {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-around;
}

.nomination-text p {
	max-width: 605px;
	margin-bottom: 60px;
}

.nomination-icons {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	margin-top: 50px;
}

.nomination-list {
	margin: 0;
	margin-left: 55px;
	padding: 0;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;

	list-style: none;
}

.nomination-list-item {
	position: relative;
	margin-bottom: 50px;
	min-width: 190px;
}

.nomination-list-item::before {
	content: "";

	position: absolute;
	bottom: -20px;
	left: -30px;
	z-index: -1;

	width: 92px;
	height: 80px;

	border-left: 12px solid #ffb900;
	border-bottom: 11px solid #ffb900;
	-webkit-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.nomination-list-item a p,
.nomination-list-item a:visited p {
	margin: 0;
	margin-top: 5px;

	font-size: 20px;
	font-weight: 700;
	color: #141414;

	-webkit-transition: all 0.3s ease;

	-o-transition: all 0.3s ease;

	transition: all 0.3s ease;
}

.nomination-list-item:hover a p {
	color: #ffb900;
}

.nomination-list-item:hover::before {
	-webkit-box-shadow: -15px 15px 0px rgba(255, 185, 0, 0.6),
	0px 15px 0px rgba(255, 185, 0, 0.3);
	box-shadow: -15px 15px 0px rgba(255, 185, 0, 0.6),
	0px 15px 0px rgba(255, 185, 0, 0.3);
}

.nomination-icons .btn {
	display: none;
}

@media screen and (max-width: 1280px) {
	.nomination {
		padding-top: 80px;
		padding-bottom: 50px;
		margin-bottom: 50px;
	}
}

@media screen and (max-width: 920px) {
	.nomination {
		background-position: center 313%;
	}
	.nomination-container {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		align-items: center;
	}
	// .nomination-text {
	//   margin-right: auto;
	// }
	.nomination-text .btn {
		display: none;
	}
	.nomination-icons {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		width: 100%;
	}
	.nomination-list {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	.nomination-icons .btn {
		display: block;
		margin-top: 40px;
		padding-top: 20px;
	}
}

@media screen and (max-width: 770px) {
	.nomination {
		padding-top: 0;

		background: none;
	}
	.nomination-container {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	.nomination-text {
		margin-bottom: 40px;
	}
	.nomination-text p {
		margin-bottom: 20px;
	}
	.nomination-text .btn {
		display: block;
		padding-top: 20px;
	}
	.nomination-icons {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.nomination-list {
		width: 100%;
		-ms-flex-direction: row;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 30px;
		margin-right: 30px;
	}
	.nomination-list:nth-child(2) {
		margin-left: 50px;
	}
	.nomination-icons .btn {
		display: none;
	}
}

.body-button_col__button {
	color: black;
	width: 220px;
	height: 56px;
	border: 1px solid black;
	border-radius: 5px;
	transition: 0.2s;

	&:hover {
		transition: 0.2s;
		color: black;
		background-color: #ffb900;
	}
}

@media screen and (max-width: 540px) {
	.nomination-list-item {
		min-width: 150px;
	}
}

@media screen and (max-width: 490px) {
	.nomination-icons {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		justify-content: center;
		width: 50%;
	}
	.nomination-list {
		justify-content: flex-start;

		margin: 0;
	}
}
</style>
