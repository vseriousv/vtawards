<template>
  <section class="steps mxw1200" id="steps">
    <div class="">
      <h2>Выборы победителей</h2>
      <ul class="steps-list">
        <li class="steps-list-item active-step">
          <div class="steps-list-item-title">
            <div class="step-number">I</div>
            <div>
              <p class="step-date">
                <!--                                        <?php echo $vt_options['text-step-1-date']; ?>-->
                Дата проведения
              </p>
            </div>
            <img
              class="step-img"
              src="/img/imgComponents/StartVoting/starofteam_ball_transparent.png"
              width="50"
            />
          </div>
          <h3>
            <!--                                <?php echo $vt_options['text-step-1-title-' . $my_lang ]; ?>-->
            Региональный этап
          </h3>
          <div class="steps-list-item-text">
            <p>
              <!--                                    <?php echo $vt_options['text-step-1-desc-' . $my_lang ]; ?>-->
              Описание этапа
            </p>
          </div>
        </li>
        <li class="steps-list-item">
          <div class="steps-list-item-title">
            <div class="step-number">II</div>
            <div>
              <p class="step-date">
                <!--                                        <?php echo $vt_options['text-step-2-date']; ?>-->
                Дата проведения
              </p>
            </div>
            <img
              class="step-img"
              src="/img/imgComponents/StartVoting/leader_ball.png"
              width="50"
            />
          </div>
          <h3>
            <!--                                <?php echo $vt_options['text-step-2-title-' . $my_lang ]; ?>-->
            Региональный этап
          </h3>
          <div class="steps-list-item-text">
            <p>
              <!--                                    <?php echo $vt_options['text-step-2-desc-' . $my_lang ]; ?>-->
              Описание этапа
            </p>
          </div>
        </li>
        <li class="steps-list-item">
          <div class="steps-list-item-title">
            <div class="step-number">III</div>
            <div>
              <p class="step-date">
                <!--                                        <?php echo $vt_options['text-step-3-date' ]; ?>-->
                Дата проведения
              </p>
            </div>
            <img
              class="step-img"
              src="/img/imgComponents/StartVoting/leader_ball.png"
              width="50"
            />
          </div>
          <h3>
            <!--                                <?php echo $vt_options['text-step-3-title-' . $my_lang ]; ?>-->
            Региональный этап
          </h3>
          <div class="steps-list-item-text">
            <!--                                <p><?php echo $vt_options['text-step-3-desc-' . $my_lang ]; ?></p>-->
            Описание этапа
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "StepsMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.steps {
  margin-bottom: 170px;

  background-image: url(/img/imgComponents/StartVoting/steps.svg);
  background-repeat: no-repeat;
  background-position: 100% -195%;
}

.steps h2 {
  text-align: center;
  margin-bottom: 94px;
}

.steps-list {
  margin: 0;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  list-style: none;
}

.steps-list-item {
  margin: 10px;
  width: 393px;
  padding-top: 25px;
  padding-left: 34px;
  padding-right: 34px;
  padding-bottom: 10px;

  background-color: #fff;
  border-radius: 10px;
  -webkit-box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.12);
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.12);
}

.steps-list-item-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 40px;
}

.step-number {
  width: 74px;
  height: 74px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  font-size: 30px;
  font-weight: 700;

  border: 4px solid #000;
  border-radius: 50%;
}

.step-img {
  /*margin-left: auto;*/
}

.step-date {
  margin: 0 !important;

  color: #3e3e3e;
  font-weight: 600 !important;
}

.steps-list p {
  margin: 0;
  margin-bottom: 20px;

  color: #5b5b5b;
}

.active-step .step-number {
  background-color: #ffb900;
}

@media screen and (max-width: 1280px) {
  .steps {
    background-position: 104% -150%;
  }
  .steps-list-item {
    width: 32.5%;
    padding-top: 25px;
    padding-left: 23px;
    padding-right: 16px;
    padding-bottom: 10px;
  }
  .steps-list-item-title {
    margin-bottom: 30px;
  }
  .step-number {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  .steps-list-item h3 {
    margin-bottom: 20px;
  }
  .steps-list p {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 980px) {
  .steps {
    margin-bottom: 70px;
  }
  .steps h2 {
    margin-bottom: 60px;
  }
  .steps-list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .steps-list-item-title {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    margin-bottom: -25px;
  }
  .steps-list-item {
    width: 70%;
    margin-bottom: 30px;
    padding-bottom: 30px;
  }
  .step-number {
    margin: 0 auto;
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 770px) {
  .steps {
    padding-top: 0;
  }
  .steps-list-item {
    width: 100%;
  }
}

@media screen and (max-width: 540px) {
  .steps-list-item-title {
    margin-bottom: 5px;
  }
  .steps-list-item-title {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .step-number {
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 15px;
  }
}
</style>
