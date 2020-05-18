<template>
  <div class="containerAdmin">
    <!-- Card   MODAL      -->
    <div>
      <v-dialog v-model="dialog" width="500">
        <positions-modal
          v-if="dialogTable === 'positions'"
          @handleReversModal="handleReversModal"
          @addFieldTable="addFieldTable"
          @updateFieldTableID="updateFieldTableID"
          :idField="idField"
        />
        <sections-modal
          v-if="dialogTable === 'sections'"
          @handleReversModal="handleReversModal"
          @addFieldTable="addFieldTable"
          @updateFieldTableID="updateFieldTableID"
          :idField="idField"
        />
        <states-modal
          v-if="dialogTable === 'states'"
          @handleReversModal="handleReversModal"
          @addFieldTable="addFieldTable"
          @updateFieldTableID="updateFieldTableID"
          :idField="idField"
        />
        <cities-modal
          v-if="dialogTable === 'cities'"
          @handleReversModal="handleReversModal"
          @addFieldTable="addFieldTable"
          @updateFieldTableID="updateFieldTableID"
          :idField="idField"
        />
        <nominations-modal
          v-if="dialogTable === 'nominations'"
          @handleReversModal="handleReversModal"
          @addFieldTable="addFieldTable"
          @updateFieldTableID="updateFieldTableID"
          :idField="idField"
        />
      </v-dialog>
    </div>
    <!-- !Card   MODAL      -->
    <!-- Table   LIST       -->
    <v-card style="height: 100%">
      <v-tabs
        background-color="white"
        color="deep-purple accent-4"
        class="contTabs"
      >
        <v-tab v-for="tabOne in tabs" :key="`items${tabOne.id}`">{{
          tabOne.name
        }}</v-tab>

        <v-tab-item>
          <positions-catalog @handleModal="handleModal" />
        </v-tab-item>
        <v-tab-item>
          <sections-catalog @handleModal="handleModal" />
        </v-tab-item>
        <v-tab-item>
          <states-catalog @handleModal="handleModal" />
        </v-tab-item>
        <v-tab-item>
          <cities-catalog @handleModal="handleModal" />
        </v-tab-item>
        <v-tab-item>
          <nominations-catalog @handleModal="handleModal" />
        </v-tab-item>
      </v-tabs>
    </v-card>
    <!-- !Table   LIST       -->
  </div>
</template>

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

<style lang="scss" scoped>
.containerAdmin {
  height: 100%;
  .titleCatalog {
    padding: 20px;
  }
}
</style>
