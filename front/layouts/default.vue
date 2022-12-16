<template>
  <v-app class="dark">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="d-flex mb-6 justify-"
      flat
      tile
    >
        <v-app-bar-nav-icon class="pa-2" tile @click.stop="drawer = !drawer"/>
        <v-toolbar-title class="pa-2 ml-auto" tile v-text="title" />
        <v-btn
          class="ma-2 pa-2"
          tile
          dark
          rounded 
          @click="logout()"
          v-if="modeUser === 'connected'"
        >
          <v-icon
            dark
          > mdi-cancel
          </v-icon>Déconnexion
        </v-btn>
     <!-- <v-spacer />-->
    </v-app-bar>
    <v-main class="bg ">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy;  {{ date() }} </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return { 
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-tractor',
          title: 'Lire un article',
          to: '/Article'
        },
        {
          icon: 'mdi-sheep ',
          title: 'Discussion',
          to: '/Discussion'
        },
         {
          icon: 'mdi-greenhouse ',
          title: "Se connecter/S'incrire",
          to: '/Login'
        },
        {
          icon: 'mdi-head',
          title: "Profile",
          to: '/Profile'
        },
           {
          icon: 'mdi-greenhouse ',
          title: "Accueil",
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lacaune',
      to: '/',
      modeUser: 'disconnected' ,
    }
  },
  mounted() {
    console.log('kikou',localStorage.getItem('user'));
    if (JSON.parse(localStorage.getItem('user')) === null) {
     return this.modeUser = 'disconnected'
    } else {
      return this.modeUser = 'connected'
    }
    
   // console.log('kikou',user.userId);
   /* if (user.userId != '') {
      this.modeUser = 'connected'
    };*/
  },
  methods: {

    date: function () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const withSlashes = [day,month,year ].join('/');
      return withSlashes
    },

    logout: function () {
      if (confirm("vous allez être déconnecté")) {
        this.$store.commit('user/logout');
        this.$router.push('Login');
        this.modeUser = 'disconnected';
        return;
      }
    },
   /*
    getBackUser: function () {
    /* if (localStorage.getItem('user') == " ") {
       return ''
     } else{
       return localStorage.getItem('user')
     } 
     let user = localStorage.getItem('user');
     user = (JSON.parse(user) == '' ? 'nop' : JSON.parse(user)) ;
     const userId = user.userId;
     console.log('user----->',user);
     return console.log('//////////////', `${userId == 'dfdfdfd' ? 'nop' : 'ok'}`);
      return (userId == 'nop' ? 'nop' : 'ok')
    }*/
  }
}
</script>
<style scoped lang="scss">
 .bg {
   width: 100%;
   height: 100%;
   background: url(../assets/tree.jpg);
 }
</style>