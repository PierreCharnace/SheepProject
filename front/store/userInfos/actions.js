const axios = require('axios');


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});
export default {

    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
        instance.post('/login', userInfos,

      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(function(response) {
        commit('setStatus', '');
        commit('logUser', response.data);
       // resolve(response);
        window.alert("Vous êtes maitenant connectés")
      })
      .catch(function (error) {
        commit('setStatus', 'error_login');
       // reject(error);
        window.alert("Erreur d'identifiant")
  
      })
    },

    createAccount: ({commit}, userInfos) => {
        commit('setStatus', 'loading');
        instance.post('/signup', userInfos,

      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(function(response) {
        commit('setStatus', 'created');
//resolve(response);
        window.alert("Utilisateur créé, vous allez être redirigé vers la page de connection")
      })
      .catch(function (error) {
        commit('setStatus', 'error_create');
   //     reject(error);
        window.alert("Adresse mail déjà utilisée! Veuillez en choisir une nouvelle.")
  
      })
      }
    
}