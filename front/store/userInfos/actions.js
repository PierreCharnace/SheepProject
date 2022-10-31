const axios = require('axios');


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});
export default {

    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise ((resolve, reject) =>{
      instance.post('/login', userInfos,

      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(function(response) {
        commit('setStatus', 'logged');
        commit('logUser', response.data);
        window.alert("Vous êtes maitenant connectés, je vous mets sur la page des articles")
       // to:"/Article"
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

    createAccount: ({commit}, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
          instance.post('/signup', userInfos,

        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        })
        .then(function(response) {
          commit('setStatus', 'created');
          window.alert("Utilisateur créé, vous allez être redirigé vers la page de connection")
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
      })
    })
      }
    
}