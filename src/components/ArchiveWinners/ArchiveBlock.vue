<template lang="pug"> 
    v-container.containerWinner
        h2.mb-4(v-html='$t("archiveBlock.archiveBlockTitle")')
        p.containerWinner__subTitle(v-html='$t("archiveBlock.archiveBlockSubTitle")')
        v-row
            v-col.boxWinner(
                v-if="$t('lang') === 'ru'"
                v-for="item in arrWinners_ru"
                :key="item.id"
                :lg="3"
                :md="4"
                :sm="6"
                )
                img.boxWinner__imgWinner(:src=`item.imgWinner` :class=`"boxWinner__imgWinner__" + item.id`)
                p.boxWinner__yearWinner {{item.year}}
                p.boxWinner__nameWinner {{item.name}}
                p.boxWinner__positionWinner {{item.position}}
            v-col.boxWinner(
                v-if="$t('lang') === 'en'"
                v-for="item in arrWinners_en"
                :key="item.id"
                :lg="3"
                :md="4"
                :sm="6"
                )
                img.boxWinner__imgWinner(:src=`item.imgWinner`)
                p.boxWinner__yearWinner {{item.year}}
                p.boxWinner__nameWinner {{item.name}}
                p.boxWinner__positionWinner {{item.position}}    
                
</template>

<script>
import ArchiveWinner from "./ArchiveWinners.js";

export default {
    name: "ArchiveBlock",

    data() {
        return {
            arrWinners_ru: [],
            arrWinners_en: [],
        }
    },

    created() {
        this.addArrWinners()
    },

    methods: {
        addArrWinners: function() {
            this.arrWinners_ru = ArchiveWinner().lang_ru
            this.arrWinners_en = ArchiveWinner().lang_en
            console.log(this.arrWinners_en)
        },
    }

};

</script>

<style lang="scss" scoped>
@import './src/assets/styles/index.scss';
.containerWinner {
    margin-top: 50px;
    margin-bottom: 50px;
    &__subTitle {
        font-size: 20px;
        margin-bottom: 30px;
    }
}
.boxWinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__imgWinner {
        height: 150px;
        width: 150px;
        object-fit: cover;
        border-radius: 100%;
        margin-bottom: 20px;
        &__2 {
            object-position: center -20px;
        }
        &__6,&__12,&__13 {
            object-position: center -10px;
        }
        
    }
    &__yearWinner {
        font-size: 18px;
        margin-bottom: 4px;
        color: $primaryColor;
        font-weight: bold;
    }
    &__nameWinner {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 8px;
        text-align: center;
    }
    &__positionWinner {
        font-size: 14px;
        text-align: center;
        max-width: 230px;
        font-style: italic;
    }
}
</style>
