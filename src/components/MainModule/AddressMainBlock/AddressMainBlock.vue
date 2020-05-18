<template>
  <v-container fluid>
    <v-row>
      <section class="address mxw1200">
        <h2 class="visually-hidden ma-5">Обращение директора</h2>
        <div class="address-container">
          <div class="address-photo mx-3">
            <img
              src="/img/imgComponents/StartVoting/Gevin.png"
              alt="Гэвин Найт"
              width="248"
              height="248"
            />
            <p class="address-photo-name">Гэвин Найт</p>
            <p class="address-photo-post">
              Генеральный директор ООО «Восточная Техника»
            </p>
          </div>
          <div class="address-text mx-5">
            <p>
              <span class="initial">Н</span>ашу команду вполне можно сравнить с
              Олимпийской сборной. В нее входят лучшие атлеты, чемпионы,
              спортсмены и тренеры, которые много и упорно работают над сборной
              для достижения победы. Для нас всех важен только общекомандный
              результат. Но в разные периоды те или иные сотрудники получают
              шанс проявить личные способности. И делают они это с огромным
              успехом.
            </p>
            <p>
              Наши «Лидеры перемен» − это Звезды команд, умеющие проявить свои
              компетенции в эпоху перемен. Изменились бизнес-ландшафт и
              политическая ситуация, приходят новые технологии и цифровые
              инновации, конкуренция стала жестче, а потребности клиентов
              сложнее, но и в этих изменившихся условиях наши сотрудники
              достойно «держат мяч» и демонстрируют нестандартные подходы! Что
              им помогает? Во-первых, профессиональные компетенции. Во-вторых,
              активное развитие навыков. И, конечно, дружеское плечо товарищей
              по команде: всех нас, кто работает в «Восточной Технике».
            </p>
            <p><b>Правила меняются. Движение к успеху продолжается!</b></p>
          </div>
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
}

.address-text::after {
  position: absolute;

  width: 58px;
  height: 58px;

  font-family: "Roboto", sans-serif;
  font-size: 170px;
  color: #ffb900;
}

.address-text::after {
  content: ",,";

  bottom: 95px;
  right: 15px;
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
