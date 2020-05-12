<template>
<div>
    <v-container fluid class="contTabs">
        <v-row class="createField_row">
            <div class="FindFiled">
                <div class="FindFiled_row">
                    <v-autocomplete
                            class="find_complete"
                            v-model="userItem"
                            :items="users_tab_value"
                            dense
                            outlined
                            label="Поиск по таб"
                    ></v-autocomplete>
                </div>
                <div class="FindFiled_row">
                    <v-autocomplete
                            class="find_complete"
                            v-model="userItem"
                            :items="users_name_value"
                            dense
                            outlined
                            label="Поиск по ФИО"
                    ></v-autocomplete>
                </div>
                <v-btn icon color="green">
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
            </div>
                <div class="createField">
                    <template>
                        <v-btn
                            class="manageBTN"
                            color="green lighten-2"
                            dark small
                            @click.stop="createField"
                        >
                            Добавить
                        </v-btn>
                    </template>
                </div>
        </v-row>
        <v-row>
            <v-simple-table class="tableAll">
                <template v-slot:default>
                    <thead>
                    <tr>
<!--                        <th class="text-left">Номер</th>-->
                        <th class="text-left width-th-tab_number">Таб номер</th>
                        <th class="text-left">Аватар</th>
                        <th class="text-left">ФИО</th>
                        <th class="text-left">Full name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(itemField, id) in users" :key="`itemField${id}`" class="tr_row" @click.stop="showUser(itemField.id)">
                            <td>{{ itemField.tab_number }}</td>
                            <td>
                                <div class="avatar">
                                    <img :src="`/img/avatars/users/${itemField.img}.png`" />
                                </div>
                            </td>
                            <td>{{ itemField.name_ru }}</td>
                            <td>{{ itemField.name_en }}</td>
                            <td>{{ itemField.email }}</td>
                            <td>{{ itemField.role}}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-row>
    </v-container>
</div>
</template>

<script>
    import axios from 'axios';
    import config from "../../../constants/config";
    export default {
        name: "UsersCatalog",
        data() {
            return {
                isActive: true,
                users: [],
                users_tab_value: [],
                users_name_value: [],
                userItem: ''
            }
        },
        created() {
            this.getUsers();
        },
        computed: {
          // userListShow: function () {
          //
          // }
        },
        methods: {
            getUsers_tv: function () {
                for (let i = 0; i < this.users.length; i++) {
                    this.users_tab_value.push({text: this.users[i].tab_number, value: this.users[i].tab_number });
                }
            },
            getUsers_nv: function () {
                for (let i = 0; i < this.users.length; i++) {
                    this.users_name_value.push({text: this.users[i].name_ru, value: this.users[i].tab_number });
                }
            },
            createField: function () {
                console.log("CREATE USER")
            },
            showUser: function (id) {
                this.$router.push({path: "/admin/users/id/"+id});
            },
            getUsers: function () {
                const url = config.API_URL+'/users'
                axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => {
                    this.setUsersArray(result.data);
                })
                .then(_ => {
                    this.getUsers_tv();
                    this.getUsers_nv();
                    return _;
                })
                .catch(e => console.error("users-error:", e));
            },
            setUsersArray: async function (data) {
                for (let i = 0; i < data.length; i++){
                    const userObject = {
                        id: data[i].id,
                        tab_number: data[i].tab_number,
                        img: data[i].img,
                        email: data[i].email,
                        role: data[i].role,
                        name_ru: data[i].firstname_ru + ' ' + data[i].patronymic_ru + ' ' + data[i].lastname_ru,
                        name_en: data[i].firstname_en + ' ' + data[i].patronymic_en + ' ' + data[i].lastname_en
                    };
                    this.users.push(userObject);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tableAll {
        width: 100%;
        height: 100%;
        .manageDelete {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            .manageBTN {
                margin: 10px 0;
            }
        }
        .tr_row{
            .avatar{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                overflow: hidden;
                margin: 5px;
                img{
                    width: 44px;
                    height: 44px;
                }
            }
        }
    }
    .createField_row{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .createField{
            .manageBTN{
                margin: 0 10px;
            }
        }
        .FindFiled{
            display: flex;
            .FindFiled_row{
                display: flex;
                padding: 0;
                .find_complete{
                    margin: 0 5px;
                }

            }
        }
    }
</style>
