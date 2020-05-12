const votingsState = {
    state: {
        votingId: '',
        votingYear: '',
        votingType: '',
        votingStatus: ''
    },
    mutations: {
        setVotingId (state, id) {
            state.votingId = id;
        },
        setVotingYear (state, data) {
            state.votingYear = data;
        },
        setVotingType (state, data) {
            state.votingType = data;
        },
        setVotingStatus (state, data) {
            state.votingStatus = data;
        }
    }
}
export default votingsState;
