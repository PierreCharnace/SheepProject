const axios = require('axios');


export default {

    createAccount: ({commit}, userInfos) => {
        axios.post('http://localhost:8000/api/auth/signup',{ 
<<<<<<< HEAD
        email : userInfos.email,
        firstName : userInfos.firstName,
        lastName : userInfos.lastName,
        password: userInfos.password 
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
=======
        email : 'email',
        firstName : 'firstName',
        lastName : 'latName',
        password: 'password' 
>>>>>>> 4a2f111... yohou
    })
    .then(function(response) {
        console.log('15----->', response)
    })
    .catch(function (error) {
<<<<<<< HEAD
        console.log('18----->', error);
=======
        console.log(error.response.data, userInfos);
>>>>>>> 4a2f111... yohou
    })
    }
}