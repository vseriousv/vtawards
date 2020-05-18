<template>
  <v-container fluid>
    <v-row>
      <section class="nomination mxw1200" id="nomination">
        <div class="nomination-container">
          <div class="nomination-text">
            <h2>Номинации - 2019</h2>
            <p>
              Выдвинуть номинанта в любую из шести номинаций «Звезда команды»
              может каждый сотрудник «ВТ», и количество заявок от одного
              человека не ограничено.
            </p>
            <!--<a class="btn btn-yellow" href="">Подать заявку</a>-->
          </div>
          <div class="nomination-icons">
            <ul class="nomination-list">
              <li class="nomination-list-item">
                <a href="#nomination-leader">
                  <img
                    src="/img/imgComponents/StartVoting/networking.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Лидер</p>
                </a>
              </li>
              <li class="nomination-list-item">
                <a href="#nomination-achievement">
                  <img
                    src="/img/imgComponents/StartVoting/flag.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Достижение</p>
                </a>
              </li>
              <li class="nomination-list-item">
                <a href="#nomination-professional">
                  <img
                    src="/img/imgComponents/StartVoting/thumb-up.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Профессионал</p>
                </a>
              </li>
            </ul>
            <ul class="nomination-list">
              <li class="nomination-list-item">
                <a href="#nomination-innovator">
                  <img
                    src="/img/imgComponents/StartVoting/creative.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Новатор</p>
                </a>
              </li>
              <li class="nomination-list-item">
                <a href="#nomination-client">
                  <img
                    src="/img/imgComponents/StartVoting/conversation.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Клиент - наше всё</p>
                </a>
              </li>
              <li class="nomination-list-item">
                <a href="#smart-partner">
                  <img
                    src="/img/imgComponents/StartVoting/goal.svg"
                    alt="Лидер"
                    width="58"
                    height="58"
                  />
                  <p>Золотой человек</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NominationMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.nomination {
  padding-top: 100px;
  padding-bottom: 90px;
  margin-bottom: 100px;
  padding-left: 10px;
  padding-right: 10px;
  border-top: 250px transparent;
  /*margin-top: -50px;*/
  background-image: url(/img/imgcomponents/StartVoting/award.svg);
  background-repeat: no-repeat;
  background-position: -10% center;
  background-size: contain;
}

.nomination-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.nomination-text p {
  max-width: 605px;
  margin-bottom: 60px;
}

.nomination-icons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 50px;
}

.nomination-list {
  margin: 0;
  margin-left: 55px;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;

  list-style: none;
}

.nomination-list-item {
  position: relative;

  margin-bottom: 50px;
  min-width: 190px;
}

.nomination-list-item::before {
  content: "";

  position: absolute;
  bottom: -20px;
  left: -30px;
  z-index: -1;

  width: 92px;
  height: 80px;

  border-left: 12px solid #ffb900;
  border-bottom: 11px solid #ffb900;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.nomination-list-item a p,
.nomination-list-item a:visited p {
  margin: 0;
  margin-top: 5px;

  font-size: 20px;
  font-weight: 700;
  color: #141414;

  -webkit-transition: all 0.3s ease;

  -o-transition: all 0.3s ease;

  transition: all 0.3s ease;
}

.nomination-list-item:hover a p {
  color: #ffb900;
}

.nomination-list-item:hover::before {
  -webkit-box-shadow: -15px 15px 0px rgba(255, 185, 0, 0.6),
    0px 15px 0px rgba(255, 185, 0, 0.3);
  box-shadow: -15px 15px 0px rgba(255, 185, 0, 0.6),
    0px 15px 0px rgba(255, 185, 0, 0.3);
}

.nomination-icons .btn {
  display: none;
}

@media screen and (max-width: 1280px) {
  .nomination {
    padding-top: 80px;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 920px) {
  .nomination {
    background-position: center 313%;
  }
  .nomination-container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .nomination-text {
    margin-right: auto;
  }
  .nomination-text .btn {
    display: none;
  }
  .nomination-icons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
  }
  .nomination-list {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .nomination-icons .btn {
    display: block;
    margin-top: 40px;
    padding-top: 20px;
  }
}

@media screen and (max-width: 770px) {
  .nomination {
    padding-top: 0;

    background: none;
  }
  .nomination-container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .nomination-text {
    margin-bottom: 40px;
  }
  .nomination-text p {
    margin-bottom: 20px;
  }
  .nomination-text .btn {
    display: block;
    padding-top: 20px;
  }
  .nomination-icons {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 100%;
  }
  .nomination-list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-left: 30px;
  }
  .nomination-list:nth-child(2) {
    margin-left: 50px;
  }
  .nomination-icons .btn {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .nomination-list-item {
    min-width: 150px;
  }
}

@media screen and (max-width: 490px) {
  .nomination-icons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .nomination-list-item::before {
    width: 250px;
  }
  .nomination-list:nth-child(2) {
    margin-left: 30px;
  }
}
</style>
