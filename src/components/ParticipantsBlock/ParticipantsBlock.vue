<template>
  <section class="participants-block mxw1200">
    <v-simple-table class="tableAll">
      <template v-slot:default>
        <tbody>
          <tr
            v-for="(itemField, id) in participants"
            class="tr_row"
            :key="`itemField${id}`"
            @click.stop="showParticipant(itemField.id)"
          >
            <td class="td_block text-center">
              <div class="avatar">
                <img :src="`${URL_AVATARS}${itemField.img}`" />
              </div>
            </td>
            <td v-if="$t('lang') === 'ru'" class="td_block text-left">
              {{ itemField.name_ru }}
            </td>
            <td v-if="$t('lang') === 'en'" class="td_block text-left">
              {{ itemField.name_en }}
            </td>
            <td v-if="$t('lang') === 'ru'" class="td_block text-left">
              {{ itemField.nomination_ru }}
            </td>
            <td v-if="$t('lang') === 'en'" class="td_block text-left">
              {{ itemField.nomination_en }}
            </td>
            <td v-if="$t('lang') === 'ru'" class="td_block text-left">
              {{ itemField.state_ru }}
            </td>
            <td v-if="$t('lang') === 'en'" class="td_block text-left">
              {{ itemField.state_en }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import config from "../../constants/config";
import axios from "axios";
export default {
  name: "ParticipantsBlock",
  data() {
    return {
      participants: [],
      URL_AVATARS: config.URL_AVATARS
    };
  },
  created() {
    this.getParticipants();
  },
  methods: {
    showParticipant: function(id) {
      this.$router.push({ path: "/participants/id/" + id });
    },
    getParticipants: function() {
      const url = config.API_URL + "/participants/isactive";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          console.log(result.data);
          this.setUsersArray(result.data);
        })
        .catch(e => console.error("participants-error:", e));
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
          name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en,
          state_ru: data[i].user.state ? data[i].user.state.value_ru : "",
          state_en: data[i].user.state ? data[i].user.state.value_en : "",
          nomination_ru: data[i].user.nomination
            ? data[i].user.nomination.value_ru
            : "",
          nomination_en: data[i].user.nomination
            ? data[i].user.nomination.value_en
            : "",
          voting: data[i].voting
        };
        this.participants.push(userObject);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.participants-block {
  width: 100%;
  min-height: 600px;
  margin-top: 50px;
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
}
</style>
