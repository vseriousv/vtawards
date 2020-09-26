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
          <span style="font-size: 18px; font-weight: 500;"
            >{{ userID.email }}: {{ userID.tabNumber }} -
            {{ userID.lastname_ru }} {{ userID.firstname_ru }}
            {{ userID.patronymic_ru }}</span
          >
        </div>
        <div>
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
        </div>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="container-card">
        <div class="head-content">
          <h4>Редактируемые данные</h4>
          <v-btn
            x-small
            color="primary"
            @click.stop="handleModal('user-static')"
          >
            Редактировать
          </v-btn>
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
          <div>
            <v-list>
              <v-list-item>Роль: {{ userID.role }}</v-list-item>
              <v-list-item
                >Должность (En): {{ userID.position_ru }} ({{
                  userID.position_en
                }})</v-list-item
              >
              <v-list-item
                >Отдел (En): {{ userID.section_ru }} ({{
                  userID.section_en
                }})</v-list-item
              >
              <v-list-item
                >Регион (En): {{ userID.state_ru }} ({{
                  userID.state_en
                }})</v-list-item
              >
              <v-list-item
                >Город (En): {{ userID.city_ru }} ({{
                  userID.city_en
                }})</v-list-item
              >
            </v-list>
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
      user__ID: this.$route.params.id
    };
  },
  created() {
    this.getUserID(this.$route.params.id);
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
        tabNumber: data.tabNumber,
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
        role: data.role || "-----"
      };
      this.userID = newObjectData;
      this.$store.commit("setAdminUser_email", data.email);
      this.$store.commit("setAdminUser_tab_number", data.tabNumber);
      this.$store.commit("setAdminUser_firstname_ru", data.firstnameRu);
      this.$store.commit("setAdminUser_firstname_en", data.firstnameEn);
      this.$store.commit("setAdminUser_lastname_ru", data.lastnameRu);
      this.$store.commit("setAdminUser_lastname_en", data.lastnameEn);
      this.$store.commit("setAdminUser_patronymic_ru", data.patronymicRu);
      this.$store.commit("setAdminUser_patronymic_en", data.patronymicEn);
      this.$store.commit("setAdminUser_role", data.role);
      this.$store.commit("setAdminUser_state_id", data.state_id);
      this.$store.commit("setAdminUser_nomination_id", data.nomination_id);
    }
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
