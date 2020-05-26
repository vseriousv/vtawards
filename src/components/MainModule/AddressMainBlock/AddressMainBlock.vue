<template>
  <v-container fluid>
    <v-row>
      <section class="address mxw1200">
        <h2 class="visually-hidden ma-5">Обращение директора</h2>
        <div class="address-container">
          <div class="address-photo mx-3">
            <img
              src="/img/imgComponents/StartVoting/Gerhard.jpg"
              alt="Герхард Ворстер"
              width="248"
              height="248"
            />
            <p class="address-photo-name">Герхард Ворстер</p>
            <p class="address-photo-post">
              {{$t('addressMainBlock.whoIsCEO')}}
            </p>
          </div>
          <div class="address-text mx-5" v-html="$t('addressMainBlock.sayCEO')"/>
        </div>
      </section>
    </v-row>
  </v-container>
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
  padding-top: 130px;
  margin-bottom: 130px;
}

.address-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.address-photo {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  img {
    border-radius: 50%;
  }
}

.address-photo-name {
  margin-top: 15px;
  margin-bottom: 5px;

  font-size: 24px;
  font-weight: 700;
  color: #141414;
}

.address-photo-post {
  margin: 0;
  max-width: 180px;

  text-align: center;
  font-size: 13px;
  line-height: 17px;
  color: #5b5b5b;
}

.address-text {
  position: relative;
  max-width: 710px;
  @include respond-to(medium-screens) { padding-left: 80px }
}

.address-text::after {
  position: absolute;

  width: 58px;
  height: 58px;

  font-family: "Roboto", sans-serif;
  color: #ffb900;
  @include respond-to(medium-screens) {   font-size: 170px;}
}

.address-text::before {
  position: absolute;

  width: 58px;
  height: 58px;

  font-family: "Roboto", sans-serif;
  color: #ffb900;
  @include respond-to(medium-screens) {   font-size: 170px;}
}

.address-text::before {
  content: ",,";
  transform: rotate(180deg);
  top: 80px;
  left: 0;
  display: none;
  @include respond-to(medium-screens) {
    display: block;
  }
}

.address-text::after {
  content: ",,";

  bottom: 95px;
  right: 15px;
  display: none;
  @include respond-to(medium-screens) {
    display: block;
  }
}

.address-text p {
  margin: 0;
  margin-bottom: 20px;

  color: #5b5b5b;
}

.address-text .initial {
  font-size: 50px;
  font-weight: 700;
}

@media screen and (max-width: 1280px) {
  .address {
    margin-bottom: 100px;
  }
  .address-text {
    max-width: 640px;
  }
}

@media screen and (max-width: 980px) {
  .address-photo img {
    width: 200px;
    height: 200px;
  }
}

@media screen and (max-width: 940px) {
  .address-text {
    max-width: 550px;
  }
}

@media screen and (max-width: 820px) {
  .address-container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .address-text {
    max-width: 90%;
    margin-bottom: 40px;
  }
  .address-text p:nth-child(2) {
    display: none;
  }
}
</style>
