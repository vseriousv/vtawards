<template>
	<section></section>
</template>

<script>
export default {
	name: "LogoutPage",
	created() {
		localStorage.removeItem("jwt");
		this.$router.push({ name: "login" });
	}
};
</script>

<style scoped></style>
