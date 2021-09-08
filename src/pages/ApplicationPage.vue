<template>
	<div>
		<application-form />
	</div>
</template>

<script>
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
export default {
	name: "ApplicationPage",

	components: {
		ApplicationForm
	},

	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
