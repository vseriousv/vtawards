<template>
	<!-- NAVICAGTION DRAWER -->
	<div class="nav-drawer">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title">
					<div class="logotype">
						<router-link to="/">
							<img
								class="logotype"
								width="150"
								:src="
									`/img/imgComponents/HeaderBlock/${$t('header.logotype')}.png`
								"
								alt="vtaward"
							/>
						</router-link>
					</div>
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-divider />

		<v-list-item v-for="(item, i) in $t('menuItems')" :key="`drawerMenu${i}`">
			<v-list-item-content>
				<v-list-item-title class="title_items">
					<router-link :to="`${item.link}`" class="elHover">
						{{ item.text }}
					</router-link>
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</div>
</template>

<script>
export default {
	name: "DrawerList",
	computed: {},
	methods: {},
	data() {
		return {};
	}
};
</script>
<style lang="scss" scope>
@import "../../assets/styles/index";
.nav-drawer {
	.title_items {
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
</style>
