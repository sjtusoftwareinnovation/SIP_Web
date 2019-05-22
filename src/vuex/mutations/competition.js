export const GET_COMPETITIONS = (state, data) => {
  state.competition.list = data.data.content.records;
  state.competition.totalPages = data.data.totalPages;
};

export const updateLoadingStateCompetition = (state, data) => {
  state.competition.isloadingComplete = data;
};

