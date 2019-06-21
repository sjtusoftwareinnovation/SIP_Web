export const GET_COMPETITIONS = (state, data) => {
  state.competition.list = data.data.content.records;
  state.competition.totalPages = data.data.totalPages;
};

export const updateLoadingStateCompetition = (state, data) => {
  state.competition.isloadingComplete = data;
};

export const GET_COMPETITION = (state, data) => {
  state.competition.info = data.data.competition;
  state.competition.teams = data.data.teamList;
};

export const CREATE_COMPETITION = (state, data) => {
  state.competition.info = data.data;
};

export const MODIFY_COMPETITION = (state, data) => {
  state.competition.info = data.data;
};
