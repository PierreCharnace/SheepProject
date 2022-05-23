const axios = require('axios').default;


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
        console.log('15----->', response)
    })
    .catch(function (error) {
        console.log('18----->', error);
    })
    }
}