const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});

export default {
    state: { 
      user: JSON.parse(localStorage.getItem('user')),
        status:'',
        userInfos: {
          email: '',
          password: '',
          lastName: '',
          firstName: '',
          imageUrl: '',
          isAdmin: false,
          isModo: false,
          date: '',
          undisplay: '',
        },
        User: {
          lastName:'',
          firstName:'',
          isModo:'',
          isAdmin:'',
          imageUrl:'', 
        },
        log: console.log('-------------------->',JSON.parse(localStorage.getItem('user'))),  
    },
    computed: {
      stateId () {
        return this.user  
      }
    }
}