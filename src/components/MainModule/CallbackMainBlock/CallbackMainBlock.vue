<script>
import RestHelper from "../../../helpers/RestHelper";

const restHelper = new RestHelper();
export default {
	name: "CallbackMainBlock",
	data(){
		return {
			usersCompleteRu: [],
			usersCompleteEng: [],
			usersAll: [],
			userValue: null,
			callBackText: '',
			callBackServer: false,
		}
	},

	async mounted() {
		await this.getUser()
	},

	methods: {
		sendCallBackForm: async function () {
			try {
				const { data } = await restHelper.postEntity('/feedbackForm', {
					userId: this.userValue,
					text: this.callBackText,
				}, true);
				console.log('[RESPONSE-callback/send', data);
				this.callBackServer = true;
				this.userValue = null;
				this.callBackText = '';
				setTimeout(()=>{this.callBackServer = false;}, 5000);
			} catch (e) {
				console.error('[ERROR callback/sendform]', e);
			}
		},

		getUser: async function () {
			const url = "/users";
			try {
				const { data } = await restHelper.getEntity(url, true);
				this.setUserArray(data)
			} catch (e) {
				console.error("ERROR CallBackForm/getUser:", e);
			}
		},

		setUserArray: function(users) {
			this.usersCompleteRu= [];
			this.usersCompleteEng= [];
			this.usersAll = [];
			users.forEach(item => {
				let userPropRu = {
					text: item.lastnameRu + " " + item.firstnameRu + " " + item.patronymicRu,
					value: item.id,
				};
				let userPropEng = {
					text: item.firstnameEn + " " + item.lastnameEn,
					value: item.id,
				};
				let userAll = {
					id: item.id,
					img: item.img || "null.png",
					name_ru:
						item.lastnameRu + " " + item.firstnameRu + " " + item.patronymicRu,
					name_en: item.firstnameEn + " " + item.lastnameEn,
					position_ru: item.positionName ? item.positionName : "",
					position_en: item.positionNameEng ? item.positionNameEng : "",
					section_ru: item.sectionName ? item.sectionName : "",
					section_en: item.sectionNameEng ? item.sectionNameEng : "",
					state_ru: item.state ? item.state.value_ru : "",
					state_en: item.state ? item.state.value_en : "",
					city_ru: item.cityName ? item.cityName : "",
					city_en: item.cityNameEng ? item.cityNameEng : "",
					state_id: item.state_id
				}
				this.usersAll.push(userAll);
				this.usersCompleteRu.push(userPropRu);
				this.usersCompleteEng.push(userPropEng);
			})
		},
	}
};
</script>


<template lang="pug">
	section.callback
		h2 {{ $t("CallbackMainBlock.title") }}
		p {{ $t("CallbackMainBlock.subTitle") }}

		v-form.callback-form
			v-autocomplete.callback-form__select(
				v-model="userValue"
				:items="$t('lang') === 'ru'? usersCompleteRu: usersCompleteEng"
				filled
				outlined
				background-color= "white"
				:label=`$t("ApplicationForm.autocomplete")`
			)
			v-textarea.callback-form__writeText(
				v-model="callBackText"
				name="callBackText"
				:label=`$t("CallbackMainBlock.question")`
				outlined
			)
			v-btn.btn.btn-yellow(@click.stop="sendCallBackForm") {{$t("CallbackMainBlock.send")}}
			p.pt-5(v-if="callBackServer") {{$t('CallbackMainBlock.resp')}}
</template>



<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";

.callback {
  margin-bottom: 100px;
  padding-top: 50px;
  padding-bottom: 80px;

  text-align: center;

  background-image: url(/img/imgComponents/StartVoting/question.svg);
  background-repeat: no-repeat;
  background-position: 120% center;
}

.callback h2 {
  margin-bottom: 10px;
}

.callback p {
  margin-bottom: 40px;
}

.callback-form {
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .callback-form__field {
    width: 100%;
  }
	.callback-form__select {
		width: 100%;
	}
	.callback-form__writeText {
		width: 100%;
	}
}

.callback-form .btn {
  width: 250px !important;
  text-align: center;
  padding: 0 !important;
  margin-top: 30px;
}

@media screen and (max-width: 1024px) {
  .callback {
    padding-top: 0;

    background: none;
  }
}
</style>
