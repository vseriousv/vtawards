const usersState = {
    state: {
        adminUser_email: "",
        adminUser_password: "",
        adminUser_tab_number: "",
        adminUser_firstname_ru: "",
        adminUser_firstname_en: "",
        adminUser_lastname_ru: "",
        adminUser_lastname_en: "",
        adminUser_patronymic_ru: "",
        adminUser_patronymic_en: "",

        adminUser_position_id: "",
        adminUser_section_id: "",
        adminUser_state_id: "",
        adminUser_city_id: "",
        adminUser_nomination_id: "",
        adminUser_count_z: 0,
        adminUser_role: "",

        adminUser_img: "",

        adminUser_description_ru: "",
        adminUser_description_en: "",
    },
    mutations: {
        setAdminUser_email (state, value){
            state.adminUser_email = value;
        },
        setAdminUser_tab_number (state, value){
            state.adminUser_tab_number = value;
        },
        setAdminUser_firstname_ru (state, value){
            state.adminUser_firstname_ru = value;
        },
        setAdminUser_firstname_en (state, value){
            state.adminUser_firstname_en = value;
        },
        setAdminUser_lastname_ru (state, value){
            state.adminUser_lastname_ru = value;
        },
        setAdminUser_lastname_en (state, value){
            state.adminUser_lastname_en = value;
        },
        setAdminUser_patronymic_ru (state, value){
            state.adminUser_patronymic_ru = value;
        },
        setAdminUser_patronymic_en (state, value){
            state.adminUser_patronymic_en = value;
        },

        setAdminUser_password (state, value){
            state.adminUser_password = value;
        },

        setAdminUser_role (state, value){
            state.adminUser_role = value;
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

        setAdminUser_img (state, value){
            state.adminUser_img = value;
        },
    }
}
export default usersState;
