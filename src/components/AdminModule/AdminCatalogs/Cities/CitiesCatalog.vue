<script>
import axios from "axios";
import config from "../../../../constants/config";
export default {
	name: "CitiesCatalog",
	data() {
		return {
			itemData: [],
			headersTable: [
				{
					text: "Номер",
					value: "id",
					align: "start"
				},
				{ text: "Город (Русский)", value: "value_ru" },
				{ text: "Город (Англйиский)", value: "value_en" },
				{ text: "Модификация", value: "modify", align: "end", sortable: false }
			],
			search_text: ""
		};
	},
	created() {
		this.getData();
	},
	methods: {
		createField: function() {
			this.$emit("handleModal", null, "cities");
		},

		updateID: function(id) {
			this.$store.commit("setAdminValueRu", "");
			this.$store.commit("setAdminValueEn", "");
			this.$store.commit(
				"setAdminValueRu",
				this.itemData.find(item => item.id === id).value_ru
			);
			this.$store.commit(
				"setAdminValueEn",
				this.itemData.find(item => item.id === id).value_en
			);
			this.$emit("handleModal", id, "cities");
		},

		getData: function() {
			const url = config.API_URL + "/cities";
			axios
				.get(url, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => (this.itemData = result.data))
				.catch(e => console.error("cities-error:", e));
		}
	}
};
</script>

<template lang="pug">
.ContentTabs
	.ContentTabs__tools.d-flex.justify-space-between.pl-2
		.ContentTabs__search
			v-text-field(
				v-model="search_text"
				label="Search"
				append-icon="mdi-magnify"
				outlined
				dense
				single-line
				hide-details
			)
		.ContentTabs__toolbar.d-flex.justify-end
			v-btn.manageBTN(
				@click.stop="createField"
				color="green lighten-2"
				dark
				small
				outlined
			)
				v-icon mdi-plus
				span Create
			v-btn.manageBTN(
				@click.stop="getData"
				color="green lighten-2"
				dark
				small
			)
				v-icon mdi-refresh
				span Update


	.ContentTable
		v-data-table.ContentTable__table(
				:headers="headersTable"
				:items="itemData"
				:search="search_text"
			)
			template(v-slot:item="{ item }")
				tr.ContentTable__row
					td.text-left {{ item.id }}
					td.text-left {{ item.value_ru }}
					td.text-left {{ item.value_en }}
					td.ContentTable__field.ContentTable__btn.d-flex.justify-end.align-center
						v-btn(
							@click.stop="updateID(item.id)"
							color="green lighten-2"
							dark
							small
							icon
						)
							v-icon mdi-pencil

</template>

<style lang="sass" scoped>
.ContentTable
	&__table
		width: 100%
		height: 100%

.manageBTN
	margin: 0 10px
</style>
