<script>

export default {
	name: "BtnContainerCardUserId",

	data() {
		return {
            btnDisabled: {fixsetData: true, saveData: true},
		};
	},
    props: {
        model: {
            type: String,
            default: null
        },
        tableLine: {
            type: String,
            default: null
        }
    },
	methods: {
        disabledBtnNone: function () {
            this.btnDisabled.saveData = false
            this.btnDisabled.fixsetData = false
        },

        saveDataInput: function() {
            this.btnDisabled.saveData = true
            this.btnDisabled.fixsetData = true
        },

	},
};
</script>


<template>
    <div class="contaynerBtn">
        <v-text-field
        class="mx-3 contaynerBtn__input"
        :disabled="this.btnDisabled.saveData"
        v-model="model"
        outlined>
        </v-text-field>
        <div class="contaynerBtn__btn">
            <v-btn class="mx-1"
                x-small
                color="secondary"
                @click.stop="disabledBtnNone"> 
                Редактировать
            </v-btn>
            <v-btn class="mx-1" 
                x-small
                :disabled="this.btnDisabled.saveData"
                color="primary"
                @click.stop="saveDataInput"
                @click="$emit('saveDataInput', tableLine, model)"> 
                Сохранить
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../../assets/styles/index";

.contaynerBtn {
    display: flex;
    flex-direction: row;
    width: 100%;
    &__btn {
    padding-top: 17px;
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    }
}
</style>