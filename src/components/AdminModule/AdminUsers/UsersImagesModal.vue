<template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            {{this.dialogHead}}
        </v-card-title>

        <v-card-text class="card-form-create">
            <v-form class="form-create">
                <label>
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                </label>
                <span class="Error">{{errForm}}</span>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green lighten-2"
                outlined
                @click.stop="sendData"
            >
                Отправить
            </v-btn>
            <v-btn
                color="red lighten-2"
                text
                @click.stop="closeModal"
            >
                Закрыть
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import config from "../../../constants/config";
    import axios from "axios";

    export default {
        name: "UsersDescriptionModal",
        props: ['idField', 'dataTable'],
        data(){
            return {
                dialogHead: "Загрузить фотографию",
                dialogTable: "users",

                rules: [
                    value => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!",
                ],

                file: '',

                errForm: ""
            }
        },
        created() {

        },
        methods: {
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },
            sendData: function () {
                const url_upload = config.API_URL + "/users/avatar/";

                let formData = new FormData();
                formData.append('id', this.$route.params.id);
                formData.append('file', this.file);

                axios.post( url_upload,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer " + localStorage.getItem("jwt")
                        }
                    }
                ).then(result => {
                    console.log("upload:", result);
                    this.resetForm();
                })
                .catch(error => console.error("ERROR:", error));

            },
            closeModal: function () {
                this.$emit('handleReversModal');
                this.resetForm();
            },
            resetForm: function () {
                this.errForm = '';
                this.$store.commit('setAdminUser_description_ru', '');
                this.$store.commit('setAdminUser_description_en', '');
            }
        },
        computed: {
            adminUser_description_ru: {
                get () { return this.$store.state.adminUser_description_ru;  },
                set (value) { this.$store.commit("setAdminUser_description_ru", value); }
            },
            adminUser_description_en: {
                get () { return this.$store.state.adminUser_description_en;  },
                set (value) { this.$store.commit("setAdminUser_description_en", value); }
            },


            adminErrorStr: {
                get () { return this.$store.state.adminErrorStr; },
                set (value) {  this.$store.commit("setAdminErrorStr", value); }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .card-form-create{
        display: flex;
        justify-content: center;
        width: 100%;
        .form-create{
            width: 100%;
            margin-top: 20px;
            margin-bottom: -20px;
            .form-create__field{
            }
        }
    }
    .Error{
        margin-top: 25px;
        text-align: center;
        color: #FF5300;
        width: 100%;
    }
</style>
