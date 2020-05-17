<template>
<div>
    <v-container fluid class="contTabs">
        <v-row class="createField_row">
            <div class="FindFiled">
                <v-text-field
                    outlined
                    dense
                    v-model="search_user"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
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
            <v-data-table
                class="tableAll"
                :headers="headers_user"
                :items="users"
                :search="search_user"
            >
                <template v-slot:item="{item}">
                    <tr class="tr_row" @click="showUser(item.id)">
                        <td class="td_block text-left">{{ item.tab_number}}</td>
                        <td class="td_block text-center">
                            <div class="avatar">
                                <img :src="`${URL_AVATARS}${item.img}`" />
                            </div>
                        </td>
                        <td class="td_block text-left">{{ item.name_ru}}</td>
                        <td class="td_block text-left">{{ item.name_en}} </td>
                        <td class="td_block text-left">{{ item.email}} </td>
                        <td class="td_block text-left">{{ item.role}} </td>
                    </tr>
                </template>
            </v-data-table>
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
                headers_user: [
                    {
                        text: 'Таб номер',
                        align: 'start',
                        sortable: false,
                        value: 'tab_number',
                    },
                    { text: 'Аватар', value: 'img' },
                    { text: 'ФИО', value: 'name_ru' },
                    { text: 'Full name', value: 'name_en' },
                    { text: 'Email', value: 'email' },
                    { text: 'Роль', value: 'role' },
                ],
                userItem: '',
                URL_AVATARS: config.URL_AVATARS,
                search_user: ''
            }
        },
        created() {
            this.getUsers();
        },
        computed: {

        },
        methods: {
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
                    console.log(result.data)
                    this.setUsersArray(result.data);
                })
                .catch(e => console.error("users-error:", e));
            },
            setUsersArray: async function (data) {
                for (let i = 0; i < data.length; i++){
                    const userObject = {
                        id: data[i].id,
                        tab_number: data[i].tab_number,
                        img: data[i].img ? data[i].img  : 'null.png',
                        email: data[i].email,
                        role: data[i].role,
                        name_ru: data[i].firstname_ru + ' ' + data[i].patronymic_ru + ' ' + data[i].lastname_ru,
                        name_en: data[i].firstname_en + ' ' + data[i].lastname_en
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
            width: 100%;
            .avatar {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                overflow: hidden;
                margin: 5px;

                img {
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
