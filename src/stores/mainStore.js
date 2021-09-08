import Vue from "vue";
import Vuex from "vuex";
import catalogsState from "./catalogsStore";
import usersState from "./usersStore";
import votingsState from "./votingsStore";
import membersState from "./mempersStore";
import winnersState from "./winnersStore";

Vue.use(Vuex);

const mainStore = new Vuex.Store({
	state: {
		...catalogsState.state,
		...usersState.state,
		...votingsState.state,
		...membersState.state,
		...winnersState.state
	},
	mutations: {
		...catalogsState.mutations,
		...usersState.mutations,
		...votingsState.mutations,
		...membersState.mutations,
		...winnersState.mutations
	}
});

export default mainStore;
