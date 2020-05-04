import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

const mainStore = new Vuex.Store({
    state: {
        adminIdField: '',
        adminCodeField: '',
        adminValueRu: '',
        adminValueEn: '',
        adminErrorStr: '',
    },
    mutations: {
        setAdminIdField (state, id) {
            state.adminIdField = id;
        },
        setAdminCodeField (state, data) {
            state.adminCodeField = data;
        },
        setAdminValueRu (state, data) {
            state.adminValueRu = data;
        },
        setAdminValueEn (state, data) {
            state.adminValueEn = data;
        },
        setAdminErrorStr (state, data) {
            state.adminErrorStr = data;
        },
    }
})

export default mainStore;
