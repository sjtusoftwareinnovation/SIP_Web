export const GET_COMMENTS = (state, data) => {
    state.competition.comment.list = data.data;
};

