<template>
  <section>
    <v-card class="ma-2">
      <h2 class="pa-4">Добро пожаловать в панель администратора</h2>
    </v-card>
    <v-card class="ma-2">
      <v-card-title>Здесь вы можете управлять сайтом</v-card-title>
      <v-list>
        <v-list-item><router-link to="/admin/users">Управление пользователями</router-link></v-list-item>
        <v-list-item><router-link to="/admin/voting">Управление голосованиями (Создать, редактировать, активировать голосование)</router-link></v-list-item>
        <v-list-item><router-link to="/admin/members">Управление участниками (Добавить, удалить участников в голосования)</router-link></v-list-item>
        <v-list-item><router-link to="/admin/winners">Управление победителями (Добавить, удалить победителей в голосованиях)</router-link></v-list-item>
        <v-list-item><router-link to="/admin/catalogs">Управление справочниками (Должности, регионы, отделы, города, номинации)</router-link></v-list-item>
      </v-list>
    </v-card>
    <v-card class="ma-2">
      <v-card-title>Работа с сайтом:</v-card-title>
        <v-list>
          <v-list-item>1. Для того чтобы добавить участников в голосование, нужно сначала - <router-link to="/admin/voting"> создать голосование</router-link></v-list-item>
          <v-list-item>2. После проведения голосования, победителей также нужно выбрать на странице - <router-link to="/admin/winners">управления победителями</router-link></v-list-item>
        </v-list>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "AdminMain"
};
</script>

<style lang="scss" scoped></style>
