<template lang="pug">
        v-card.aboutMy.d-flex.flex-column
            .aboutMy__generalInfo.d-flex
                .aboutMy__avatar
                    img(:src="`${URL_AVATARS}`+ 'null.png'" )
                input(
                type='file' 
                accept='image/*' 
                onchange=''
                )
                .aboutMy__content.contentMy
                    v-simple-table
                        tbody.contentMy__info
                            tr.contentMy__name
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.name") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;dbxv
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;dfbx
                            
                            tr.contentMy__position
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.position") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp; dbfxv
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp; dbfxv

                            tr.contentMy__section
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.section") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;fbxv
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;dfbxv

                            tr.contentMy__state
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.state") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;dbfv
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;dbv

                            tr.contentMy__city
                                td
                                    span.c-font-16 {{ $t("loginBlock.form.city") }}:
                                    span.c-font-16(
                                        v-if="$t('lang') === 'ru'"
                                    ) &ensp;dfbr
                                    span.c-font-16(
                                        v-if="$t('lang') === 'en'"
                                    ) &ensp;bf 

</template>

<script>
import config from "../../constants/config";
// import RestHelper from "../../helpers/RestHelper";
// const restHelper = new RestHelper();

export default {
    name: "AboutMy",

    data() {
        return {
            URL_AVATARS: config.URL_AVATARS,
        }
    },



    methods: {

    }

}
</script>

<style lang="sass" scoped>
    .aboutMy
        padding: 25px
        &__avatar
            display: flex
            width: 250px
            height: 250px
            overflow: hidden
            margin: 5px
            img
                max-width: 250px
                max-height: 250px
                width: 100%
                height: 100%
                object-fit: cover
    .contentMy
        margin-left: 25px
        tr td 
            font-size: 18px

</style>