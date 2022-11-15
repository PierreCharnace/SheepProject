const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});

export default {
    state: { 
        user:'',
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
    },
    methods: {
        
    },
}