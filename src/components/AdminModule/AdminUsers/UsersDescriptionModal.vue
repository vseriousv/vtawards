<template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            {{this.dialogHead}}
        </v-card-title>

        <v-card-text class="card-form-create">
            <v-form class="form-create">
                <v-textarea
                        class="form-create__field"
                        outlined
                        label="Описание (Ru)"
                        v-model="adminUser_description_ru"
                ></v-textarea>
                <v-textarea
                        class="form-create__field"
                        outlined
                        label="Описание (En)"
                        v-model="adminUser_description_en"
                ></v-textarea>
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

    export default {
        name: "UsersDescriptionModal",
        props: ['idField', 'dataTable'],
        data(){
            return {
                dialogHead: "Описание пользователя",
                dialogTable: "users",


                errForm: ""
            }
        },
        created() {

        },
        methods: {
            sendData: function () {
                const dataValue = {
                    'description_ru': this.$store.state.adminUser_description_ru,
                    'description_en': this.$store.state.adminUser_description_en,
                }
                this.$emit('updateFieldTableID', dataValue);
                this.resetForm();
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
