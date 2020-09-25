<template>
  <section class="result-voting mxw1200">
    <v-simple-table class="tableAll">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">{{ $t("membersBlock.table.member") }}</th>
            <th class="text-center">
              {{ $t("membersBlock.table.count_committee_votes") }}
            </th>
            <th class="text-center">
              {{ $t("membersBlock.table.committee_rating") }}
            </th>
            <th class="text-center">
              {{ $t("membersBlock.table.sr_rating") }}
            </th>
            <th class="text-center">
              {{ $t("membersBlock.table.count_votes") }}
            </th>
            <!--                    <th class="text-center">{{$t("membersBlock.table.result_rating")}}</th>-->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(itemField, id) in committee"
            class="tr_row"
            :key="`committeeItem${id}`"
          >
            <td class="td_block text-center">
              <div class="avatar">
                <img :src="`${URL_AVATARS}${itemField.img}`" />
              </div>
            </td>
            <td v-if="$t('lang') === 'ru'" class="td_block">
              {{ itemField.name_ru }}
            </td>
            <td v-if="$t('lang') === 'en'" class="td_block">
              {{ itemField.name_en }}
            </td>
            <td class="td_block text-center">
              {{ itemField.committee_rating }}
            </td>
            <td class="td_block text-center">
              {{ itemField.count_committee_votes }}
            </td>
            <td class="td_block text-center">{{ itemField.sr_rating }}</td>
            <td class="td_block text-center">{{ itemField.count_votes }}</td>
            <!--                    <td class="td_block text-center">{{ itemField.result_rating}} </td>-->
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
  name: "ResultsVoting",
  data() {
    return {
      committee: [],
      URL_AVATARS: config.URL_AVATARS
    };
  },
  created() {
    this.getCommittee();
  },
  methods: {
    getCommittee: function() {
      const url = config.API_URL + "/participants/isactive";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          console.log(result.data);
          this.setUsersArray(result.data);
        })
        .catch(e => console.error("committee-error:", e));
    },
    setUsersArray: async function(data) {
      for (let i = 0; i < data.length; i++) {
        let committee_avg = 0;
        if (data[i].result) {
          committee_avg =
            data[i].result.committee_votes !== 0
              ? +data[i].result.committee_votes /
                +data[i].result.committee_rating
              : 0;
        }

        const userObject = {
          id: data[i].user.id,
          tabNumber: data[i].user.tabNumber,
          img: data[i].user.img ? data[i].user.img : "null.png",
          name_ru:
            data[i].user.firstname_ru +
            " " +
            data[i].user.patronymic_ru +
            " " +
            data[i].user.lastname_ru,
          name_en: data[i].user.firstname_en + " " + data[i].user.lastname_en,

          committee_rating: data[i].result ? data[i].result.committee_votes : 0,
          count_committee_votes: data[i].result
            ? data[i].result.committee_rating
            : 0,
          sr_rating: committee_avg,
          count_votes: data[i].result ? data[i].result.votes : 0,
          result_rating: data[i].result ? data[i].result.summ : 0
        };
        this.committee.push(userObject);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.result-voting {
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
