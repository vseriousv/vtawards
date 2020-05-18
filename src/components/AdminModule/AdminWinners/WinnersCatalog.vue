<template>
  <div>
    <v-container fluid class="contTabs">
      <v-row class="createField_row">
        <div class="FindFiled">
          <v-text-field
            outlined
            dense
            v-model="search_winner"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <div class="createField">
          <template>
            <v-btn
              class="manageBTN"
              color="green lighten-2"
              dark
              small
              @click.stop="createField"
            >
              Добавить
            </v-btn>
            <v-btn
              class="manageBTN"
              color="blue lighten-2"
              dark
              small
              @click.stop="getWinners"
            >
              Обновить
            </v-btn>
          </template>
        </div>
      </v-row>
      <v-row>
        <v-data-table
          class="tableAll"
          :headers="headers_winners"
          :items="winners"
          :search="search_winner"
        >
          <template v-slot:item="{ item }">
            <tr class="tr_row">
              <td class="td_block text-left">{{ item.tab_number }}</td>
              <td class="td_block text-center">
                <div class="avatar">
                  <img :src="`${URL_AVATARS}${item.img}`" />
                </div>
              </td>
              <td class="td_block">{{ item.name_ru }}</td>
              <td class="td_block">{{ item.year }}</td>
              <td class="td_block">{{ item.type }}</td>
              <td class="manageDelete td_block">
                <v-btn
                  class="manageBTN"
                  color="green lighten-2"
                  dark
                  small
                  @click.stop="updateWinnersID(item.id)"
                >
                  Исправить
                </v-btn>
                <v-btn
                  class="manageBTN"
                  color="red lighten-2"
                  dark
                  small
                  @click.stop="removeWinners(item.id)"
                >
                  Удалить
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../../constants/config";
export default {
  name: "MemberCatalog",
  data() {
    return {
      winners: [],
      headers_winners: [
        {
          text: "Таб номер",
          align: "start",
          value: "tab_number"
        },
        { text: "Аватар", value: "img" },
        { text: "ФИО", value: "name_ru" },
        { text: "Год голосования", value: "year" },
        { text: "Тип голосования", value: "type" },
        { text: "Модификация", value: "modify" }
      ],
      userItem: "",
      search_winner: "",
      URL_AVATARS: config.URL_AVATARS
    };
  },
  created() {
    this.getWinners();
  },
  methods: {
    createField: function() {
      this.$emit("handleModal", null, "winners");
    },
    updateWinnersID: function(id) {
      this.$store.commit("setWinnerId", "");
      this.$store.commit("setWinnerUser_Id", "");
      this.$store.commit("setWinnerVotingId", "");
      this.$store.commit(
        "setWinnerId",
        this.winners.find(item => item.id === id).id
      );
      this.$store.commit(
        "setWinnerUser_Id",
        this.winners.find(item => item.id === id).user_id
      );
      this.$store.commit(
        "setWinnerVotingId",
        this.winners.find(item => item.id === id).voting_id
      );
      this.$emit("handleModal", id, "winners");
    },
    getWinners: function() {
      const url = config.API_URL + "/winners";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.setUsersArray(result.data);
        })
        .catch(e => console.error("winners-error:", e));
    },
    setUsersArray: async function(data) {
      for (let i = 0; i < data.length; i++) {
        const userObject = {
          id: data[i].user.id,
          tab_number: data[i].user.tab_number,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru:
            data[i].user.firstname_ru +
            " " +
            data[i].user.patronymic_ru +
            " " +
            data[i].user.lastname_ru,
          year: data[i].voting ? data[i].voting.year : "",
          type: data[i].voting ? data[i].voting.type_voting : ""
        };
        this.winners.push(userObject);
      }
    },
    removeWinners: function(id) {
      const url = config.API_URL + "/winners/" + id;
      axios
        .delete(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.getWinners();
          return result;
        })
        .catch(e => console.error("winners-error:", e));
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
  .tr_row {
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      margin: 5px;
      img {
        width: 44px;
        height: 44px;
      }
    }
    .td_block {
      min-height: 63px;
    }
  }
}
.createField_row {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  .createField {
    .manageBTN {
      margin: 0 10px;
    }
  }
}
.FindFiled {
  display: flex;
  .FindFiled_row {
    display: flex;
    padding: 0;
    .find_complete {
      margin: 0 5px;
    }
  }
}
</style>
