const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});

export default () => ({
      user:{ /*JSON.parse(localStorage.getItem('user'))*/
        token:'',
        userId:'',
      },
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
})