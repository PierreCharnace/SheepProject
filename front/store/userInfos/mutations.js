export default {
    setStatus: function (state, status) {
        state.status = status;
    },
    logUser: function (state, user) { 
        state.user = user;
    },
    logout: function (state) {
        state.user = {
          userId: -1,
          token: '',
        }
        localStorage.removeItem('user');
        localStorage.removeItem('emailLocal');
        localStorage.removeItem('postInfos');
  
      },
}