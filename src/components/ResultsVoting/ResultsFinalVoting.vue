<template lang="pug">
v-container
  v-card(style="height: 100%")
    .ParticipansCatalog
        v-row.d-flex.pb-4.ParticipansCatalog__boxBtn
          .ParticipansCatalog__search.d-flex.px-3
            v-text-field(
              v-model="search_user"
              label="Search"
              append-icon="mdi-magnify"
              outlined
              dense
              single-line
              hide-details
              :disabled='this.filterNull'
            )

          .ParticipansCatalog__select
            v-select.selectNomination(
              v-model="nominationSelect"
              item-text="text"
              item-value="value"
              :items="$t('lang') === 'ru'? nominationRu: nominationEn"
              :label=`$t("ApplicationForm.nominationLabel")`
              dense
              outlined
            )
            v-select.selectStates(
              v-model="statesSelect"
              item-text="text"
              item-value="value"
              :items="$t('lang') === 'ru'? statesRu: statesEn"
              :label="$t('lang') === 'ru'? 'Выбрать регион': 'Select State'"
              dense
              outlined
            )
        v-row
          h3.px-4(v-if="filterNull && this.$t('lang') === 'ru'") Укажите оба фильтра для отображения результата
          h3.px-4(v-if="filterNull && this.$t('lang') === 'en'") Specify both filters to display the result
          v-data-table.ParticipansCatalog__table(
            :headers="this.$t('lang') === 'ru'? headersUserRu: headersUserEn"
            :items="participants"
            :search="search_user"
            v-if="!filterNull"
          )
            template(v-slot:item="{ item }")
              tr.ParticipansCatalog__row(
                  @click.stop=""
                )
                td.td_block.text-center
                  .ParticipansCatalog__avatar
                    img(:src="`${URL_AVATARS}${item.img}`")
                td.td_block.text-left(v-if="$t('lang') === 'ru'") {{ item.name_ru }}
                td.td_block.text-left(v-if="$t('lang') === 'en'") {{ item.name_en }}
                td.td_block.text-center {{ item.sumVote.toFixed(3) }}
                td.td_block.text-center {{ item.countVote.toFixed(3) }}
                td.td_block.text-center {{ item.average.toFixed(3) }}
                td.td_block.text-center {{ item.resultRange.toFixed(3) }}
</template>

<script>
import config from "../../constants/config";
import RestHelper from "../../helpers/RestHelper";

const restHelper = new RestHelper();

export default {
	name: "ResultsVoting",
	data() {
		return {
			committee: [],
			URL_AVATARS: config.URL_AVATARS,

			statesRu: [],
			statesEn: [],
			statesSelect: 5555,

			nominationRu: [],
			nominationEn: [],
			nominationSelect: 0,

			headersUserRu: [
				{ text: "Аватар", sortable: false, value: "" },
				{ text: "ФИО", sortable: true, value: "name_ru" },
				{ text: "Сумма баллов", sortable: false, value: "", align: "center" },
				{ text: "Сумма голосов", sortable: false, value: "", align: "center" },
				{ text: "Средний балл", sortable: false, value: "", align: "center" },
				{
					text: "Итоги ранжироввания",
					sortable: false,
					value: "",
					align: "center"
				}
			],

			headersUserEn: [
				{ text: "Avatar", sortable: false, value: "" },
				{ text: "Full name", sortable: true, value: "name_en" },
				{ text: "Total points ", sortable: false, value: "", align: "center" },
				{ text: "Total votes", sortable: false, value: "", align: "center" },
				{ text: "Average score", sortable: false, value: "", align: "center" },
				{ text: "Ranking results", sortable: false, value: "", align: "center" }
			],
			filterNull: true,
			participants: [],
			search_user: ""
		};
	},

	created() {
		this.getNomination();
		this.getState();
	},

	watch: {
		nominationSelect: function(newVal, oldVal) {
			if (newVal == 0) {
				this.filterNull = true;
				return;
			}
			if (
				newVal > 0 &&
				oldVal !== null &&
				newVal !== oldVal &&
				this.statesSelect !== 0
			) {
				this.filterNull = false;
				this.getParticipantsFromIdNomination(newVal, this.statesSelect);
			}
		},
		statesSelect: function(newVal, oldVal) {
			if (newVal == 0) {
				this.filterNull = true;
				return;
			}
			if (
				newVal > 0 &&
				oldVal !== null &&
				newVal !== oldVal &&
				this.nominationSelect !== 0
			) {
				this.filterNull = false;
				this.getParticipantsFromIdNomination(this.nominationSelect, newVal);
			}
		}
	},

	methods: {
		getParticipantsFromIdNomination: async function(nominationId, stateId) {
			const url = `/user-voting/result/${stateId}/${nominationId}`;
			try {
				const data = await restHelper.getEntity(url, true);
				this.setParticipantsArray(data.data);
				// console.log(data.data)
			} catch (e) {
				console.error("ERROR ResultVoting/getParticipantsFromIdNomination:", e);
			}
		},

		setParticipantsArray: async function(data) {
			this.participants = [];
			for (let i = 0; i < data.length; i++) {
				const userObject = {
					img: data[i].img ? data[i].img : "null.png",
					name_ru: data[i].firstnameRu + " " + data[i].lastnameRu,
					name_en: data[i].firstnameEn + " " + data[i].lastnameEn,
					nominationId: data[i].nominationOrderId,

					average: data[i].average,
					countVote: data[i].countVote,
					resultRange: data[i].resultRange,
					sumVote: data[i].sumVote
				};
				this.participants.push(userObject);
				console.log(this.participants);
			}
		},

		getNomination: async function() {
			const url = "/nominations";
			try {
				const { data } = await restHelper.getEntity(url, true);
				this.parseNominationArray(data);
				console.log('getNomination', data)
			} catch (e) {
				console.error("ERROR ResultVoting/getNomination:", e);
			}
		},

		parseNominationArray: function(data) {
			this.nominationRu = [];
			this.nominationEn = [];
			this.nominationRu.push({
				text: "ВСЕ НОМИНАЦИИ",
				value: 0
			});
			this.nominationEn.push({
				text: "ALL NOMINATIONS",
				value: 0
			});
			data.forEach(nomin => {
				let nominationRu = {
					text: nomin.valueRu,
					value: nomin.id
				};
				let nominationEn = {
					text: nomin.valueEn,
					value: nomin.id
				};
				this.nominationRu.push(nominationRu);
				this.nominationEn.push(nominationEn);
			});
		},

		getState: async function() {
			const url = "/states";
			try {
				const { data } = await restHelper.getEntity(url, true);
				this.parseStateArray(data);
				console.log('getState', data);
			} catch (e) {
				console.error("ERROR ResultVoting/getNomination:", e);
			}
		},

		parseStateArray: function(data) {
			this.statesRu = [];
			this.statesEn = [];
			this.statesRu.push({
				text: "ВСЕ РЕГИОНЫ",
				value: 0
			});
			this.statesEn.push({
				text: "ALL REGIONS",
				value: 0
			});
			data.forEach(states => {
				let statesRu = {
					text: states.value_ru,
					value: states.id
				};
				let statesEn = {
					text: states.value_en,
					value: states.id
				};
				this.statesRu.push(statesRu);
				this.statesEn.push(statesEn);
			});
		}
	}
};
</script>

<style lang="sass" scoped>
.selectNomination,.selectStates
  max-width: 300px
  margin-right: 20px
.ParticipansCatalog
  padding: 30px 20px 20px
  &__boxBtn
    align-items: flex-start
    justify-content: space-between
  &__select
    display: flex
    flex-direction: row
  &__addUser
    margin: 0 10px

  &__table
    width: 100%
    height: 100%

  &__row
    width: 100%

  &__avatar
    display: flex
    width: 44px
    height: 44px
    overflow: hidden
    margin: 5px
    img
        border-radius: 50%
        max-width: 44px
        max-height: 44px
        width: 100%
        height: 100%
        object-fit: cover
</style>
