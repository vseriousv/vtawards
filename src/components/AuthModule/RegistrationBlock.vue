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
                    >
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
                        <v-btn
                                color="warning"
                                @click="sendHandler"
                                large
                        >
                            {{$t('loginBlock.form.submit')}}
                        </v-btn>
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
    // import axios from 'axios';
    export default {
        name: "LoginBlock",
        data() {
            return {
                valid: false,
                email: '',
                emailRules: [
                    v => !!v || 'required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: '',
                passwordRules: {
                    required: value => !!value || 'required'
                },
                showPass: false,
            }
        },
        methods: {
            sendHandler: function () {
                // const url = 'localhost:4000';
                // const result = await axios.post(url,{
                //     'email': this.email,
                //     'password': this.password
                // });
                // console.log(result.data);
                console.log("SEND: ", this.email, this.password);
                this.email = '';
                this.password = '';
                // localStorage.setItem('jwt', "calyabalya");
                // this.$router.push({name: 'main'});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/index";
    .registration-block {
        background-color: #edeef0;
        width: 100%;
        height: calc(100vh - 102px);
        min-height: 700px;
        .head{
            text-align: center;
        }
        .regForm{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .RegForm__form{
                width: 100%;
                max-width: 300px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .field{
                    width: 100%;
                }
            }
        }
    }
</style>
