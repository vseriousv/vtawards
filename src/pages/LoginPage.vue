<template>
	<div>
		<login-block />
	</div>
</template>

<script>
import LoginBlock from "../components/AuthModule/LoginBlock";
export default {
	name: "LoginPage",

	components: {
		LoginBlock
	},

	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
