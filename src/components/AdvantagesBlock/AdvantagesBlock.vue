<template>
    <section class="advantages-block">
        <div id="advantages" class="target-class" />
        <v-container class="mxw1200">
            <v-card class="radius_spec" elevation="10">
            <v-row class="padding-spec">
                <v-col>
                    <h2 class="advantages-block_header header_section_head">{{ $t('advantagesBlock.skills.skillsHead') }}</h2>
                </v-col>
            </v-row>
            <v-row class="advantages-block_row">
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    class="advantages-block_text"
                    v-for="(advantagesItem, i) in $t('advantagesBlock.skills.items')"
                    :key="`whyUsBlockItem${i}`"
                >
                    <div class="icon-skills">
                        <v-icon color="#034F99" size="70" v-text="`${advantagesItem.img}`" class="icon-skills__item"></v-icon>
                    </div>
                    <div
                        class="advantages-block_text__items"
                        height="100px"
                    >
                        <span class="itemsText" v-html="advantagesItem.item"/>
                    </div>
                </v-col>
            </v-row>
            </v-card>
        </v-container>
    </section>
</template>

<script>
    export default {
        name: "AdvantagesBlock"
    }
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.advantages-block{
    position: relative;
    padding: 20px 0;
    background-color: $secondaryColor;
    background-image: url(/img/imgComponents/AdvantagesBlock/bgr.jpg);
    background-attachment: fixed;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    @include respond-to(large-screens) { padding: 100px 0; }
    .advantages-block_row {
        margin-top: 40px;
        padding-bottom: 40px;
        @include respond-to(large-screens) {
            padding-top: 50px;
            padding-bottom: 70px;
        }
        .advantages-block_text {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            .icon-skills {
                transition: .2s;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon-skills__item{
                    color: white;
                }
            }
            .advantages-block_text__items {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                flex-direction: column;
                .itemsText {
                    text-align: center;
                    max-width: 450px;
                    padding: 14px;
                    font-size: 14px;
                    border-radius: 5px;
                    font-weight: bold;
                    @include respond-to(large-screens) {
                        padding: 0 10px 10px;
                        margin-top: -5px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
            }
        }
    }

}
    .radius_spec{
        border-radius: 15px !important;
    }
    .padding-spec{
        padding-top: 70px;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
