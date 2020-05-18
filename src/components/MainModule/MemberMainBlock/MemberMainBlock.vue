<template>
  <section class="member container" id="member">
    <h2>Номинанты</h2>
    <div class="member-content">
      <span class="member-card-btn"></span>

      <!--            ВОТ ТУТ КАПЕЦ ЧТО_ТО            -->

      <!--            ВОТ ДО СЮДА                     -->
      <div class="member-map member-map-none">
        <ul class="member-map-list">
          <li class="member-map-list-item headoffice map-item-active">
            <a href="#">Головной офис</a>
          </li>
          <li class="member-map-list-item kuzbass">
            <a href="#">Кузбасс</a>
          </li>
          <li class="member-map-list-item zapsib">
            <a href="#">Центральная и Западная Сибирь</a>
          </li>
          <li class="member-map-list-item westsib">
            <a href="#">Восточная Сибирь</a>
          </li>
          <li class="member-map-list-item yakutia">
            <a href="#">Якутия</a>
          </li>
          <li class="member-map-list-item fareast">
            <a href="#">Дальний Восток</a>
          </li>
          <li class="member-map-list-item krasnoyarsk">
            <a href="#">Красноярский край</a>
          </li>
          <li class="member-map-list-item novokuz">
            <a href="#">EMPR</a>
          </li>
          <li class="member-map-list-item strong-state">
            <a href="#">Силовые установки</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MemberMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";
.member {
  margin-bottom: 95px;
}

.member h2 {
  margin: 0;
  margin-bottom: 30px;

  text-align: left;
}

.member-content {
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

.member-card {
  position: relative;
  z-index: 1;

  display: none;
  width: 394px;
  padding: 0px;

  border-radius: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.member-card-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  display: none;
  width: 100%;
  height: 110px;

  opacity: 0;
}

.member-card h3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  margin: 0;
  margin-bottom: 25px;
  padding: 0px 27px;
  height: 110px;

  background: #fdcc08;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.member-card-list {
  padding: 0;
  margin: 0;
  margin-bottom: 38px;

  list-style: none;
}

.member-card-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 27px;
  width: 100%;

  -webkit-transition: all 0.3s ease;

  -o-transition: all 0.3s ease;

  transition: all 0.3s ease;
}

.member-card-list-item:hover {
  background: #fdcc08;
}

.member-card-list-item img {
  width: 65px;
  height: 65px;
  margin-right: 15px;

  border-radius: 1000px;
  -o-object-fit: cover;
  object-fit: cover;
}

.member-card-list-item-text h4 {
  margin: 0;
  margin-bottom: 5px;
  padding: 0;

  font-size: 18px;
  color: #2d2d2d;
}

.member-card-list-item-text p {
  margin: 0;
  padding: 0;

  font-size: 14px;
  font-weight: 300;
  color: #2d2d2d;
}

.member-card .btn,
.member-card .btn:visited {
  margin: 0 auto;
  margin-bottom: 38px;

  border-color: #2d2d2d;
  color: #2d2d2d;
}

.member-card .btn:hover,
.member-card .btn:focus {
  border-color: #fdcc08;
  background-color: #fdcc08;
  color: #fff;
}

.member-map {
  width: 750px;
  height: 586px;

  background-image: url(/img/imgComponents/StartVoting/Map.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
}

.member-map-list {
  position: relative;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  list-style: none;
}

.member-map-list-item {
  position: absolute;
}

.member-map-list-item a,
.member-map-list-item a:visited {
  position: relative;

  padding: 3px 10px;

  font-size: 18px;
  font-weight: 500;
  color: #2d2d2d;

  background-color: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.member-map-list-item a:hover,
.member-map-list-item a:focus {
  background-color: #fdcc08;
  color: #000;
}

.map-item-active a {
  background-color: #fdcc08 !important;
  color: #000 !important;
}

.map-item-active a::before {
  background-color: #fdcc08 !important;
}

.member-map-list-item a::before {
  content: "";

  position: absolute;
  bottom: -15px;
  left: 0;

  height: 30px;
  width: 2px;

  background: #fff;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.member-map-list-item a:hover::before,
.member-map-list-item a:focus::before {
  background-color: #fdcc08;
}

.headoffice {
  left: 10%;
  top: 72%;
}

.kuzbass {
  left: 19%;
  top: 78%;
}

.zapsib {
  left: 16%;
  top: 64%;
}

.westsib {
  left: 36%;
  top: 74%;
}

.yakutia {
  left: 65%;
  top: 48%;
}

.fareast {
  left: 78%;
  top: 22%;
}

.fareast a::before {
  display: none;
}

.krasnoyarsk {
  top: 47%;
  left: 30%;
}

.novokuz {
  left: 19%;
  top: 86%;
}

.strong-state {
  top: 40%;
  left: 10%;
}

.strong-state a::before {
  display: none;
}

@-webkit-keyframes appIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes appIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.active-card {
  display: block;
  -webkit-animation: appIn 0.5s;
  animation: appIn 0.5s;
}

@media screen and (max-width: 1280px) {
  .headoffice {
    left: 10%;
    top: 62%;
  }

  .kuzbass {
    left: 19%;
    top: 68%;
  }

  .zapsib {
    left: 16%;
    top: 54%;
  }

  .westsib {
    left: 36%;
    top: 64%;
  }

  .yakutia {
    left: 65%;
    top: 38%;
  }

  .fareast {
    left: 70%;
    top: 28%;
  }
}

@media screen and (max-width: 1024px) {
  .member-card h3 {
    padding: 20px 15px;
  }

  .member-card-list-item {
    padding: 10px 15px;
  }

  .member-card-list-item-text p {
    display: none;
  }

  .member-map-list-item a,
  .member-map-list-item a:visited {
    -webkit-box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1),
      0 10px 10px rgba(0, 0, 0, 0.12);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.12);
  }

  .member-map-list-item a::before {
    display: none;
  }
}

@media screen and (max-width: 960px) {
  .member {
    margin-bottom: 50px;
  }

  .member-content {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .member-map-list-item {
    position: static;
  }

  .member-map-list-item a {
    display: block;
    width: 90%;
    margin-right: auto;
    padding: 15px 10px;
    margin-bottom: 5px;
  }

  .member-map {
    background: none;
  }

  .member-card {
    width: 60%;
  }

  .member-map {
    width: 40%;
  }
}

@media screen and (max-width: 640px) {
  .member-content {
    position: relative;
  }

  .member-card {
    width: 100%;
  }

  .member-card h3 {
    position: relative;
    padding-right: 20px;
  }

  .member-card h3::after {
    content: "";

    position: absolute;
    right: 18px;
    top: 50%;
    margin-top: -10px;

    padding: 0 8px;
    width: 20px;
    height: 20px;

    text-align: center;

    background-image: url(/img/imgComponents/StartVoting/drop-down-arrow.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }

  .member-card-btn {
    display: block;
  }

  .member-map {
    position: absolute;
    z-index: 5;
    top: 110px;

    width: 100%;
  }

  .member-map-none {
    display: none;
  }

  .member-map-list-item a {
    width: 100%;
    margin: 0;
    border-bottom: 1px solid #b1b1b1;
    border-radius: 0px;
  }
}
</style>
