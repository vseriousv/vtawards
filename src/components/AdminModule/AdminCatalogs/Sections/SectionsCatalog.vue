<template>
  <div>
    <v-container fluid class="contTabs">
      <v-row class="createField_row">
        <div class="createField">
          <template>
            <v-btn
              class="manageBTN"
              color="green lighten-2"
              dark
              small
              @click.stop="createField"
            >
              Создать
            </v-btn>
            <v-btn
              class="manageBTN"
              color="blue lighten-2"
              dark
              small
              @click.stop="getSections"
            >
              Обновить
            </v-btn>
          </template>
        </div>
      </v-row>
      <v-row>
        <v-simple-table class="tableAll">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Номер</th>
                <th class="text-left">Отдел (Русский)</th>
                <th class="text-left">Отдел (Англйиский)</th>
                <th class="text-right">Удалить/Исправить</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(itemField, id) in sections"
                :key="`itemField${itemField.id}`"
              >
                <td>{{ id + 1 }}</td>
                <td>{{ itemField.value_ru }}</td>
                <td>{{ itemField.value_en }}</td>
                <td class="manageDelete">
                  <v-btn
                    class="manageBTN"
                    color="green lighten-2"
                    dark
                    small
                    @click.stop="updatePositionID(itemField.id)"
                  >
                    Исправить
                  </v-btn>
                  <!--                            <v-btn-->
                  <!--                                class="manageBTN"-->
                  <!--                                color="red lighten-2"-->
                  <!--                                dark small-->
                  <!--                                @click.stop="removePosition(itemField.id)"-->
                  <!--                            >-->
                  <!--                                Удалить-->
                  <!--                            </v-btn>-->
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../../../constants/config";
export default {
  name: "SectionsCatalog",
  data() {
    return {
      sections: []
    };
  },
  created() {
    this.getSections();
  },
  methods: {
    createField: function() {
      this.$emit("handleModal", null, "sections");
    },
    updatePositionID: function(id) {
      this.$store.commit("setAdminValueRu", "");
      this.$store.commit("setAdminValueEn", "");
      this.$store.commit(
        "setAdminValueRu",
        this.sections.find(item => item.id === id).value_ru
      );
      this.$store.commit(
        "setAdminValueEn",
        this.sections.find(item => item.id === id).value_en
      );
      this.$emit("handleModal", id, "sections");
    },
    getSections: function() {
      const url = config.API_URL + "/sections";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => (this.sections = result.data))
        .catch(e => console.error("sections-error:", e));
    },
    removePosition: function(id) {
      const url = config.API_URL + "/sections/" + id;
      axios
        .delete(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.getSections();
          return result;
        })
        .catch(e => console.error("sections-error:", e));
    }
  }
};
</script>

<style lang="scss" scoped>
.tableAll {
  width: 100%;
  height: 100%;
  .manageDelete {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .manageBTN {
      margin: 0 10px;
    }
  }
}
.createField_row {
  display: flex;
  justify-content: flex-end;
  .createField {
    .manageBTN {
      margin: 0 10px;
    }
  }
}
</style>
