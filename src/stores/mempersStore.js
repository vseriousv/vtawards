const membersState = {
  state: {
    memberId: "",
    memberUser_Id: "",
    memberVotingId: ""
  },
  mutations: {
    setMemberId(state, id) {
      state.memberId = id;
    },
    setMemberUser_Id(state, id) {
      state.memberUser_Id = id;
    },
    setMemberVotingId(state, data) {
      state.memberVotingId = data;
    }
  }
};
export default membersState;
