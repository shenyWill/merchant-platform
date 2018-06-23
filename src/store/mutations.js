export default {
  LOGIN (state, user) {
    state.user = user;
  },
  LOGOUT (state) {
    state.user = null;
    state.token = null;
  },
  SET_USER (state, user) {
    state.user = user;
  }
};
