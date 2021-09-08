<template lang="pug">
    v-card.stageDialog
      v-card-title.stageDialog__title(v-html="stageTitle")
      v-card-text.stageDialog__text(v-html="stageText")
      v-card-actions
        v-spacer
        v-btn.stageDialog__btn(
          text
          @click="$emit('dialogShow', false, '')"
        )(v-html="$t('NominationBlock.buttonNomText')")
</template>

<script>
export default {
	props: {
		stageTitle: {
			type: String,
			default: null
		},
		stageText: {
			type: String,
			default: null
		}
	},

	name: "StepsMainBlockModal"
};
</script>

<style lang="scss">
@import "../../../assets/styles/index";

.v-dialog {
	.stageDialog {
		.stageDialog__title {
			font-size: 16px;
			line-height: normal;
			@include respond-to(medium-screens) {
				font-size: 24px;
			}
		}
		.stageDialog__text p,
		ul {
			font-size: 14px;
			line-height: normal;
			@include respond-to(medium-screens) {
				font-size: 16px;
				line-height: normal;
			}
			@include respond-to(large-screens) {
				font-size: 20px;
				line-height: 28px;
			}
		}
	}
	.stageDialog__btn {
		color: black;
		&:hover {
			color: #ffb900;
		}
	}
}
</style>
