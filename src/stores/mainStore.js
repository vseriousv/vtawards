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

        adminUser_email: "",
        adminUser_password: "",
        adminUser_tab_number: "",
        adminUser_name_ru: "",
        adminUser_name_en: "",
        adminUser_position_id: "",
        adminUser_section_id: "",
        adminUser_state_id: "",
        adminUser_city_id: "",
        adminUser_nomination_id: "",
        adminUser_count_z: 0,
        adminUser_description_ru: "",
        adminUser_description_en: "",
        adminUser_role: "",
        adminUser_img: ""
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

        setAdminUser_email (state, value){
            state.adminUser_email = value;
        },
        setAdminUser_password (state, value){
            state.adminUser_password = value;
        },
        setAdminUser_tab_number (state, value){
            state.adminUser_tab_number = value;
        },
        setAdminUser_name_ru (state, value){
            state.adminUser_name_ru = value;
        },
        setAdminUser_name_en (state, value){
            state.adminUser_name_ru = value;
        },
        setAdminUser_position_id (state, value){
            state.adminUser_position_id = value;
        },
        setAdminUser_section_id (state, value){
            state.adminUser_section_id = value;
        },
        setAdminUser_state_id (state, value){
            state.adminUser_state_id = value;
        },
        setAdminUser_city_id (state, value){
            state.adminUser_city_id = value;
        },
        setAdminUser_nomination_id (state, value){
            state.adminUser_nomination_id = value;
        },
        setAdminUser_count_z (state, value){
            state.adminUser_count_z = value;
        },
        setAdminUser_description_ru (state, value){
            state.adminUser_description_ru = value;
        },
        setAdminUser_description_en (state, value){
            state.adminUser_description_en = value;
        },
        setAdminUser_role (state, value){
            state.adminUser_role = value;
        },
        setAdminUser_img (state, value){
            state.adminUser_img = value;
        },
    }
})

export default mainStore;
