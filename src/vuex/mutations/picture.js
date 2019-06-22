export const UP_LOAD = (state, data) => {
	state.pic.url = "http://202.121.181.180:8080/sip/" + data.data;
};
