const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});

export default {
    /*userInfosGetter: function () {
        let user = localStorage.getItem('user');
        if (!user) {
        user = {
            userId: -1,
            token: '',
        };
        } else {
        try {
            user = JSON.parse(user);
            instance.defaults.headers.common['Authorization'] = user.token;
        } catch (ex) {
            user = {
            userId: -1,
            token: '',
            };
        }
    }
    },*//*
    stateId(state) {
        console.log('youhou', state.user);
        return state.user
      }*/
}