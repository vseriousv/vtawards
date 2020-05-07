<template>
<div>
    <v-container fluid class="contTabs">
        <v-row class="createField_row">
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
                        <th class="text-left">Таб номер</th>
                        <th class="text-left">Аватар</th>
                        <th class="text-left">ФИО</th>
                        <th class="text-left">Должность</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Расположение</th>
                        <th class="text-left">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(itemField, id) in users" :key="`itemField${id}`" class="tr_row" @click.stop="showUser(itemField.id)">
                        <td>{{ itemField.tab_number }}</td>
                        <td>{{ itemField.img }}</td>
                        <td>{{ itemField.name_ru }}<br />{{ itemField.name_en }}</td>
                        <td>{{ itemField.position_ru }}<br />{{ itemField.position_en }}</td>
                        <td>{{ itemField.email }}</td>
                        <td>
                            {{ itemField.section_ru}}<br />
                            {{ itemField.state_ru }}<br />
                            {{ itemField.city_ru }}<br />
                        </td>
                        <td>{{itemField.role}}</td>
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
                users: [],
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            createField: function () {
                console.log("CREATE USER")
            },
            showUser: function (id) {
                console.log("SHOW USER", id);
            },
            getUsers: function () {
                const url = config.API_URL+'/users'
                axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => {
                    this.setUsersArray(result.data);
                })
                .catch(e => console.error("users-error:", e));
            },
            setUsersArray: async function (data) {
                for (let i = 0; i < data.length; i++){
                    const get_position = await this.getTable('positions', data[i].position_id);
                    const get_section = await this.getTable('sections', data[i].section_id);
                    const get_state = await this.getTable('states', data[i].state_id);
                    const get_city = await this.getTable('cities', data[i].city_id);

                    const userObject = {
                        id: data[i].id,
                        tab_number: data[i].tab_number,
                        img: data[i].img,
                        email: data[i].email,
                        role: data[i].role,
                        name_ru: data[i].name_ru,
                        name_en: data[i].name_en,
                        position_ru: get_position.value_ru,
                        position_en: get_position.value_en,
                        section_ru: get_section.value_ru,
                        section_en: get_section.value_en,
                        state_ru: get_state.value_ru,
                        state_en: get_state.value_en,
                        city_ru: get_city.value_ru,
                        city_en: get_city.value_en
                    };
                    this.users.push(userObject);
                }
            },
            getTable: async function (table, id) {
                const url = config.API_URL+'/'+table+'/code/'+id
                let res = {};
                await axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                    .then(result => {
                        res = {
                            value_ru: result.data.value_ru,
                            value_en: result.data.value_en
                        };
                    })
                    .catch(e => console.error("users-error:", e));
                return res;
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
    }
    .createField_row{
        display: flex;
        justify-content: flex-end;
        .createField{
            .manageBTN{
                margin: 0 10px;
            }
        }
    }
</style>
