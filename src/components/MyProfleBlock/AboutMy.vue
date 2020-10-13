<template lang="pug">
        v-card.aboutMy.d-flex.flex-column
            .aboutMy__generalInfo.d-flex
                .aboutMy__AddImg
                    .aboutMy__avatar
                        img(v-if="this.file === ''" :src="`${URL_AVATARS}${user.img}`")
                        img(v-else :src="imagePreview" v-show="showPreview")
                    v-form.aboutMy__boxInput.addImg
                        label.addImg__label
                            p {{ $t("nameButton.change") }}
                            input.addImg__btn(type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()")
                    p.aboutMy__description.mt-3(v-if="$t('lang') === 'ru'") Имя файла: {{this.file.name}}
                    p.aboutMy__description.mt-3(v-if="$t('lang') === 'en'") File name: {{this.file.name}}     
                    .aboutMy__saveAll
                        v-btn.mx-1(
                            style="min-width: 115px;"
                            x-small
                            color="primary"
                            @click.stop="saveNewAvatar") {{ $t("nameButton.save") }}
                
                .aboutMy__content.contentMy
                    v-simple-table
                        tbody.contentMy__info
                            tr.contentMy__name
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.name") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;{{ user.name_ru }}
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;{{ user.name_en }}
                            
                            tr.contentMy__position
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.position") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp; {{ user.position_ru }}
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp; {{ user.position_en }}

                            tr.contentMy__section
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.section") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;{{ user.section_ru }}
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;{{ user.section_en }}

                            tr.contentMy__state
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.state") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;{{ user.state_ru }}
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;{{ user.state_en }}

                            tr.contentMy__city
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.city") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;{{ user.city_ru }}
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;{{ user.city_en }} 
                    .aboutMy__myPassword.passwordBox.mt-3
                        .passwordBox__input
                            p.mr-3(v-if="$t('lang') === 'ru'") Мой пароль
                            p.mr-3(v-if="$t('lang') === 'en'") My password
                            v-text-field(
                                :disabled='btnDisabled.fixsetData'
                                v-model="user.pass"
                                outlined)
                        .passwordBox__btn
                            v-btn.mx-1(
                            style="min-width: 115px;"
                            x-small
                            color="secondary"
                            @click.stop="btnNoneDisabled") {{ $t("nameButton.edit") }}
                            v-btn.mx-1(
                            style="min-width: 115px;"
                            x-small
                            :disabled='btnDisabled.saveData'
                            color="primary"
                            @click.stop="savePassword") {{ $t("nameButton.save") }}
                        
                        
</template>

<script>
import config from "../../constants/config";
import JwtHelper from "../../helpers/JwtHelper";
import RestHelper from "../../helpers/RestHelper";

const restHelper = new RestHelper();
const jwtHelper = new JwtHelper();

export default {
    name: "AboutMy",

    data() {
        return {
            myId: jwtHelper.jwtParse().id,
            URL_AVATARS: config.URL_AVATARS,
            file: '',
            preview: '',
            showPreview: true,
            imagePreview: '',
            oldPassword: '',

            user: {},
            btnDisabled: {
                fixsetData: true,
                saveData: true
            },
        }
    },

    created(){
        this.getUser()
    },

    methods: {
        handleFileUpload: function() {
            this.file = ''
            this.file = this.$refs.file.files[0];
            let reader  = new FileReader();
            reader.addEventListener("load", function () {
            this.showPreview = true;
            this.imagePreview = reader.result;
            }.bind(this), false);
            if( this.file ){
                if ( /\.(jpe?g|png|svg)$/i.test( this.file.name ) ) {
                    reader.readAsDataURL( this.file );
                }
            }
            console.log(this.file)
        },

        getUser: async function() {
			const url = "/users/" + this.myId;
			try {
				const user = await restHelper.getEntity(url, true);
                this.parseUser(user.data);
                // console.log(user.data)
			} catch(e) {
				console.error("ERROR AboutMy/getUser:", e);
            }
        },
        parseUser: function(data) {
            this.user = {
                tabNumber: data.tabNumber,
                img: data.img || "null.png",
                name_ru:
                    data.lastnameRu + " " + data.firstnameRu + " " + data.patronymicRu,
                name_en: data.firstnameEn + " " + data.lastnameEn,
                position_ru: data.positionName ? data.positionName : "",
                position_en: data.positionNameEng ? data.positionNameEng : "",
                section_ru: data.sectionName ? data.sectionName : "",
                section_en: data.sectionNameEng ? data.sectionNameEng : "",
                state_ru: data.state ? data.state.value_ru : "",
                state_en: data.state ? data.state.value_en : "",
                city_ru: data.cityName ? data.cityName : "",
                city_en: data.cityNameEng ? data.cityNameEng : "",
                pass: data.passwordText
            }
            this.imagePreview = data.img || "null.png"
            this.oldPassword = data.passwordText
        },
        btnNoneDisabled: function() {
            this.btnDisabled = {
                fixsetData: false,
                saveData: false,
            }
        },
        saveNewAvatar: function() {
            if (this.file !== '') {
                let dataImg = new FormData()
                dataImg.append("id", this.myId)
                dataImg.append("file", this.file)
                this.postNewAvatar(dataImg)
            } else {
                console.log("Такая аватарка уже существует и использована")
                return
            }
        },
        postNewAvatar: async function(data) {
            const url = "/users/avatar";
			try {
                const postAvatar = await restHelper.postEntity(url, data, true);
                console.log(postAvatar)
				if (this.$t('lang') === 'ru') {
                    alert("Ваша аватарка успешно обновлена")
                }
                if (this.$t('lang') === 'en') {
                    alert("Your avatar has been successfully updated")
                }
			} catch (e) {
				alert("Ошибка сервера или запроса" + " " + e)
			}
        },
        savePassword: async function() {
            const url = "/users/change-password";
            const data = {
                "tabNumber": this.user.tabNumber,
                "passwordOld": this.oldPassword,
                "passwordNew": this.user.pass,
            }
            try {
                console.log(data)
                const postPassword = await restHelper.postEntity(url, data, true);
                console.log(postPassword)
                this.btnDisabled = {
                    fixsetData: true,
                    saveData: true,
                }
				if (this.$t('lang') === 'ru') {
                    alert("Ваш пароль успешно обновлен")
                }
                if (this.$t('lang') === 'en') {
                    alert("Your password has been successfully updated")
                }
			} catch (e) {
				alert("Ошибка сервера или запроса" + " " + e)
			}
        }
    },
}
</script>

<style lang="sass" scoped>
    .aboutMy
        padding: 25px
        &__avatar
            border: 1px solid #FEBA13
            border-radius: 3px
            display: flex
            width: 250px
            height: 250px
            overflow: hidden
            img
                max-width: 250px
                max-height: 250px
                width: 100%
                height: 100%
                object-fit: cover
        &__myPassword
            display: flex
            flex-direction: column
            padding-left: 16px
        &__description
            max-width: 250px
        &__saveAll
            display: flex
            justify-content: center
            margin-top: 15px
    .passwordBox       
        &__input
            display: flex
            flex-direction: row   
            p 
                font-size: 18px
                padding-top: 16px
        &__btn
            margin-top: -10px
            display: flex
            justify-content: flex-end
    .addImg
        height: 40px
        overflow: hidden
        background-color: green
        margin: 20px 0 0 0
        border-radius: 6px
        transition: 0.2s ease-out
        &:hover
            background-color: #FEBA13
            p
                color: white
        &__label
            cursor: pointer
            max-width: 250px
            width: 100%
            height: 100%
            position: relative
            display: flex
            align-items: center
            justify-content: center
            p
                font-size: 14px
                margin: 0
                text-transform: uppercase
                font-weight: 500
                color: white
        &__btn
            visibility: hidden
            position: absolute
            left: 0
            top: 0
            max-width: 250px
            height: 100%
            
    .contentMy
        margin-left: 20px
        tr td 
            font-size: 18px

</style>