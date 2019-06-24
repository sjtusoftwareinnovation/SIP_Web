export const GET_TEAMS_ALL = (state, data) => {
  state.team.list = data.data;
  // Vue.set(state.team, "list", data.data)
};

export const GET_TEAM = (state, data) => {
  state.team.info = data.data.team;
  state.team.memberList = data.data.userStatusList;
};

export const UPDATE_TEAM = (state, data) => {
  state.team.info = data.data;
};

export const GET_APPLYLIST = (state, data) => {
  state.team.applyList = data.data;
};



