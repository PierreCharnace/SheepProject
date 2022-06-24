const axios = require('axios');


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});
export default {

  const store =  createStore({
      state: {
        status: '',
        user: '',
      }
  })



    createAccount: ({commit}, userInfos) => {
        commit('setStatus', 'loading');
        instance.post('/signup', userInfos,

      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(function(response) {
        commit('setStatus', 'loggedIn');
        resolve(response);
        window.alert("Utilisateur créé, vous allez être redirigé vers la page de connection")
      })
      .catch(function (error) {
        commit('setStatus', 'error_login');
        reject(error);
        window.alert("Adresse mail déjà utilisée! Veuillez en choisir une nouvelle.")
  
      })
      }
    
}