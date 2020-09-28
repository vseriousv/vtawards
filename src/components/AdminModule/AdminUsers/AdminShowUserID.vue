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
        <div>
          <v-text-field
            class="mx-3 userData__input"
            :disabled="this.btnDisabled[10].saveData"
            v-model="userID.email"
            outlined>
          </v-text-field>
          <span style="font-size: 18px; font-weight: 500;">
            
            <!-- {{ userID.email }}:  -->
            {{ userID.tabNumber }} -
            {{ userID.lastname_ru }} {{ userID.firstname_ru }}
            {{ userID.patronymic_ru }}</span>
        </div>
        <div class="userData__btn">
          <v-btn class="mx-1"
            x-small
            color="secondary"
            @click.stop="disabledBtnNone(10)"> 
            Редактировать
          </v-btn>
          <v-btn class="mx-1" 
            x-small
            :disabled="this.btnDisabled[10].saveData"
            color="primary"
            @click.stop="saveDataInput(10, {'email': userID.email})"> 
            Сохранить
          </v-btn>
        </div>
        <!-- <div>
          <v-btn
            class="mx-1"
            x-small
            color="secondary"
            @click.stop="getUserID(user__ID)"
          >
            Обновить
          </v-btn>
          <v-btn
            class="mx-1"
            x-small
            color="primary"
            @click.stop="handleModal('user-name')"
          >
            Редактировать
          </v-btn>
        </div> -->
      </v-card>
    </v-row>
    <v-row>
      <v-card class="container-card">
        <div class="head-content">
          <h4>Редактируемые данные</h4>
        </div>
        <v-divider />
        <div class="form-update">
          <div class="img-avatar">
            <img :src="`${URL_AVATARS}${userID.img}`" />
            <v-btn
              x-small
              color="primary"
              @click.stop="handleModal('user-images')"
            >
              Изменить
            </v-btn>
          </div>
          <div class="userData">
            <div class="userData__box">
              <h3>Данные</h3> 
              <v-list>
                <v-list-item class="userData__item">
                  <p class="mb-0">Пароль пользователя: {{ userID.userPassword }}</p>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0" 
                    :disabled="this.btnDisabled[0].fixsetData">
                    Роль: 
                  </p>
                  <v-autocomplete
                      class="mx-3 userData__input"
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
                  <p 
                    class="mb-0"
                    :disabled="this.btnDisabled[1].fixsetData">
                    Должность:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[1].saveData"
                    v-model="userID.position_ru"
                    outlined>
                  </v-text-field>
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
                      @click.stop="saveDataInput(1, {'positionName': userID.position_ru})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[2].fixsetData">
                    Отдел:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[2].saveData"
                    v-model="userID.section_ru"
                    outlined>
                  </v-text-field>
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
                      @click.stop="saveDataInput(2, {'sectionName': userID.section_ru})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[3].fixsetData">
                    Регион:
                  </p>
                  <v-autocomplete
                      class="mx-3 userData__input"
                      v-model="userID.stateId"
                      :items="statesRu"
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
                  <p class="mb-0"
                    :disabled="this.btnDisabled[4].fixsetData">
                    Город:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[4].saveData"
                    v-model="userID.city_ru"
                    outlined>
                  </v-text-field>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(4)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[4].saveData"
                      color="primary"
                      @click.stop="saveDataInput(4, {'cityName': userID.city_ru})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>
              </v-list>
            </div>
            <div>
              <h3>Data</h3>
              <v-list>
                <v-list-item class="userData__item">
                  <p class="mb-0">User Password: {{ userID.userPassword }}</p>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[9].fixsetData">
                    Role:
                  </p>
                  <v-autocomplete
                      class="mx-3 userData__input"
                      v-model="userID.role"
                      :items="roleEn"
                      dense
                      filled
                      outlined
                      :disabled="this.btnDisabled[9].saveData"
                      background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(9)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[9].saveData"
                      color="primary"
                      @click.stop="saveDataInput(9, {'role': userID.role})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>
                
                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[5].fixsetData">
                    Position:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[5].saveData"
                    v-model="userID.position_en"
                    outlined>
                  </v-text-field>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(5)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[5].saveData"
                      color="primary"
                      @click.stop="saveDataInput(5, {'positionNameEng': userID.position_en})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[6].fixsetData">
                    Section:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[6].saveData"
                    v-model="userID.section_en"
                    outlined>
                  </v-text-field>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(6)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[6].saveData"
                      color="primary"
                      @click.stop="saveDataInput(6, {'sectionNameEng': userID.section_en})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[7].fixsetData">
                    State:
                  </p>
                  <v-autocomplete
                    class="mx-3 userData__input"
                    v-model="userID.stateId"
                    :items="statesEn"
                    dense
                    filled
                    outlined
                    :disabled="this.btnDisabled[7].saveData"
                    background-color= "white">
                  </v-autocomplete>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(7)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[7].saveData"
                      color="primary"
                      @click.stop="saveDataInput(7, {'stateId': userID.stateId})"> 
                      Сохранить
                    </v-btn>
                  </div>
                </v-list-item>

                <v-list-item class="userData__item">
                  <p class="mb-0"
                    :disabled="this.btnDisabled[8].fixsetData">
                    City:
                  </p>
                  <v-text-field
                    class="mx-3 userData__input"
                    :disabled="this.btnDisabled[8].saveData"
                    v-model="userID.city_en"
                    outlined>
                  </v-text-field>
                  <div class="userData__btn">
                    <v-btn class="mx-1"
                      x-small
                      color="secondary"
                      @click.stop="disabledBtnNone(8)"> 
                      Редактировать
                    </v-btn>
                    <v-btn class="mx-1" 
                      x-small
                      :disabled="this.btnDisabled[8].saveData"
                      color="primary"
                      @click.stop="saveDataInput(8, {'cityNameEng': userID.city_en})"> 
                      Сохранить
                    </v-btn>
                  </div>
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

export default {
  name: "AdminShowUserID",
  components: {
    UsersNameModal,
    UsersImagesModal,
    UsersModal,
    UsersDescriptionModal
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

      btnDisabled: [
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
        {fixsetData: true, saveData: true},
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
        firstname_en: data.firstnameRn,
        lastname_en: data.lastnameRn,
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
      // this.$store.commit("setAdminUser_email", data.email);
      // this.$store.commit("setAdminUser_tab_number", data.tabNumber);
      // this.$store.commit("setAdminUser_firstname_ru", data.firstnameRu);
      // this.$store.commit("setAdminUser_firstname_en", data.firstnameEn);
      // this.$store.commit("setAdminUser_lastname_ru", data.lastnameRu);
      // this.$store.commit("setAdminUser_lastname_en", data.lastnameEn);
      // this.$store.commit("setAdminUser_patronymic_ru", data.patronymicRu);
      // this.$store.commit("setAdminUser_patronymic_en", data.patronymicEn);
      // this.$store.commit("setAdminUser_role", data.role);
      // this.$store.commit("setAdminUser_state_id", data.state_id);
      // this.$store.commit("setAdminUser_nomination_id", data.nomination_id);
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

    postNewDataInput: async function(data) {
      console.log(data)
      const url = "/users/" + this.userID.id;
      console.log(url)
				try {
					const postNewDataInput = await axios.patch(
						config.API_URL + url,
						data,

						{ headers: {
								Authorization: 'Bearer ' + localStorage.getItem('jwt'),
							}
						},
          );
          alert("Данные пользователя обновлены")
					console.log(postNewDataInput)
				} catch(e) {
					console.error("ERROR AdminShowUserId/postNewDataInput:", e);
				}
    },
  }
};
</script>

<style lang="scss" scoped>
.head-card {
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.container-card {
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  .head-content {
    display: flex;
    justify-content: space-between;
  }
  .form-update {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    .img-avatar {
      max-width: 200px;
      max-height: 250px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin-top: 10px;
      margin-right: 10px;
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
        align-items: center;
        // p {
        //   width: 70%;
        // }
      }
      &__btn {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      &__input {
        padding-top: 20px;
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
