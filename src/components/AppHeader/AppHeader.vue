<template>
	<nav :class="`AppHeader ${fixedTopMenu} ${AdminPanel}`">
		<div class="appBar mxw1200">
			<router-link
				v-for="menuItem in $t('menuItems')"
				:key="menuItem.id"
				:to="menuItem.link"
				class="hidden-sm-and-down"
			>
				<span v-html="menuItem.text" />
			</router-link>

			<v-app-bar-nav-icon @click="drawer = true" class="hidden-md-and-up">
			</v-app-bar-nav-icon>
			<v-navigation-drawer v-model="drawer" absolute temporary height="100vh">
				<v-list nav dense class="listAppBar d-flex flex-column">
					<v-list-item
						v-for="menuItem in $t('menuItems')"
						:key="menuItem.id"
						:to="menuItem.link"
						class="AppBar__item"
					>
						{{ menuItem.text }}
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</div>
		<!-- <v-app-bar-nav-icon
			icon
			class="hidden-md-and-up"
			@click.stop="$emit('change-drawer-reverse')"
		>
		</v-app-bar-nav-icon> -->
	</nav>
</template>

<script>
import JwtHelper from "../../helpers/JwtHelper";
// import DrawerVue from '../AdminModule/Drawer.vue';
export default {
	name: "AppHeader",
	props: ["fixedTopMenu", "adminTrue"],
	data() {
		return {
			AdminPanel: "",
			drawer: false
		};
	},
	created() {
		this.checkAdmin();
	},
	methods: {
		checkAdmin: function() {
			const jwtHelper = new JwtHelper();
			if (jwtHelper.isAdmin()) {
				this.AdminPanel = "adminTrueNavbar";
			} else {
				this.AdminPanel = "adminFalse";
			}
		}
	}
};
</script>

<style lang="scss">
@import "../../assets/styles/index";

.AppHeader {
	height: 48px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4px 50px -5px black;
	background-color: white;

	.appBar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;

		// height: 100%;
		a {
			color: black;
			text-decoration: none;
			height: 100%;
			padding: 0 20px;
			transition: 0.2s;

			&:hover {
				transition: 0.2s;
				color: $primaryTextColor;
			}
		}
	}
}

.noFixedTop {
	transition: 0.2s;
	top: 0 !important;
	position: relative;
}

.fixedTop {
	transition: 0.2s;
	position: fixed;
	left: 0;
	right: 0;
	z-index: 100;
}
</style>
