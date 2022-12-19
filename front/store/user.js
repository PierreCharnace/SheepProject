const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/auth/'
});

export const state = () => ({
//userInfos : 'youhou',

})

export const mutations = {
    setStatus: function (state, status) {
        state.status = status;
    },

    logged () {
    },

    logUser({dispatch, state,store}, user) {
        console.log("logUser", user);
        instance.defaults.headers.common['Authorization'] = user.token;
        localStorage.setItem('user', JSON.stringify(user))// save user in localStorage 
        state = user;
        window.location.replace('http://localhost:3000/Article')                        
        //dispatch('getProfile', user)
    },

    userInfos: function (state, userInfos) {
        state.userInfos = userInfos;
    },

    getProfile: function () {
        JSON.parse(localStorage.getItem('user'))

    },

    logout: function (state) {
        state.user = {
            userId: -1,
            token: '',
        }
        console.log('youhou2',this.modeUser),
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('postInfos');

    },
}

export const actions = {
    login: ({ commit }, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
            instance.post('/login', userInfos,

                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                .then(function (response) {
                    commit('setStatus', 'logged');
                    commit('logUser', response.data);
                    window.alert('Vous allez être dirigés vers la page article')
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    commit('setStatus', 'error_login');
                    window.alert("Erreur d'identifiant")
                    reject(error);
                })
        })
    },

    createAccount: ({ commit }, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
            instance.post('/signup', userInfos,

                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                .then(function (response) {
                    commit('setStatus', 'created');
                    window.alert("Utilisateur créé, vous allez être redirigé vers la page de connection")
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_create');
                    reject(error);
                })
        })
    },
    getUserProfile: ({commit}) => {
        instance.get('/users/userProfile/${params.id}')
          .then(function (response) {
            commit('userInfos', response.data);
          })
          .catch(function (error) {
            commit('setStatus', 'error_get_profile');
            reject(error)
          })
      },
    UpdateProfile: ({ commit }, userInfos) => {
        commit('setStatus',)
    }
}
