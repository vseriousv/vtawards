<template lang="pug">
  v-container.fluid
    v-row
      section.address.mxw1200
        //- h2.visually-hidden.ma-5 Обращение директора
        //- div.address-container
        //-   div.address-photo.mx-3
        //-     img(
        //-       src="/img/imgComponents/StartVoting/Gerhard.jpg"
        //-       alt="Герхард Ворстер"
        //-       width="248"
        //-       height="248"
        //-       )
        //-     p.address-photo-name {{$t('addressMainBlock.nameCEO')}}
        //-     p.address-photo-post {{$t('addressMainBlock.whoIsCEO')}}
        .address-text.mx-5(v-html="$t('addressMainBlock.sayCEO')")
</template>

<script>
export default {
	name: "AddressMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.address {
	padding: 30px 20px;
	margin: 40px 0;
	border: 8px solid #ffb900;
	@include respond-to(medium-screens) {
		padding: 50px 30px;
		margin: 70px 0;
	}
}
.address-text {
	max-width: 100%;
}
</style>
