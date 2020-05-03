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
                            <v-select
                                    class="field"
                                    v-model="position_id"
                                    :items="positionItems"
                                    :label="`${$t('loginBlock.form.position')}`"
                                    outlined
                                    name="position"
                            ></v-select>
                            <v-select
                                    class="field"
                                    v-model="section_id"
                                    :items="sectionItems"
                                    :label="`${$t('loginBlock.form.section')}`"
                                    outlined
                                    name="section"
                            ></v-select>
                            <v-select
                                    class="field"
                                    v-model="state_id"
                                    :items="stateItems"
                                    :label="`${$t('loginBlock.form.state')}`"
                                    outlined
                                    name="state"
                            ></v-select>
                            <v-select
                                    class="field"
                                    v-model="city_id"
                                    :items="cityItems"
                                    :label="`${$t('loginBlock.form.city')}`"
                                    outlined
                                    name="city"
                            ></v-select>
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
                positionItems: [
                    {text: 'Администратор', value: 0},
                    {text:'СофтИнженер', value: 1},
                    {text:'Джаваскриптизер', value: 2}
                ],
                section_id: '',
                sectionItems: [
                    {text: 'Администраторская', value: 0},
                    {text:'СофтИнженерская', value: 1},
                    {text:'Джаваскриптизерная', value: 2}
                ],
                state_id: '',
                stateItems: [
                    {text: 'Администраторрская область', value: 0},
                    {text:'СофтИнженер регион', value: 1},
                    {text:'Джаваскриптизер область', value: 2}
                ],
                city_id: '',
                cityItems: [
                    {text:'Админисинск', value: 0},
                    {text:'СофтИнженеринск', value: 1},
                    {text:'Джаваскриптизеринск', value: 2}
                ],
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

                errorStr: ''
            }
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
