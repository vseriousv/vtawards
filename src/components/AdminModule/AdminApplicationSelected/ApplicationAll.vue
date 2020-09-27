<script>
	import ApplicationCatalog from "./ApplicationCatalog";
	// import RestHelper from "../../../helpers/RestHelper";


	// const restHelper = new RestHelper();

export default {
	name: "ApplicationAll",

	components: {
		ApplicationCatalog,
	},

	data() {
		return {
			// dialog: false,
			// dialogTable: "",
			tab: null,
			// idField: null,
            tabs: [{ id: 0, name: "Номинанты", value: "nominees" },]
		};
	},

	methods: {

		// addFieldTable: async function(table, dataSend) {
		// 	const urn = "/" + table + "/create";
		// 	try {
		// 		await restHelper.postEntity(urn, dataSend, true);
		// 		this.handleReversModal();
		// 	} catch (e) {
		// 		this.errorStr = "Неправильно заполнены поля";
		// 	}
		// },

	},
};
</script>


<template lang="pug">
.containerAdmin
	v-card(style="height: 100%")
		v-tabs.contTabs( background-color="white" color="#FEBA13" )
			v-tab( v-for="tabOne in tabs" :key="`items${tabOne.id}`" ) {{tabOne.name}}

			v-tab-item
				application-catalog
				
</template>
