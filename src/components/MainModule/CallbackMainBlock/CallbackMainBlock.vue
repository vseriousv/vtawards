<template>
  <section class="callback">
    <h2>Остались вопросы?</h2>
    <p>Задайте их через форму, и мы обязательно ответим</p>
    <form class="callback-form">
      <v-text-field
        outlined
        label="ФИО"
        name="cb-name"
        class="callback-form__field"
      />
      <v-textarea
        outlined
        class="callback-form__field"
        name="cb-text"
        label="Текст вопроса"
      />
      <button type="submit" class="btn btn-yellow">Отправить</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "CallbackMainBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";

.callback {
  margin-bottom: 100px;
  padding-top: 50px;
  padding-bottom: 80px;

  text-align: center;

  background-image: url(/img/imgComponents/StartVoting/question.svg);
  background-repeat: no-repeat;
  background-position: 120% center;
}

.callback h2 {
  margin-bottom: 10px;
}

.callback p {
  margin-bottom: 40px;
}

.callback-form {
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .callback-form__field {
    width: 100%;
  }
}

.callback-form .btn {
  width: 250px !important;
  text-align: center;
  padding: 0 !important;
  margin-top: 30px;
}

@media screen and (max-width: 1024px) {
  .callback {
    padding-top: 0;

    background: none;
  }
}
</style>
