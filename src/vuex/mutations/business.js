export const GET_BUSINESSES = (state, data) => {
    state.business.list = data.data.content.records;
    state.business.totalPages = data.data.totalPages;
};

export const updateLoadingStateBusiness = (state, data) => {
    state.business.isloadingComplete = data;
};

export const GET_BUSINESS = (state, data) => {
    state.business.info = data.data;
};
