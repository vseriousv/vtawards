<template>
  <v-container fluid>
    <!--        MODAL WINDOW        -->
    <v-dialog v-model="dialog" width="900">
      <users-images-modal
        v-if="dialog_name === 'user-images'"
        @handleReversModal="handleReversModal"
        @updateImageID="updateImageID"
      />
    </v-dialog>
    <!--        !MODAL WINDOW       -->
    <v-row>
      <v-card class="head-card">
        <h2 class="my-3"> Заполните карточку пользователя </h2>
        <div class="head-card__item">
            <p>Таб.номер (tabNumber)</p>
            <v-text-field
                class="mx-3"
                v-model="userID.tabNumber"
                outlined>
            </v-text-field>
        </div>
        <div class="head-card__box">

            <div class="head-card__item">
                <p>Фамилиия</p>
                <v-text-field
                    class="mx-3"
                    v-model="userID.lastnameRu"
                    outlined>
                </v-text-field>
            </div>
        
        </div>
      </v-card>
    </v-row>
    
  </v-container>
</template>

<script>
import config from "../../../constants/config";
import axios from "axios";
import UsersImagesModal from "./UsersImagesModal";

export default {
  name: "AdminAddNewUser",
  components: {
    UsersImagesModal,
  },
  data() {
    return {
        dialog_name: "",
        dialog: false,
        
        URL_AVATARS: config.URL_AVATARS,

        roleEn: [
            {text: "User",
            value: "user"},
            {text: "Admin",
            value: "admin"},
            {text: "Commiti",
            value: "commiti"},
        ],

        userId: {
            tabNumber: '',
            passwordText: '',
            img: "null.png",
            email: '',
            firstnameRu: '',
            lastnameRu: '',
            patronymicRu: '',
            firstnameEn: '',
            lastnameEn: '',
            patronymicEn: '',
            positionName: '',
            sectionName: '',
            cityName: '',
            positionNameEng: '',
            sectionNameEng: '',
            cityNameEng: '',
            role: 0,
            stateId: 0,
        },
    };
  },
  
  async mounted() {
    await this.getStates();
  },
  methods: {
    handleModal: function(dialog_name) {
      this.getUserID(this.$route.params.id);
      this.dialog_name = dialog_name;
      this.handleReversModal();
    },
    handleReversModal: function() {
      this.dialog = !this.dialog;
    },

    getStates: function() {
      const url = config.API_URL + "/states";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.parseStates(result.data);
        })
        .catch(e => console.error("getStates-error:", e));
    },

    parseStates: function(data) {
      this.statesRu = []
      this.statesEn = []
      data.forEach(item => {
        let statesRu = {
            text: item.value_ru,
            value: item.id,
        };
        let statesEn = {
          text: item.value_en,
          value: item.id,
        };
        this.statesRu.push(statesRu)
        this.statesEn.push(statesEn)
      })
    },

    // postNewDataInput: async function(data) {
    //   console.log(data)
    //   const url = "/users/" + this.userID.id;
    //   console.log(url)
	// 			try {
	// 				const postNewDataInput = await axios.patch(
	// 					config.API_URL + url,
	// 					data,

	// 					{ headers: {
	// 							Authorization: 'Bearer ' + localStorage.getItem('jwt'),
	// 						}
	// 					},
    //       );
    //       alert("Данные пользователя обновлены")
	// 				console.log(postNewDataInput)
	// 			} catch(e) {
	// 				console.error("ERROR AdminShowUserId/postNewDataInput:", e);
	// 			}
    // },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";

.head-card {
  width: 100%;
  padding: 10px 20px 30px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  &__item {
    display: flex;
    flex-direction: row;
  }
  &__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    @include respond-to(large-screens) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    > * {
      margin-bottom: -20px;
    }
  }
}
.container-card {
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  .head-content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .form-update {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    @include respond-to(large-screens) {
      flex-direction: row;
    }

    .img-avatar {
      max-width: 200px;
      max-height: 250px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 10px 30px 20px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        max-width: 200px;
        max-height: 250px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .userData {
      display: flex;
      flex-direction: column;
      max-width: 800px;
      width: 100%;
      &__item {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        > p {
          padding-top: 17px;
        }
      }
      &__input {
        &_autocomplete {
          padding-top: 9px;
        }
      }
      &__btn {
        padding-top: 17px;
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }
  .description-user {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .head-content {
      display: flex;
      justify-content: space-between;
    }
    p {
      margin: 10px 10px 20px;
    }
  }
}
</style>
