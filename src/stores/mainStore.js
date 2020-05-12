import Vue from "vue";
import Vuex from 'vuex'
import catalogsState from "./catalogsStore";
import usersState from "./usersStore";
import votingsState from "./votingsStore";
import membersState from "./mempersStore";

Vue.use(Vuex);

const mainStore = new Vuex.Store({
    state: {
        ...catalogsState.state,
        ...usersState.state,
        ...votingsState.state,
        ...membersState.state,
    },
    mutations: {
        ...catalogsState.mutations,
        ...usersState.mutations,
        ...votingsState.mutations,
        ...membersState.mutations,
    }
})

export default mainStore;
