<template>
	<section class="info-block mxw1200">
		<v-container>
			<v-row class="mt-6">
				<v-col>
					<h2 class="text-center">{{ $t("infoBlock.head") }}</h2>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="3">
					<v-img
						:src="`/img/imgComponents/infoBlock/${$t('infoBlock.img')}.png`"
					/>
				</v-col>
				<v-col cols="12" md="9">
					<h3 class="text-md-left text-center paragraph-infoBlock">
						{{ $t("infoBlock.text") }}
					</h3>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
export default {
	name: "InfoBlock"
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.info-block {
	border-bottom: 1px solid #ffb900;
	.paragraph-infoBlock {
		font-weight: 400;
	}
}
</style>
