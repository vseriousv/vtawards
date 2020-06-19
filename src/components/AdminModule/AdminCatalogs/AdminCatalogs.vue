<script>
import PositionsCatalog from "./Positions/PositionsCatalog";
import PositionsModal from "./Positions/PositionsModal";
import SectionsCatalog from "./Sections/SectionsCatalog";
import SectionsModal from "./Sections/SectionsModal";
import StatesCatalog from "./States/StatesCatalog";
import StatesModal from "./States/StatesModal";
import CitiesCatalog from "./Cities/CitiesCatalog";
import CitiesModal from "./Cities/CitiesModal";
import NominationsCatalog from "./Nominations/NominationsCatalog";
import NominationsModal from "./Nominations/NominationsModal";

import config from "../../../constants/config";
import axios from "axios";

export default {
  name: "AdminCatalogs",
  components: {
    PositionsCatalog,
    PositionsModal,
    SectionsCatalog,
    SectionsModal,
    StatesCatalog,
    StatesModal,
    CitiesCatalog,
    CitiesModal,
    NominationsCatalog,
    NominationsModal
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
  },
  data() {
    return {
      dialog: false,
      dialogTable: "",
      tab: null,
      idField: null,
      tabs: [
        { id: 0, name: "Должности", value: "positions" },
        { id: 1, name: "Отделы", value: "sections" },
        { id: 2, name: "Регионы", value: "states" },
        { id: 3, name: "Города", value: "cities" },
        { id: 4, name: "Номинации", value: "nominations" }
      ]
    };
  }
};
</script>

<template lang="pug">
.containerAdmin
	v-dialog(v-model="dialog" width="500")
		positions-modal(
			v-if="dialogTable === 'positions'"
			@handleReversModal="handleReversModal"
			@addFieldTable="addFieldTable"
			@updateFieldTableID="updateFieldTableID"
			:idField="idField"
		)
		sections-modal(
			v-if="dialogTable === 'sections'"
			@handleReversModal="handleReversModal"
			@addFieldTable="addFieldTable"
			@updateFieldTableID="updateFieldTableID"
			:idField="idField"
		)
		states-modal(
			v-if="dialogTable === 'states'"
			@handleReversModal="handleReversModal"
			@addFieldTable="addFieldTable"
			@updateFieldTableID="updateFieldTableID"
			:idField="idField"
		)
		cities-modal(
			v-if="dialogTable === 'cities'"
			@handleReversModal="handleReversModal"
			@addFieldTable="addFieldTable"
			@updateFieldTableID="updateFieldTableID"
			:idField="idField"
		)
		nominations-modal(
			v-if="dialogTable === 'nominations'"
			@handleReversModal="handleReversModal"
			@addFieldTable="addFieldTable"
			@updateFieldTableID="updateFieldTableID"
			:idField="idField"
		)
	v-card(style="height: 100%")
		v-tabs.contTabs( background-color="white" color="#FEBA13" )
			v-tab( v-for="tabOne in tabs" :key="`items${tabOne.id}`" ) {{tabOne.name}}

			v-tab-item.pt-2
				positions-catalog(@handleModal="handleModal")
			v-tab-item.pt-2
				sections-catalog(@handleModal="handleModal")
			v-tab-item.pt-2
				states-catalog(@handleModal="handleModal")
			v-tab-item.pt-2
				cities-catalog(@handleModal="handleModal")
			v-tab-item.pt-2
				nominations-catalog(@handleModal="handleModal")
</template>

