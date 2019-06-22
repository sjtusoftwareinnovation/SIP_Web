export const GET_PROJECTS = (state, data) => {
    state.project.list = data.data.content.records;
    state.project.totalPages = data.data.totalPages;
};

export const updateLoadingStateProject = (state, data) => {
    state.project.isloadingComplete = data;
};

export const GET_PROJECT = (state, data) => {
    state.project.info = data.data;
};
