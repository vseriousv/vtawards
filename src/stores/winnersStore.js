const winnersState = {
    state: {
        winnerId: '',
        winnerUser_Id: '',
        winnerVotingId: ''
    },
    mutations: {
        setWinnerId (state, id) {
            state.winnerId = id;
        },
        setWinnerUser_Id (state, id) {
            state.winnerUser_Id = id;
        },
        setWinnerVotingId (state, data) {
            state.winnerVotingId = data;
        },
    }
}
export default winnersState;
