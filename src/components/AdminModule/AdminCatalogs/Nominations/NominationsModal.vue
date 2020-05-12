<template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            {{this.dialogHead}}
        </v-card-title>

        <v-card-text class="card-form-create">
            <v-form class="form-create">
                <v-text-field
                        class="form-create__field"
                        label="Регион (Русский)"
                        single-line
                        outlined
                        v-model="adminValueRu"
                ></v-text-field>
                <v-text-field
                        class="form-create__field"
                        label="Регион (Английский)"
                        single-line
                        outlined
                        v-model="adminValueEn"
                ></v-text-field>
                <span class="Error">{{errForm}}</span>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green lighten-2"
                outlined
                @click.stop="sendData"
            >
                Отправить
            </v-btn>
            <v-btn
                color="red lighten-2"
                text
                @click.stop="closeModal"
            >
                Закрыть
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "NominationsModal",
        props: ['idField', 'dataTable'],
        data(){
            return {
                dialogHead: 'Регион',
                dialogTable: 'nominations',

                errForm: ''
            }
        },
        methods: {
            sendData: function () {
                const dataValue = {
                    'value_ru': this.$store.state.adminValueRu,
                    'value_en': this.$store.state.adminValueEn
                }
                if(this.$store.state.adminValueRu === '' || this.$store.state.adminValueEn === ''){
                    this.errForm = 'Все поля обязательны для заполнения';
                } else {
                    if(this.idField == null) {
                        this.$emit('addFieldTable', 'nominations', dataValue);
                    }else{
                        this.$emit('updateFieldTableID', 'nominations', dataValue);
                    }
                    this.resetForm();
                }
            },
            closeModal: function () {
                this.$emit('handleReversModal');
                this.resetForm();
            },
            resetForm: function () {
                this.errForm = '';
                this.$store.commit('setAdminValueRu', '');
                this.$store.commit('setAdminValueEn', '');
            }
        },
        computed: {
            adminIdField: {
                get () {  return this.$store.state.adminIdField;  },
                set (id) { this.$store.commit("setAdminIdField", id); }
            },
            adminValueRu: {
                get () { return this.$store.state.adminValueRu; },
                set (value) { this.$store.commit("setAdminValueRu", value); }
            },
            adminValueEn: {
                get () { return this.$store.state.adminValueEn; },
                set (value) { this.$store.commit("setAdminValueEn", value); }
            },
            adminErrorStr: {
                get () { return this.$store.state.adminErrorStr; },
                set (value) {  this.$store.commit("setAdminErrorStr", value); }
            },
        }
    }
</script>

<style lang="scss" scoped>
.card-form-create{
    display: flex;
    justify-content: center;
    width: 100%;
    .form-create{
        width: 100%;
        margin-top: 20px;
        margin-bottom: -20px;
        .form-create__field{
        }
    }
}
.Error{
    margin-top: 25px;
    text-align: center;
    color: #FF5300;
    width: 100%;
}
</style>
