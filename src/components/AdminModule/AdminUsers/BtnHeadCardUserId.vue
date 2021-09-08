<script>
export default {
	name: "BtnHeadCardUserId",

	data() {
		return {
			btnDisabled: { fixsetData: true, saveData: true }
		};
	},
	props: {
		model: {
			type: String,
			default: null
		},
		tableLine: {
			type: String,
			default: null
		},
		placeholder: {
			type: String,
			default: null
		}
	},
	methods: {
		disabledBtnNone: function() {
			this.btnDisabled.saveData = false;
			this.btnDisabled.fixsetData = false;
		},

		saveDataInput: function() {
			this.btnDisabled.saveData = true;
			this.btnDisabled.fixsetData = true;
		}
	}
};
</script>

<template>
	<div class="head-card__item mt-3">
		<v-text-field
			class="mr-3 head-card__input"
			:disabled="this.btnDisabled.saveData"
			v-model="model"
			:placeholder="placeholder"
			outlined
		>
		</v-text-field>
		<div class="head-card__btn">
			<v-btn
				class="mx-1"
				x-small
				color="secondary"
				@click.stop="disabledBtnNone()"
			>
				Редактировать
			</v-btn>
			<v-btn
				class="mx-1"
				x-small
				:disabled="this.btnDisabled.saveData"
				color="primary"
				@click.stop="saveDataInput"
				@click="$emit('saveDataInput', tableLine, model)"
			>
				Сохранить
			</v-btn>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../assets/styles/index";

.head-card {
	&__item {
		width: 100%;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// align-items: center;
		@include respond-to(large-screens) {
			width: 50%;
		}
	}
	&__btn {
		padding-top: 15px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
}
</style>
