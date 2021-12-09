<template lang="pug">
.containerWinner.px-6

    h2.mb-8(v-html='$t("winnersAllBlock.head.text1")+" "+$t("winnersAllBlock.head.final")+" "+$t("winnersAllBlock.head.autumn_committee_voting")')
    .nominationSt2
        v-row.row-nomination.row-nomination_final
            v-col.boxWinner(
                v-for="item in arrWinnersFinal"
                :key="item.id"
                :lg="4"
                :md="4"
                :sm="6"
            )
                h4.finalistTitle.mb-5 {{$t("winnersAllBlock.head.finalistTitle") + " " + item.nomination}}
                img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                p.boxWinner__nameWinner {{item.name}}
                //- p.text-center {{item.nomination}}
                p.text-center {{item.region}}

    h2(v-if="arrWinners2_ru.length || arrWinners2_en.length").mb-8(v-html='$t("winnersAllBlock.head.text1")+" "+$t("winnersAllBlock.head.semifinal_voting2")+" "+$t("winnersAllBlock.head.autumn_committee_voting")')
    .nominationSt2(v-if="arrWinners2_ru.length || arrWinners2_en.length")
        v-row.row-nomination
            .row1
                h3(v-if="arrWinners2_ru.length").mb-8.ml-12(v-html='$t("winnersAllBlock.nomination_1")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 1"
                        v-for="item in arrWinnersSt3"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

            .row2
                h3(v-if="arrWinners2_ru.length").my-8.ml-12(v-html='$t("winnersAllBlock.nomination_2")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 2"
                        v-for="item in arrWinnersSt3"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

            .row3
                h3(v-if="arrWinners2_ru.length").my-8.ml-12(v-html='$t("winnersAllBlock.nomination_3")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 3"
                        v-for="item in arrWinnersSt3"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

    h2(v-if="arrWinners_ru.length || arrWinners_en.length").mb-8(v-html='$t("winnersAllBlock.head.text1")+" "+$t("winnersAllBlock.head.semifinal_voting")+" "+$t("winnersAllBlock.head.autumn_committee_voting")')
    .nominationSt2(v-if="arrWinners_ru.length || arrWinners_en.length")
        v-row.row-nomination
            .row1
                h3(v-if="arrWinners_ru.length").mb-8.ml-12(v-html='$t("winnersAllBlock.nomination_1")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 1"
                        v-for="item in arrWinnersSt2"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

            .row2
                h3(v-if="arrWinners_ru.length").my-8.ml-12(v-html='$t("winnersAllBlock.nomination_2")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 2"
                        v-for="item in arrWinnersSt2"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

            .row3
                h3(v-if="arrWinners_ru.length").my-8.ml-12(v-html='$t("winnersAllBlock.nomination_3")')
                v-row
                    v-col.boxWinner(
                        v-if="item.nominationId == 3"
                        v-for="item in arrWinnersSt2"
                        :key="item.id"
                        :lg="3"
                        :md="4"
                        :sm="6"
                    )
                        img.boxWinner__imgWinner(:src="`${URL_AVATARS}${item.imgWinner}`" :class=`"boxWinner__imgWinner__" + item.id`)
                        p.boxWinner__nameWinner {{item.name}}
                        p.text-center {{item.nomination}}
                        p.text-center {{item.region}}

</template>

<script>
import RestHelper from "../../../helpers/RestHelper";
import config from "../../../constants/config";

const restHelper = new RestHelper();

export default {
	name: "WinnersBlock",

	data() {
		return {
			URL_AVATARS: config.URL_AVATARS,

			arrWinners_ru: [],
			arrWinners_en: [],

			arrWinners2_ru: [],
			arrWinners2_en: [],

			arrWinnersFinal_ru: [],
			arrWinnersFinal_en: [],

			winnersSt2: ""
		};
	},

	computed: {
		arrWinnersSt2: function() {
			if (this.$t("lang") == "ru") {
				return this.arrWinners_ru;
			} else {
				return this.arrWinners_en;
			}
		},
		arrWinnersSt3: function() {
			if (this.$t("lang") == "ru") {
				return this.arrWinners2_ru;
			} else {
				return this.arrWinners2_en;
			}
		},
		arrWinnersFinal: function() {
			if (this.$t("lang") == "ru") {
				console.log(this.arrWinnersFinal_ru);
				return this.arrWinnersFinal_ru;
			} else {
				return this.arrWinnersFinal_en;
			}
		}
	},

	created() {
		this.getUsers();
		this.getUsers2();
	},

	methods: {
		getUsers: async function() {
			const url = "/nomination-order/step2";
			try {
				const dataUser = await restHelper.getEntity(url, true);
				// console.log("winner",dataUser.data.rows)
				if (dataUser.data.rows.length == 0) {
					return false;
				} else {
					this.setUsersArray(dataUser.data.rows);
				}
			} catch (e) {
				console.error("ERROR WinnerBlock/getUser:", e);
			}
		},
		getUsers2: async function() {
			const url = "/nomination-order/step3";
			try {
				const dataUser = await restHelper.getEntity(url, true);
				// console.log("winner",dataUser.data.rows)
				if (dataUser.data.rows.length == 0) {
					return false;
				} else {
					this.setUsersArray2(dataUser.data.rows);
				}
			} catch (e) {
				console.error("ERROR WinnerBlock/getUser:", e);
			}
		},

		setUsersArray: function(data) {
			this.arrWinners_ru = [];
			this.arrWinners_en = [];
			const winners = data.filter(winner => winner.step2 === true);
			// console.log(winners)
			winners.forEach(item => {
				this.arrWinners_ru.push({
					imgWinner: item.user.img || "null.png",
					name: item.user.firstnameRu + " " + item.user.lastnameRu,
					nomination: item.nomination.valueRu,
					nominationId: item.nomination.id,
					region: item.user.state.value_ru
				});
				this.arrWinners_en.push({
					imgWinner: item.user.img || "null.png",
					name: item.user.firstnameEn + " " + item.user.lastnameEn,
					nomination: item.nomination.valueEn,
					nominationId: item.nomination.id,
					region: item.user.state.value_en
				});
			});
			// console.log(this.arrWinners_en)
		},

		setUsersArray2: function(data) {
			this.arrWinners2_ru = [];
			this.arrWinners2_en = [];
			const winners = data.filter(winner => winner.step3 === true);
			// console.log(winners)
			winners.forEach(item => {
				this.arrWinners2_ru.push({
					id: item.userId,
					imgWinner: item.user.img || "null.png",
					name: item.user.firstnameRu + " " + item.user.lastnameRu,
					nomination: item.nomination.valueRu,
					nominationId: item.nomination.id,
					region: item.user.state.value_ru
				});
				this.arrWinners2_en.push({
					id: item.userId,
					imgWinner: item.user.img || "null.png",
					name: item.user.firstnameEn + " " + item.user.lastnameEn,
					nomination: item.nomination.valueEn,
					nominationId: item.nomination.id,
					region: item.user.state.value_en
				});
			});
			this.setUsersFinal();
			// console.log("step3",this.arrWinners2_en)
		},

		setUsersFinal: function() {
			this.arrWinnersFinal_ru = [];
			this.arrWinnersFinal_en = [];

			this.arrWinners2_ru.forEach(item => {
				if (item.id == 1537 || item.id == 1251 || item.id == 1913) {
					this.arrWinnersFinal_ru.push(item);
				}
			});
			this.arrWinners2_en.forEach(item => {
				if (item.id == 1537 || item.id == 1251 || item.id == 1913) {
					this.arrWinnersFinal_en.push(item);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/index.scss";

.row-nomination {
	display: flex;
	flex-direction: column;

	&_final {
		flex-direction: row;
	}

	.finalistTitle {
		max-width: 300px;
		text-align: center;
	}
}

.containerWinner {
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	margin-top: 70px;
	margin-bottom: 50px;
}
.boxWinner {
	display: flex;
	flex-direction: column;
	align-items: center;

	&__imgWinner {
		height: 150px;
		width: 150px;
		object-fit: cover;
		border-radius: 100%;
		margin-bottom: 20px;
		&__2 {
			object-position: center -20px;
		}
		&__6,
		&__12,
		&__13 {
			object-position: center -10px;
		}
	}
	&__yearWinner {
		font-size: 18px;
		margin-bottom: 4px;
		color: $primaryColor;
		font-weight: bold;
	}
	&__nameWinner {
		font-size: 20px;
		font-weight: 500;
		margin-bottom: 8px;
		text-align: center;
	}
	&__positionWinner {
		font-size: 14px;
		text-align: center;
		max-width: 230px;
		font-style: italic;
	}
}
</style>
