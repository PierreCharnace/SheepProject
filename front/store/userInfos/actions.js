const axios = require('axios');


export default {

    createAccount: ({commit}, userInfos) => {
        axios.post('http://localhost:8000/api/auth/signup',{ 
        email : userInfos.email,
        firstName : userInfos.firstName,
        lastName : userInfos.lastName,
        password: userInfos.password 
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then(function(response) {
      window.alert("Utilisateur créé, vous allez être redirigé vers la page de connection")
    })
    .catch(function (error) {
     window.alert("Adresse mail déjà utilisée! Veuillez en choisir une nouvelle.")

    })
    }
}