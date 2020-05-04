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
                            Создать
                        </v-btn>
                        <v-btn
                            class="manageBTN"
                            color="blue lighten-2"
                            dark small
                            @click.stop="getPositions"
                        >
                            Обновить
                        </v-btn>
                    </template>
                </div>
        </v-row>
        <v-row>
            <v-simple-table class="tableAll">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Код</th>
                        <th class="text-left">Должность (Русский)</th>
                        <th class="text-left">Должность (Англйиский)</th>
                        <th class="text-right">Удалить/Исправить</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="itemField in positions" :key="`itemField${itemField.id}`">
                        <td>{{ itemField.code }}</td>
                        <td>{{ itemField.value_ru }}</td>
                        <td>{{ itemField.value_en }}</td>
                        <td class="manageDelete">
                            <v-btn
                                class="manageBTN"
                                color="green lighten-2"
                                dark small
                                @click.stop="updatePositionID(itemField.id)"
                            >
                                Исправить
                            </v-btn>
                            <v-btn
                                class="manageBTN"
                                color="red lighten-2"
                                dark small
                                @click.stop="removePosition(itemField.id)"
                            >
                                Удалить
                            </v-btn>
                        </td>
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
    import config from "../../../../constants/config";
    export default {
        name: "PositionsCatalog",
        data() {
            return {
                positions: [],
            }
        },
        created() {
            this.getPositions();
        },
        methods: {
            createField: function () {
                this.$emit('handleModal', null, 'positions');
            },
            updatePositionID: function (id) {
                this.$store.commit("setAdminCodeField", '');
                this.$store.commit("setAdminValueRu", '');
                this.$store.commit("setAdminValueEn", '');
                this.$store.commit("setAdminCodeField", this.positions.find(item=>item.id === id).code);
                this.$store.commit("setAdminValueRu", this.positions.find(item=>item.id === id).value_ru);
                this.$store.commit("setAdminValueEn", this.positions.find(item=>item.id === id).value_en);
                this.$emit('handleModal', id, 'positions');
            },
            getPositions: function () {
                const url = config.API_URL+'/positions'
                axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => this.positions = result.data)
                .catch(e => console.error("positions-error:", e));
            },
            removePosition: function (id) {
                const url = config.API_URL+'/positions/'+id
                axios.delete( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => {
                    this.getPositions();
                    return result;
                })
                .catch(e => console.error("positions-error:", e));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tableAll {
        width: 100%;
        height: 100%;
        .manageDelete{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .manageBTN{
                margin: 0 10px;
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
