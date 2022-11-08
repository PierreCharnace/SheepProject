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
        >
          <v-icon
            dark
          > mdi-cancel
          </v-icon> Se déconnecter
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
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
      to: '/'
    }
  },
  methods: {
    logout: function () {
      if (confirm("vous allez être déconnecté")) {
        this.$store.commit('userInfos/logout');
        this.$router.push('Login')
        return;
      }
    }
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