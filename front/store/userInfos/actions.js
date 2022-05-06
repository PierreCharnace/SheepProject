const axios = require('axios').default;


export default {

    createAccount: ({commit}, userInfos) => {
        commit;
        axios.post('http://localhost:8000/api/auth/signup',{ 
        email : 'email',
        firstName : 'firstName',
        lastName : 'lastName',
        password: 'password' 
    })
    .then(function(response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    })
    }

}