<template lang="pug">
    v-container.mxw1200
        v-card.profile
            v-tabs(
            v-model="tab"
            background-color="white"
            color="#FEBA13"
            left
            dark
            icons-and-text)
                v-tabs-slider
                v-tab.profile__headerTabs(href="#tab-1")
                    p Обо мне
                    .mdi.mdi-account-circle.icon

                v-tab.profile__headerTabs(href="#tab-2")
                    p Мои заявки
                    .mdi.mdi-account-switch.icon

                v-tab.profile__headerTabs(href="#tab-3")
                    p Мои голоса
                    .mdi.mdi-comment-account.icon

                v-tabs-items(v-model="tab")
                    v-tab-item(
                    :key="1"
                    :value="'tab-' + 1")
                        about-my
                    
                

</template>

<script>
// import config from "../../constants/config";
// import RestHelper from "../../helpers/RestHelper";
import AboutMy from "./AboutMy";
// const restHelper = new RestHelper();

export default {
    name: "ParticipantsBlock",
    components:{
        AboutMy,
    },

    data() {
        return {
            tab: null,
        }
    },



    methods: {

    }

}
</script>

<style lang="sass" scoped>
    .profile
        &__header
            box-shadow: 0 0 10px rgba(0,0,0,0.5)
        &__headerTabs
            p
                color: #FEBA13
                margin-top: 5px
            .icon
                font-size: 30px
                color: #FEBA13

</style>