<script>
	export default {
		name: "Drawer",
		props: {
			mvarian: {
				type: Boolean,
				default: null
			}
		},
		data() {
			return {
				items: [
					{ title: "Админ панель", icon: "mdi-view-dashboard",link: "/admin/general" },
					{ title: "Пользователи", icon: "mdi-account-group", link: "/admin/users" },
					{ title: "Заявки", icon: "mdi-account-card-details", link: "/admin/applications" },
					{ title: "Избранные заявки", icon: "mdi-account-star", link: "/admin/selected" },
					{ title: "Второй этап", icon: "mdi-debug-step-over", link: "/admin/step2" },
					{ title: "Комментарии", icon: "mdi-comment-account", link: "/admin/comments" },
					{ title: "Голосование", icon: "mdi-account-check", link: "/admin/result-voting" },
					// { title: "Voting", icon: "mdi-ballot-outline", link: "/admin/voting" },
					// { title: "Members", icon: "mdi-account-multiple-check", link: "/admin/members" },
					// { title: "Winners", icon: "mdi-account-star", link: "/admin/winners" },
					// { title: "Сatalogs", icon: "mdi-form-dropdown", link: "/admin/catalogs" },
					{ title: "On Site", icon: "mdi-page-next", link: "/" }
				]
			};
		}
	};
</script>

<template lang="pug">
v-navigation-drawer(
	:mini-variant="mvarian"
	disable-resize-watcher
	app
	dark
	src="/img/imgComponents/AdminModule/Drawer/DrawerImg4.jpg"
	fixed
	mobile-break-point="300px"
)
	.topMargin
		v-list.py-3(dense nav)
			v-list-item(v-for="item in items" :key="item.title" link :to="item.link")
				v-list-item-icon
					v-icon {{ item.icon }}

				v-list-item-content
					v-list-item-title {{ item.title }}

		v-divider

</template>


<style lang="scss" scoped>
.topMargin {
  margin-top: 35px !important;
}
</style>
