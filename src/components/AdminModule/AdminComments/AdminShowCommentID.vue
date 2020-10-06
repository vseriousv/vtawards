<template lang="pug">
    section
        v-container.mxw1200
            v-card.commentsHeader
                .commentsHeader__boxData
                    .commentsHeader__boxFromUser
                        .commentsHeader__boxImg
                            img.commentsHeader__avatar(:src="`${URL_AVATARS}${this.commitsId.imgFrom}`")
                        p(v-if="$t('lang') === 'ru'" ) {{this.commitsId.nameFromRu}}
                        p(v-if="$t('lang') === 'en'" ) {{this.commitsId.nameFromEn}}
                    .commentsHeader__boxFromUser.commentsHeader__boxFromUser_boxArrow
                            .mdi.mdi-circle
                            .mdi.mdi-circle
                            .mdi.mdi-circle
                            .mdi.mdi-circle
                            .mdi.mdi-circle
                            .mdi.mdi-chevron-right
                    .commentsHeader__boxFromUser
                        .commentsHeader__boxImg
                            img.commentsHeader__avatar(:src="`${URL_AVATARS}${this.commitsId.imgTo}`")
                        p(v-if="$t('lang') === 'ru'" ) {{this.commitsId.toNameRu}}
                        p(v-if="$t('lang') === 'en'" ) {{this.commitsId.toNameEn}}
                .UserArgumentation.d-flex.flex-column
                        h3.mb-3(v-if="$t('lang') === 'ru'" ) Комментарий
                        h3.mb-3(v-if="$t('lang') === 'en'" ) The Comment
                        .nominationText
                            v-textarea.UserArgumentation__writeText(
                                v-model="commitsId.comment"
                                placeholder="Текст комментария"
                                name="argumentationTextRu"
                                :disabled="propsDisabled.textareaDisabled"
                                :label="$t('lang') === 'ru'? 'Текст комментария': 'Comment text'" 
                                outlined
                            )
                            .nominationText__btn
                                v-btn.mx-1(
                                x-small
                                color="secondary"
                                @click.stop="disabledNone"
                                ) Редактировать

                                v-btn.mx-1(
                                x-small
                                :disabled="propsDisabled.saveBtnDisabled"
                                color="primary"
                                @click.stop="saveNewData('save')"
                                ) Сохранить
            v-card.commentsFooter
                .commentsFooter__save
                    p.commentsFooter__text Опубликовать комментарий под карточкой участника голосования 
                    v-btn.mx-1(
                    x-small
                    color="secondary"
                    @click.stop="saveNewData('public')"
                    ) Опубликовать комментарий
            v-card.commentsFooter
                .commentsFooter__save
                    p.commentsFooter__text Снять с публикации комментарий 
                    v-btn.mx-1(
                    x-small
                    color="error"
                    @click.stop="saveNewData('notPublic')"
                    ) Снять с публикации
</template>

<script>
import config from "../../../constants/config";
import axios from "axios";
import RestHelper from "../../../helpers/RestHelper";


const restHelper = new RestHelper();


export default {
    name: "AdminShowCommentID",

    data() {
        return {
            URL_AVATARS: config.URL_AVATARS,
            commentId: this.$route.params.id,

            commitsId: {},
            propsDisabled: {
                textareaDisabled: true,
                saveBtnDisabled: true,
            }
        }
    },

    created() {
        this.getCommitsId();
    },

    methods: {

        getCommitsId: async function() {
            const url = "/comments/" + this.commentId;
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseCommitsId(data.data);
                // console.log(data.data)
            } catch(e) {
                console.error("ERROR AdminShowCommentID/getCommitsId:", e);
            }
        },

        parseCommitsId: function(data) {
            this.commitsId = {}
            this.commitsId = {
                id: data.id,
                idTo: data.nominationOrderId,
                idFrom: data.userFromId,
                toNameRu: '',
                toNameEn: '',
                imgTo: '',
                comment: data.comment,
                imgFrom: '',
                nameFromRu: '',
                nameFromEn: '',
                public: data.public,
            };
            this.getFromUser(this.commitsId.idFrom)
            this.getNominationOrderId(this.commitsId.idTo)
        },

        getFromUser: async function(data) {
            const url = "/users/" + data;
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseFromUser(data.data);
                // console.log(data)
            } catch(e) {
                console.error("ERROR AdminShowCommentID/getFromUser:", e);
            }
        },

        parseFromUser: function(data) {
            this.commitsId.imgFrom = data.img? data.img: "null.png"
            this.commitsId.nameFromRu = data.lastnameRu + " " + data.firstnameRu
            this.commitsId.nameFromEn = data.lastnameEn + " " + data.firstnameEn
            // console.log(this.commitsId)
        },

        getNominationOrderId: async function(data) {
            const url = "/nomination-order/" + data;
            try {
                const data = await restHelper.getEntity(url, true);
                this.parseNominationOrderId(data.data);
                // console.log(data.data)
            } catch(e) {
                console.error("ERROR AdminShowCommentID/getFromUser:", e);
            }
        },

        parseNominationOrderId: function(data) {
            this.commitsId.imgTo = data.user.img
            this.commitsId.toNameRu = data.user.lastnameRu + " " + data.user.firstnameRu
            this.commitsId.toNameEn = data.user.lastnameEn + " " + data.user.firstnameEn
            // console.log(data)
        },

        disabledNone: function() {
            this.propsDisabled.textareaDisabled = false
            this.propsDisabled.saveBtnDisabled = false
        },

        saveNewData: async function(props) {
            let  data= {}
            switch(props){
                case "save": data = {"comment": this.commitsId.comment}
                    break
                case "public": data = {"public": true}
                    break
                case "notPublic": data = {"public": false}
                    break
            }
            
            const url = "/comments/" + this.commentId;
				try {
					const postNewData = await axios.patch(
						config.API_URL + url,
						data,
						{ headers: {
								Authorization: 'Bearer ' + localStorage.getItem('jwt'),
							}
						},
                    );
                    if (props == "save") {
                        this.propsDisabled.textareaDisabled = true
                        this.propsDisabled.saveBtnDisabled = true
                        alert("Комментарий успешно сохранен")
                    }
                    if (props == "public") {
                        alert("Комментарий успешно опубликован")
                    }
                    if (props == "notPublic") {
                        alert("Комментарий успешно снят с публикации")
                    }  
                    console.log(postNewData)
				} catch(e) {
					console.error("ERROR AdminShowCommentID/saveNewData:", e);
				}
        }
    }
}
</script>

<style lang="sass" scoped>
@import './src/assets/styles/index.scss'

.commentsHeader
    display: flex
    padding: 20px
    flex-direction: column
    max-width: 800px
    margin-right: auto
    margin-left: auto
    &__boxData
        display: flex
        flex-direction: row
        justify-content: space-around
    &__boxFromUser
        display: flex
        flex-direction: column
        align-items: center
        &_boxArrow
            margin: 0 15px
            flex-direction: row
            .mdi-circle 
                font-size: 15px
                color: #ffb900
                margin-right: 15px
            .mdi-chevron-right
                font-size: 45px
                color: #ffb900
                line-height: 50%
                margin-left: -15px
        p
            text-align: center
    &__boxImg
        display: flex
        width: 100px
        height: 100px
        overflow: hidden
        margin: 5px 5px 10px 5px
        img
            border-radius: 50%
            max-width: 100%
            max-height: 100%
            object-fit: cover 
.UserArgumentation
    .nominationText
        display: flex
        flex-direction: column
        &__btn
            text-align: right
            margin-bottom: 20px
.commentsFooter
    margin-top: 20px
    display: flex
    padding: 20px
    flex-direction: column
    max-width: 800px
    margin-right: auto
    margin-left: auto
    &__save
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
    &__text
        max-width: 300px
        margin-bottom: 0
</style>