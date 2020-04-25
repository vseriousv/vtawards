<template>
    <section class="portfolio-block">
        <div id="why-us" class="target-class" />
        <v-container class="mxw1200">
            <v-row>
                <v-col>
                    <h2 class="header__text__section_block header_section_head">{{ $t('portfolioBlock.head') }}</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-carousel
                        cycle
                        height="500"
                        hide-delimiter-background
                    >
                        <v-carousel-item
                            v-for="(slide, i) in $t('portfolioBlock.slides')"
                            :key="i"
                        >
                            <v-sheet
                                height="100%"
                            >
                                <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                                >
                                    <div class="display-3">{{ slide.image }} Slide</div>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
    export default {
        name: "PortfolioBlock"
    }
</script>

<style lang="scss" scope>
@import "../../assets/styles/index";
.header__text__section_block {
    margin-bottom: 40px;
}
</style>
