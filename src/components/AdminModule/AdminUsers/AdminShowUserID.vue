<template>
  <v-container fluid>
    <!--        MODAL WINDOW        -->
    <v-dialog v-model="dialog" width="900">
      <users-name-modal
        v-if="dialog_name === 'user-name'"
        @handleReversModal="handleReversModal"
        @updateFieldTableID="updateFieldTableID"
      />
      <users-images-modal
        v-if="dialog_name === 'user-images'"
        @handleReversModal="handleReversModal"
        @updateImageID="updateImageID"
      />
      <users-modal
        v-if="dialog_name === 'user-static'"
        @handleReversModal="handleReversModal"
        @updateFieldTableID="updateFieldTableID"
      />
      <users-description-modal
        v-if="dialog_name === 'user-description'"
        @handleReversModal="handleReversModal"
        @updateFieldTableID="updateFieldTableID"
      />
    </v-dialog>
    <!--        !MODAL WINDOW       -->
    <v-row>
      <v-card class="head-card">
        <h2 class="my-3">{{ userID.tabNumber }} - 
          {{ userID.lastname_ru }} 
          {{ userID.firstname_ru }} 
          {{ userID.patronymic_ru }}<br/>
          {{ userID.email }}
        </h2>
        
        <BtnHeadCardUserId
            placeholder="Таб.номер"
            :model="userID.tabNumber"
            tableLine="tabNumber"
            @saveDataInput="savesDataInput"
          />
        <div class="head-card__box">

          <BtnHeadCardUserId
            placeholder="Фамилия"
            :model="userID.lastname_ru"
            tableLine="lastnameRu"
            @saveDataInput="savesDataInput"
          />
          
          <BtnHeadCardUserId
            placeholder="Lastname"
            :model="userID.lastname_en"
            tableLine="lastnameEn"
            @saveDataInput="savesDataInput"
          />
          
          <BtnHeadCardUserId
            placeholder="Имя"
            :model="userID.firstname_ru"
            tableLine="firstnameRu"
            @saveDataInput="savesDataInput"
          />
          
          <BtnHeadCardUserId
            placeholder="Firstname"
            :model="userID.firstname_en"
            tableLine="firstnameEn"
            @saveDataInput="savesDataInput"
          />
          
          <BtnHeadCardUserId
            placeholder="Отчество"
            :model="userID.patronymic_ru"
            tableLine="patronymicRu"
            @saveDataInput="savesDataInput"
          />
          
          <BtnHeadCardUserId
            placeholder="E-mail"
            :model="userID.email"
            tableLine="email"
            @saveDataInput="savesDataInput"
          />

        </div>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="container-card">
        <div class="head-content">
          <h3>Редактируемые данные</h3>
        </div>
        <!-- <v-divider /> -->
        <div class="form-update">
          <div class="img-avatar">
            <img :src="`${URL_AVATARS}${userID.img}`"/>
            <v-btn
              x-small
              color="primary"
              @click.stop="handleModal('user-images')">
              Изменить
            </v-btn>
          </div>
          <div class="userData">
            <div class="userData__box">
              <h3>Данные</h3> 
              <v-list>
                <v-list-item class="userData__item mb-2">
                  <p class="mb-0">Пароль пользователя: {{ userID.userPassword }}</p>
                </v-list-item>

                <v-list-item class="userData__item mb-1">
                  <p class="mb-0">Роль:</p>
                  <v-autocomplete
                      class="mx-3 userData__input userData__input_autocomplete"
                      v-model="userID.role"
                      :items="roleEn"
                      dense
                      filled
                      outlined
                      :disabled="this.btnDisabled[0].saveData"
                      background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      ref="1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(0)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1"
                      ref="11"
                      x-small
                      :disabled="this.btnDisabled[0].saveData"
                      color="primary"
                      @click.stop="saveDataInput(0, {'role': userID.role})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>
                
                <v-list-item class="userData__item">
                  <p class="mb-0">Должность:</p>
                  <BtnContainerCardUserId
                    :model="userID.position_ru"
                    tableLine="positionName"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0">Отдел:</p>
                  <BtnContainerCardUserId
                    :model="userID.section_ru"
                    tableLine="sectionName"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>

                <v-list-item class="userData__item mb-1">
                  <p class="mb-0">Регион:</p>
                  <v-autocomplete
                      class="mx-3 userData__input userData__input_autocomplete"
                      v-model="userID.stateId"
                      :items="statesRu"
                      dense
                      filled
                      outlined
                      :disabled="this.btnDisabled[1].saveData"
                      background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(1)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[1].saveData"
                      color="primary"
                      @click.stop="saveDataInput(1, {'stateId': userID.stateId})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0">Город:</p>
                  <BtnContainerCardUserId
                    :model="userID.city_ru"
                    tableLine="cityName"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>
              </v-list>
            </div>
            <div>
              <h3>Data</h3>
              <v-list>
                <v-list-item class="userData__item mb-2">
                  <p class="mb-0">User Password: {{ userID.userPassword }}</p>
                </v-list-item>

                <v-list-item class="userData__item mb-2">
                  <p class="mb-0">Role:</p>
                  <v-autocomplete
                      class="mx-3 userData__input userData__input_autocomplete"
                      v-model="userID.role"
                      :items="roleEn"
                      dense
                      filled
                      outlined
                      :disabled="this.btnDisabled[2].saveData"
                      background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(2)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[2].saveData"
                      color="primary"
                      @click.stop="saveDataInput(2, {'role': userID.role})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>
                
                <v-list-item class="userData__item">
                  <p class="mb-0">Position:</p>
                  <BtnContainerCardUserId
                    :model="userID.position_en"
                    tableLine="positionNameEng"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0">Section:</p>
                  <BtnContainerCardUserId
                    :model="userID.section_en"
                    tableLine="sectionNameEng"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>

                <v-list-item class="userData__item mb-2">
                  <p class="mb-0">State:</p>
                  <v-autocomplete
                    class="mx-3 userData__input userData__input_autocomplete"
                    v-model="userID.stateId"
                    :items="statesEn"
                    dense
                    filled
                    outlined
                    :disabled="this.btnDisabled[3].saveData"
                    background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(3)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[3].saveData"
                      color="primary"
                      @click.stop="saveDataInput(3, {'stateId': userID.stateId})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0">City:</p>
                  <BtnContainerCardUserId
                    :model="userID.city_en"
                    tableLine="cityNameEng"
                    @saveDataInput="savesDataInput"/>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../../constants/config";
import axios from "axios";
import UsersModal from "./UsersModal";
import UsersDescriptionModal from "./UsersDescriptionModal";
import UsersNameModal from "./UsersNameModal";
import UsersImagesModal from "./UsersImagesModal";
import BtnHeadCardUserId from "./BtnHeadCardUserId";
import BtnContainerCardUserId from "./BtnContainerCardUserId";

export default {
  name: "AdminShowUserID",
  components: {
    UsersNameModal,
    UsersImagesModal,
    UsersModal,
    UsersDescriptionModal,
    BtnHeadCardUserId,
    BtnContainerCardUserId
  },
  data() {
    return {
      dialog_name: "",
      dialog: false,
      userID: "",
      URL_AVATARS: config.URL_AVATARS,
      user__ID: this.$route.params.id,

      statesRu: [],
      statesEn: [],

      roleEn: [
        {text: "User",
        value: "user"},
        {text: "Admin",
        value: "admin"},
        {text: "Commiti",
        value: "commiti"},
      ],

      dataModelInput: function(data) {
        const dataModelInput = data
        return dataModelInput
      },

      btnDisabled: [
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
      ]
    };
  },
  
  async mounted() {
    await this.getUserID(this.$route.params.id);
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

    getUserID: function(id) {
      const url = config.API_URL + "/users/" + id;
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.parseDataUser(result.data);
        })
        .catch(e => console.error("users-error:", e));
    },
    updateFieldTableID: function(dataSend) {
      const url = config.API_URL + "/users/" + this.$route.params.id;
      axios
        .put(url, dataSend, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(result => {
          this.handleReversModal();
          return result;
        })
        .then(_ => {
          this.getUserID(this.$route.params.id);
          return _;
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.errorStr = "Неправильные данные";
          } else {
            this.errorStr = error.response.status + "";
          }
        });
    },
    updateImageID: function() {
      this.handleReversModal();
      this.getUserID(this.$route.params.id);
    },
    parseDataUser: function(data) {
      const newObjectData = {
        id: data.id,
        tabNumber: data.tabNumber,
        userPassword: data.passwordText,
        img: data.img ? data.img : "null.png",
        email: data.email,
        firstname_ru: data.firstnameRu,
        lastname_ru: data.lastnameRu,
        patronymic_ru: data.patronymicRu,
        firstname_en: data.firstnameEn,
        lastname_en: data.lastnameEn,
        patronymic_en: data.patronymicEn || "-----",
        position_ru: data.positionName ? data.positionName : "-----",
        section_ru: data.sectionName ? data.sectionName : "-----",
        state_ru: data.state ? data.state.value_ru : "-----",
        city_ru: data.cityName ? data.cityName : "-----",
        nomination_ru: data.nomination ? data.nomination.value_ru : "-----",
        position_en: data.positionNameEng ? data.positionNameEng : "-----",
        section_en: data.sectionNameEng ? data.sectionNameEng : "-----",
        state_en: data.state ? data.state.value_en : "-----",
        city_en: data.cityNameEng ? data.cityNameEng : "-----",
        nomination_en: data.nomination ? data.nomination.value_en : "-----",
        role: data.role || "-----",
        stateId: data.stateId,
      };
      this.userID = newObjectData;
    },

    disabledBtnNone: function (index) {
      this.btnDisabled[index].saveData = false
      this.btnDisabled[index].fixsetData = false
    },
    
    saveDataInput: function(index, data) {
      console.log(this.userID.id, data)
      this.postNewDataInput(data)
      this.btnDisabled[index].saveData = true
      this.btnDisabled[index].fixsetData = true
    },

    savesDataInput: function(tableLine, data) {
      const dataSave = {[tableLine]: this.dataModelInput(data)}
      this.postNewDataInput(dataSave)
    },

    postNewDataInput: async function(data) {
      const url = "/users/" + this.userID.id;
				try {
					const postNewDataInput = await axios.patch(
						config.API_URL + url,
						data,
						{ headers: {
								Authorization: 'Bearer ' + localStorage.getItem('jwt'),
							}
						},
          );
          console.log(postNewDataInput)
          alert("Данные пользователя обновлены")
				} catch(e) {
					console.error("ERROR AdminShowUserId/postNewDataInput:", e);
				}
    },
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
        margin-bottom: -10px;
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
