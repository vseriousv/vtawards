<script>
export default {
	name: "AdminNavbar",
	methods: {
		handleDrawer: function() {
			this.$emit("changeDrawer");
		},
		logout: function() {
			this.$router.push({ name: "main" });
		}
	}
};
</script>

<template lang="pug">
v-card(flat tile elevation="0")
	v-toolbar(dense color="#FEBA13")
		v-app-bar-nav-icon(@click.stop="handleDrawer")

		router-link(to="/admin")
			v-toolbar-title.title
				v-img.logotype(
					src="/img/imgComponents/HeaderBlock/VT_Logo.png"
					height="30"
					width="120"
				)

		v-spacer

		v-btn(icon @click="logout")
			v-icon mdi-logout
</template>

<style lang="sass" scoped>
.title
	display: flex
	padding-left: 5px !important
	span
		padding-left: 5px
		color: white

.logotype
	border: 1px solid white

a
	text-decoration: none
</style>
