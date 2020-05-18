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
              @click.stop="getVoting"
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
                <th class="text-left">Год</th>
                <th class="text-left">Тип голосования</th>
                <th class="text-left">Статус</th>
                <th class="text-right">Удалить/Исправить</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(itemField, id) in voting"
                :key="`itemField${itemField.id}`"
                class="fieldsRow"
              >
                <td class="tdFields">{{ id + 1 }}</td>
                <td class="tdFields">{{ itemField.year }}</td>
                <td class="tdFields">{{ itemField.type_voting }}</td>
                <td class="tdFields">
                  <v-checkbox
                    v-model="itemField.is_active"
                    readonly
                    dense
                  ></v-checkbox>
                </td>
                <td class="manageDelete tdFields">
                  <v-btn
                    class="manageBTN"
                    color="green lighten-2"
                    dark
                    small
                    @click.stop="updateVotingID(itemField.id)"
                  >
                    Исправить
                  </v-btn>
                  <v-btn
                    class="manageBTN"
                    color="red lighten-2"
                    dark
                    small
                    @click.stop="removeVoting(itemField.id)"
                  >
                    Удалить
                  </v-btn>
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
import config from "../../../constants/config";
export default {
  name: "VotingCatalog",
  data() {
    return {
      voting: []
    };
  },
  created() {
    this.getVoting();
  },
  methods: {
    createField: function() {
      this.$emit("handleModal", null, "votings");
    },
    updateVotingID: function(id) {
      this.$store.commit("setVotingYear", "");
      this.$store.commit("setVotingType", "");
      this.$store.commit(
        "setVotingYear",
        this.voting.find(item => item.id === id).year
      );
      this.$store.commit(
        "setVotingType",
        this.voting.find(item => item.id === id).type_voting
      );
      this.$emit("handleModal", id, "votings");
    },
    getVoting: function() {
      const url = config.API_URL + "/votings";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => (this.voting = result.data))
        .catch(e => console.error("voting-error:", e));
    },
    removeVoting: function(id) {
      const url = config.API_URL + "/votings/" + id;
      axios
        .delete(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.getVoting();
          return result;
        })
        .catch(e => console.error("voting-error:", e));
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
  .fieldsRow {
    .tdFields {
      min-height: 63px;
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
