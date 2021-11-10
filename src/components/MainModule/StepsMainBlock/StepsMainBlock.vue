<template lang="pug">

section.steps#steps
  v-dialog(
      v-model="dialog"
      max-width="1400"
    )
    StepsMainBlockModal(
      :stage-title="stageTitle"
      :stage-text="stageText"
      @dialogShow="dialogShow"
    )

  div.mxw1200
    h2.mx-3(v-html="$t('StepsMainBlock.blockTitle')")
    ul.steps-list
      li.steps-list-item(@click.stop="dialogShow(true, 'regionalStage')")
        .steps-list-item-title
          .step-number I
          p.step-date 27.09 - 3.11.2021
          img.step-img(
            src="/img/imgComponents/StartVoting/starofteam_ball_transparent.png"
            width="50"
          )
        h3(v-html="$t('StepsMainBlock.regionalStage')")
          //- p «Звезды команд»
        .steps-list-item-text
          p(v-html="$t('StepsMainBlock.descriptionCard')")
      li.steps-list-item.active-step(@click.stop="dialogShow(true, 'semifinal')")
        .steps-list-item-title
          .step-number II
          p.step-date 10.11 - 17.11.2021
          img.step-img(
            src="/img/imgComponents/StartVoting/leader_ball.png"
            width="50"
          )
        h3(v-html="$t('StepsMainBlock.semiStage')")
        .steps-list-item-text
          p(v-html="$t('StepsMainBlock.descriptionCard')")
      li.steps-list-item(@click.stop="dialogShow(true, 'final')")
        .steps-list-item-title
          .step-number III
          p.step-date 25.11 - 8.12.2021
          img.step-img(
            src="/img/imgComponents/StartVoting/leader_ball.png"
            width="50"
          )
        h3(v-html="$t('StepsMainBlock.finalStage')")
        .steps-list-item-text
          p(v-html="$t('StepsMainBlock.descriptionCard')")
</template>

<script>
import StepsMainBlockModal from "./StepsMainBlockModal";

export default {
	data() {
		return {
			dialog: false,
			stageTitle: "",
			stageText: ""
		};
	},

	components: {
		StepsMainBlockModal
	},

	methods: {
		dialogShow: function(isTrue, name) {
			this.dialog = isTrue;
			switch (name) {
				case "regionalStage":
					this.stageTitle = this.$t("StepsMainBlock.regionalStageTitle");
					this.stageText = this.$t("StepsMainBlock.regionalStageText");
					break;
				case "semifinal":
					this.stageTitle = this.$t("StepsMainBlock.semiFinalStageTitle");
					this.stageText = this.$t("StepsMainBlock.semiFinalStageText");
					break;
				case "final":
					this.stageTitle = this.$t("StepsMainBlock.finalStageTitle");
					this.stageText = this.$t("StepsMainBlock.finalStageText");
					break;
				default:
					break;
			}
		}
	},

	name: "StepsMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.steps {
	padding-top: 60px;
	margin-bottom: 170px;
	background-image: none;

	@include respond-to(large-screens) {
		background-image: url(/img/imgComponents/StartVoting/steps.svg);
		background-repeat: no-repeat;
		background-position: 80% 60%;
	}
}

.steps h2 {
	text-align: center;
	margin-bottom: 94px;
}

.steps-list {
	margin: 0 12px;
	padding: 0;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;

	list-style: none;
}

.steps-list-item {
	margin: 10px;
	width: 393px;
	padding-top: 25px;
	padding-left: 34px;
	padding-right: 34px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #fff;
	border-radius: 10px;
	-webkit-box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2),
		0 10px 10px rgba(0, 0, 0, 0.12);
	box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.12);
}

.steps-list-item-title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	margin-bottom: 40px;
}
.steps-list-item-text p {
	cursor: pointer;
	display: inline-block;
	&:hover {
		color: #ffb900;
	}
}
.step-number {
	width: 74px;
	height: 74px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;

	font-size: 30px;
	font-weight: 700;

	border: 4px solid #000;
	border-radius: 50%;
}
.step-date {
	margin: 0 !important;

	color: #3e3e3e;
	font-weight: 600 !important;
}

.steps-list p {
	margin: 0;
	margin-bottom: 20px;

	color: #5b5b5b;
}

.active-step .step-number {
	background-color: #ffb900;
}

@media screen and (max-width: 1280px) {
	.steps {
		background-position: 104% -150%;
	}
	.steps-list-item {
		width: 32.5%;
		padding-top: 25px;
		padding-left: 23px;
		padding-right: 16px;
		padding-bottom: 10px;
	}
	.steps-list-item-title {
		margin-bottom: 30px;
	}
	.step-number {
		width: 50px;
		height: 50px;
		font-size: 20px;
	}
	.steps-list-item h3 {
		margin-bottom: 20px;
	}
	.steps-list p {
		margin-bottom: 10px;
	}
}

@media screen and (max-width: 980px) {
	.steps {
		margin-bottom: 70px;
	}
	.steps h2 {
		margin-bottom: 60px;
	}
	.steps-list {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.steps-list-item-title {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: end;
		-ms-flex-align: end;
		align-items: flex-end;
		margin-bottom: -25px;
	}
	.steps-list-item {
		width: 70%;
		margin-bottom: 30px;
		padding-bottom: 30px;
	}
	.step-number {
		margin: 0 auto;
		margin-bottom: 25px;
	}
}

@media screen and (max-width: 770px) {
	.steps {
		padding-top: 0;
	}
	.steps-list-item {
		width: 100%;
	}
}

@media screen and (max-width: 540px) {
	.steps-list-item-title {
		margin-bottom: 5px;
	}
	.steps-list-item-title {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
	}
	.step-number {
		margin-left: 0;
		margin-right: auto;
		margin-bottom: 15px;
	}
}
</style>
