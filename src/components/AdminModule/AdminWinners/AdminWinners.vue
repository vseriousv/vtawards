<template>
    <div class="containerAdmin">
        <!-- Card   MODAL      -->
        <div>
            <v-dialog  v-model="dialog" width="500" >
                <members-modal
                        v-if="dialogTable === 'winners'"
                        @handleReversModal="handleReversModal"
                        @addFieldTable="addFieldTable"
                        @updateFieldTableID="updateFieldTableID"
                        :idField="idField"
                />
            </v-dialog>
        </div>
        <!-- !Card   MODAL      -->
        <!-- Table   LIST       -->
        <v-card style="height: 100%">
            <v-tabs
                    background-color="white"
                    color="deep-purple accent-4"
                    class="contTabs"
            >
                <v-tab
                        v-for="tabOne in tabs"
                        :key="`items${tabOne.id}`"
                >{{tabOne.name}}</v-tab>

                <v-tab-item >
                    <members-catalog @handleModal="handleModal" />
                </v-tab-item>
            </v-tabs>
        </v-card>
        <!-- !Table   LIST       -->
    </div>
</template>

<script>
    import MembersCatalog from "./WinnersCatalog";
    import MembersModal from "./WinnersModal";

    import config from "../../../constants/config";
    import axios from "axios";

    export default {
        name: "AdminMembers",
        components: {
            MembersCatalog, MembersModal
        },
        methods: {
            handleReversModal: function () {
                this.dialog = !this.dialog;
            },
            handleModal: function (id, table) {
                this.idField = id || null;
                this.dialogTable = table;
                this.handleReversModal();
            },
            addFieldTable: function (table, dataSend) {
                const url = config.API_URL + '/' + table + '/create';
                axios.post(
                    url,
                    dataSend,
                    { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") }}
                )
                    .then(result => {
                        this.handleReversModal();
                        return result;
                    })
                    .catch(error => {
                        if(error.response.status === 400){
                            this.errorStr = 'Неправильно заполнены поля';
                        }else{
                            this.errorStr = error.response.status + '';
                        }
                    });
            },
            updateFieldTableID: function (table, dataSend) {
                const url = config.API_URL + '/' + table + '/' + this.idField;
                axios.put(
                    url,
                    dataSend,
                    { headers: {  Authorization: "Bearer " + localStorage.getItem("jwt") }}
                )
                    .then(result => {
                        this.handleReversModal();
                        return result;
                    })
                    .catch(error => {
                        if(error.response.status === 400){
                            this.errorStr = 'Неправильные данные';
                        }else{
                            this.errorStr = error.response.status + '';
                        }
                    });
            }
        },
        data() {
            return {
                dialog: false,
                dialogTable: '',
                tab: null,
                idField: null,
                tabs: [
                    {id: 0, name: "Победители", value: 'winners'}
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .containerAdmin{
        height: 100%;
        .titleCatalog{
            padding: 20px;
        }
    }
</style>
