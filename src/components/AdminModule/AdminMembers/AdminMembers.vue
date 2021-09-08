<script>
import MembersCatalog from "./MembersCatalog";
import MembersModal from "./MembersModal";

import config from "../../../constants/config";
import axios from "axios";

export default {
	name: "AdminMembers",

	components: {
		MembersCatalog,
		MembersModal
	},

	data() {
		return {
			dialog: false,
			dialogTable: "",
			tab: null,
			idField: null,
			tabs: [{ id: 0, name: "Участники", value: "participants" }]
		};
	},

	methods: {
		handleReversModal: function() {
			this.dialog = !this.dialog;
		},

		handleModal: function(id, table) {
			this.idField = id || null;
			this.dialogTable = table;
			this.handleReversModal();
		},

		addFieldTable: function(table, dataSend) {
			const url = config.API_URL + "/" + table + "/create";
			axios
				.post(url, dataSend, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.handleReversModal();
					return result;
				})
				.catch(error => {
					if (error.response.status === 400) {
						this.errorStr = "Неправильно заполнены поля";
					} else {
						this.errorStr = error.response.status + "";
					}
				});
		},

		updateFieldTableID: function(table, dataSend) {
			const url = config.API_URL + "/" + table + "/" + this.idField;
			axios
				.put(url, dataSend, {
					headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
				})
				.then(result => {
					this.handleReversModal();
					return result;
				})
				.catch(error => {
					if (error.response.status === 400) {
						this.errorStr = "Неправильные данные";
					} else {
						this.errorStr = error.response.status + "";
					}
				});
		}
	}
};
</script>

<template lang="pug">
	.containerAdmin
		v-dialog(v-model="dialog" width="500")
			members-modal(
				v-if="dialogTable === 'participants'"
				@handleReversModal="handleReversModal"
				@addFieldTable="addFieldTable"
				@updateFieldTableID="updateFieldTableID"
				:idField="idField"
			)

		v-card(style="height: 100%")
		v-tabs.contTabs( background-color="white" color="#FEBA13" )
			v-tab( v-for="tabOne in tabs" :key="`items${tabOne.id}`" ) {{tabOne.name}}

			v-tab-item
				members-catalog(@handleModal="handleModal")

</template>
