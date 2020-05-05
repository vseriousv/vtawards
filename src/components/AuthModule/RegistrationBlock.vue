<template>
    <section class="registration-block">
        <v-container class="mxw1200">
            <v-row>
                <v-col class="head">
                    <h1>{{$t('loginBlock.headReg')}}</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="regForm">
                    <v-form
                        class="RegForm__form"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        onSubmit="this.sendHandler()"
                    >
                        <div class="otherFields">
                            <v-text-field
                                    class="field"
                                    v-model="fullname"
                                    name="fullname"
                                    :label="`${$t('loginBlock.form.name')}`"
                                    required
                                    outlined
                            ></v-text-field>
                            <v-autocomplete
                                    class="field"
                                    v-model="position_id"
                                    :items="positionItems"
                                    outlined
                                    :label="`${$t('loginBlock.form.position')}`"
                            ></v-autocomplete>
                            <v-autocomplete
                                    class="field"
                                    v-model="section_id"
                                    :items="sectionItems"
                                    outlined
                                    :label="`${$t('loginBlock.form.section')}`"
                            ></v-autocomplete>
                            <v-autocomplete
                                    class="field"
                                    v-model="state_id"
                                    :items="stateItems"
                                    :label="`${$t('loginBlock.form.state')}`"
                                    outlined
                            ></v-autocomplete>
                            <v-autocomplete
                                    class="field"
                                    v-model="city_id"
                                    :items="cityItems"
                                    :label="`${$t('loginBlock.form.city')}`"
                                    outlined
                            ></v-autocomplete>
                        </div>
                        <div class="generalFields">
                            <v-text-field
                                    class="field"
                                    v-model="email"
                                    name="email"
                                    label="E-mail"
                                    required
                                    outlined
                            ></v-text-field>
                            <v-text-field
                                    class="field"
                                    v-model="password"
                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPass ? 'text' : 'password'"
                                    name="password"
                                    :label="`${$t('loginBlock.form.password')}`"
                                    @click:append="showPass = !showPass"
                                    outlined
                            ></v-text-field>
                            <v-text-field
                                    class="field"
                                    v-model="password_repeat"
                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPass ? 'text' : 'password'"
                                    name="password_repeat"
                                    :label="`${$t('loginBlock.form.password_repeat')}`"
                                    @click:append="showPass = !showPass"
                                    outlined
                            ></v-text-field>
                        </div>
                        <div class="btn-field">
                            <v-btn
                                    color="warning"
                                    @click="sendHandler"
                                    large
                                    width="300"
                            >
                                {{$t('loginBlock.form.submit')}}
                            </v-btn>
                            <span class="Error">{{errorStr}}</span>
                        </div>
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="regForm">
                    <router-link to="/login">
                        <span>{{$t('loginBlock.headAuth')}}</span>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
    import config from "../../constants/config";
    import axios from 'axios';
    import CyrillicToTranslit from 'cyrillic-to-translit-js';
    export default {
        name: "LoginBlock",
        data() {
            return {
                fullname: '',
                position_id: '',
                    positionItems: [],
                section_id: '',
                    sectionItems: [],
                state_id: '',
                    stateItems: [],
                city_id: '',
                    cityItems: [],
                email: '',
                password: '',
                password_repeat: '',

                valid: false,
                emailRules: [
                    v => !!v || 'required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: {
                    required: value => !!value || 'required'
                },
                showPass: false,

                errorStr: '',

                descriptionLimit: 60,
                entries: [],
                isLoading: false,
                model: null,
                search: null,
            }
        },
        created() {
            this.getTable("positions");
            this.getTable("sections");
            this.getTable("states");
            this.getTable("cities");
        },
        methods: {
            sendHandler: function () {
                const url = config.API_URL+"/users/register";
                const dataSend = {
                    "email": this.email,
                    "password": this.password,
                    "name_ru": this.fullname,
                    "name_en": CyrillicToTranslit().transform(this.fullname),
                    "position_id": this.position_id,
                    "section_id": this.section_id,
                    "state_id": this.state_id,
                    "city_id": this.city_id,
                    "count_z": 0,
                }

                if(this.password === this.password_repeat) {
                    axios.post(
                        url,
                        dataSend,
                    )
                    .then(res => {
                        console.log("result.data", res);
                        this.$router.push({name: 'login'});
                    })
                    .catch(error => {
                        if(error.response.status === 409) {
                            this.errorStr = error.response.data.message + '';
                        } else if(error.response.status === 400){
                            this.errorStr = 'Все поля обязательны для заполнения';
                        } else if (error.response.status === 500){
                            this.errorStr = 'Такой пользователь уже существует';
                        }
                    });
                } else {
                    this.errorStr = "Password must match"
                }

            },
            getTable: function (table) {
                const url = config.API_URL+'/'+table;
                axios.get( url )
                    .then(result => {
                        switch (table) {
                            case 'positions':
                                this.positionItems = this.parserData(result.data);
                                break;
                            case 'sections':
                                this.sectionItems = this.parserData(result.data);
                                break;
                            case 'states':
                                this.stateItems = this.parserData(result.data);
                                break;
                            case 'cities':
                                this.cityItems = this.parserData(result.data);
                                break;
                            default:
                                console.log("ERRRRRO");
                                break;
                        }
                    })
                    .catch(e => console.error("positions-error:", e));
            },
            parserData: function (data) {
                let resultData = [];
                for (let i = 0; i < data.length; i++){
                    const text_ru = data[i].value_ru;
                    // const text_en = data[i].value_ru;
                    const code = data[i].code;
                    resultData.push({text: text_ru, value: code })
                }
                return resultData;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/index";
    .registration-block {
        background-color: #edeef0;
        width: 100%;
        min-height: calc(100vh - 102px);
        .head{
            text-align: center;
        }
        .regForm{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .RegForm__form{
                width: 100%;
                max-width: 680px;
                display: flex;
                flex-flow: row wrap;
                align-items: flex-start;
                justify-content: center;
                .field{
                    width: 300px;
                    margin: 0 20px;
                }
                .btn-field{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    .Error{
                        margin-top: 25px;
                        text-align: center;
                        color: #FF5300;
                    }
                }
            }
        }
    }
</style>
