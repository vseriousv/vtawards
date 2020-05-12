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
                        <v-btn
                            class="manageBTN"
                            color="blue lighten-2"
                            dark small
                            @click.stop="getParticipants"
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
                        <th class="text-left">Номер</th>
                        <th class="text-left">Аватар</th>
                        <th class="text-left">Имя</th>
                        <th class="text-left">Год голосования</th>
                        <th class="text-left">Тип голосования</th>
                        <th class="text-right">Удалить/Исправить</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(itemField, id) in participants"  class="tr_row" :key="`itemField${itemField.id}`">
                        <td class="td_block">{{ id+1 }}</td>
                        <td class="td_block">
                            <div class="avatar">
                                <img :src="`/img/avatars/users/${itemField.user.img}.png`" />
                            </div>
                        </td>
                        <td class="td_block">{{ itemField.user.firstname_ru}} {{ itemField.user.patronymic_ru }} {{ itemField.user.lastname_ru }} </td>
                        <td class="td_block">{{ itemField.voting.year }}</td>
                        <td class="td_block">{{ itemField.voting.type_voting }}</td>
                        <td class="manageDelete td_block">
                            <v-btn
                                class="manageBTN"
                                color="green lighten-2"
                                dark small
                                @click.stop="updateParticipantsID(itemField.id)"
                            >
                                Исправить
                            </v-btn>
                            <v-btn
                                class="manageBTN"
                                color="red lighten-2"
                                dark small
                                @click.stop="removeParticipants(itemField.id)"
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
    import config from "../../../constants/config";
    export default {
        name: "MemberCatalog",
        data() {
            return {
                participants: [],
            }
        },
        created() {
            this.getParticipants();
        },
        methods: {
            createField: function () {
                this.$emit('handleModal', null, 'participants');
            },
            updateParticipantsID: function (id) {
                this.$store.commit("setMemberId", '');
                this.$store.commit("setMemberUser_Id", '');
                this.$store.commit("setMemberVotingId", '');
                this.$store.commit("setMemberId", this.participants.find(item=>item.id === id).id);
                this.$store.commit("setMemberUser_Id", this.participants.find(item=>item.id === id).user_id);
                this.$store.commit("setMemberVotingId", this.participants.find(item=>item.id === id).voting_id);
                this.$emit('handleModal', id, 'participants');
            },
            getParticipants: function () {
                const url = config.API_URL+'/participants'
                axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => {
                    console.log(result.data);
                    this.participants = result.data
                })
                .catch(e => console.error("participants-error:", e));
            },
            removeParticipants: function (id) {
                const url = config.API_URL+'/participants/'+id
                axios.delete( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                .then(result => {
                    this.getParticipants();
                    return result;
                })
                .catch(e => console.error("participants-error:", e));
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
            .td_block{
                min-height: 63px;
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
