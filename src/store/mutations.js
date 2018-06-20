export default {
  LOGIN (state, user) {
    state.user = user;
  },
  LOGOUT (state) {
    state.user = null;
    state.token = null;
  }
};
