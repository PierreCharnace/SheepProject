const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});

export default {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user))// save user in localStorage 
      state.user = user;
      this.$router.push('Article')
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    userLogged: function (state) {
      localStorage.getItem('user', JSON.parse(state.user))// get back user ;
      return console.log(state.user)
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('postInfos');
  
    },
}