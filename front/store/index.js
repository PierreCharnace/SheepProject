const axios = require('axios');


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/auth/'
});


let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

export default {
    state: { 
        user,
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
      
}