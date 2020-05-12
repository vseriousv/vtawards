<template>
    <section class="participants-block mxw1200">
        <v-simple-table class="tableAll">
            <template v-slot:default>
                <tbody>
                <tr v-for="(itemField, id) in participants"  class="tr_row" :key="`itemField${id}`">
                    <td class="td_block text-center">
                        <div class="avatar">
                            <img :src="`/img/avatars/users/${itemField.user.img}.png`" />
                        </div>
                    </td>
                    <td v-if="$t('lang') === 'ru'" class="td_block text-center">{{ itemField.user.firstname_ru}} {{ itemField.user.patronymic_ru }} {{ itemField.user.lastname_ru }} </td>
                    <td v-if="$t('lang') === 'en'" class="td_block text-center">{{ itemField.user.firstname_en}} {{ itemField.user.patronymic_en }} {{ itemField.user.lastname_en }} </td>
                    <td v-if="$t('lang') === 'ru'" class="td_block text-center"></td>
                    <td v-if="$t('lang') === 'en'" class="td_block text-center"></td>
                    <td v-if="$t('lang') === 'ru'" class="td_block text-center">{{ itemField.user.state.value_ru }}</td>
                    <td v-if="$t('lang') === 'en'" class="td_block text-center">{{ itemField.user.state.value_en }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </section>
</template>

<script>
    import config from "../../constants/config";
    import axios from 'axios';
    export default {
        name: "ParticipantsBlock",
        data() {
            return {
                participants: [],
            }
        },
        created() {
            this.getParticipants();
        },
        methods: {
            getParticipants: function () {
                const url = config.API_URL+'/participants/isactive'
                axios.get( url, { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") } } )
                    .then(result => {
                        console.log(result.data);
                        this.participants = result.data
                    })
                    .catch(e => console.error("participants-error:", e));
            }
        }
    }
</script>

<style lang="scss" scoped>
.participants-block{
    width: 100%;
    min-height: 600px;
    margin-top: 50px;
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
}
</style>
