<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <h1 v-if="mode == 'login'">Connection</h1>
            <h1 v-else>Inscription</h1>
            <p v-if="mode == 'login'">
              Vous n'avez pas encore de compte?
              <span class="createAndLogin" @click="switchTocreateAccount()"
                >Créer un compte</span
              >
            </p>
            <p v-else>
              Vous avez déjà un compte?
              <span class="createAndLogin" @click="switchToLogin()"
                >Se connecter</span
              >
            </p>
            <v-text-field
              v-if="mode === 'create'"
              v-model="object.lastName"
              color="purple darken-2"
              label=" Nom"
              required
              :rules="[rules.lastName]"
            />
            <v-text-field
              v-if="mode === 'create'"
              v-model="object.firstName"
              color="purple darken-2"
              label="Prénom"
              required
              :rules="[rules.firstName]"
            ></v-text-field>
            <v-text-field
              v-model="object.email"
              color="purple darken-2"
              label="Email"
              required
              :rules="[rules.email]"
            /> <small v-if="mode=='create'" id="emailErr"></small>
            <v-text-field
              v-model="object.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="purple darken-2"
              counter
              label="Mot de passe"
              max="8"
              min="4"
              required
              :rules="[rules.password]"
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-if="mode === 'create'"
              v-model="passwordConfirm"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="purple darken-2"
              counter
              label="Confirmer mot de passe"
              max="8"
              min="4"
              required
              :rules="[rules.password]"
              @click:append="show1 = !show1"
            />
            <small v-if="!validatePassword && mode ==='create'">
              Mot de passe saisie incorrect
            </small>
          </v-col>
          <v-col cols="12" sm="6"> </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn @click="cancel()" text> annuler </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="mode == 'create'"
          @click="createAccount()"
          text
          color="primary"
        >
          S'enregistrer
        </v-btn>
        <v-btn
         v-else 
         @click='login()' 
         text color="primary"
         > 
         Connection 
         </v-btn>
      </v-card-actions>
    </v-form>

    <v-dialog width="70%"> </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      loadArticlePage: '/pages/Article',
      passwordConfirm: '', 
      object: this.initObject(),
      mode: "create",
      show1: false,
      rules: {
        email: (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return (pattern.test(v) || "Email non valide");
        },
        password: (v) => {
          const passwordPattern = /^(?=.*\d).{4,10}$/;
          return passwordPattern.test(v) || 'Le mot de passe doit être compris entre 4 et 8 caractères et posséder un chiffre';
        }, 
        firstName: (v) => { 
          const patternFirstName = /^(?=[a-zA-Z]).{2,20}$/;
          return (patternFirstName.test(v) || 'Prénom non conforme il doit être compris entre 2 et 20 caractères');
        },
        lastName: (v) => {
           const patternLastName = /^(?=[a-zA-Z]).{2,30}$/ ;
           return   (patternLastName.test(v) || 'Nom non conforme il doit être compris entre 2 et 30 caractères');
        },
      },
      pages: [],
    };
  },
  mounted() {},
  computed: {
    validatePassword: function () {
      if (this.passwordConfirm == this.object.password) return true;
      return false;
    },
  },
  methods: {
    switchTocreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    cancel() {
      this.$refs.form.resetValidation();
      this.object = this.initObject();
      this.passwordConfirm;
    },
    createAccount: function () {
      const self = this;
      if (!this.$refs.form.validate())
       return
          this.$store.dispatch("userInfos/createAccount", this.object
          ).then(function (response) {
          //Don't forget the modal!!!!!!!!!!!!!!!!!!
          self.mode = "login"
          console.log(response);
          }).catch(function (error) {
            console.log(error);
            return emailErr.innerHTML = "Email déjà utilisé" 
           /*   if (error.code = "ERR_BAD_RESPONSE" ) {
            emailErr.innerHTML = "Email déjà utilisé"
          };*/
          });
          
    },
       login: function () {
         const self = this;
        this.$store.dispatch("userInfos/login", {
        email: this.object.email,
        password: this.object.password
      }).then(function (response) {
        console.log(self.loadArticlePage);
        //$route.push(self.loadArticlePage)
        nuxt.$router.push('/Article')//need router who push ////////////
      }).catch(function (error) {
        console.log(error);
      });
    },

    initObject() {
      return {
        lastName: "",
        firstName: "",
        password: "",
                email: null,

      };
    },
  },
  head() {
    return {
      title: "Inscription",
      titleTemplate: "",
      meta: [
        {
          hid: "Inscription",
          name: "Inscription",
          content: "Inscription",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.disabled {
  color: grey !important;
  pointer-events: none;
}
.createAndLogin {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}
.createAndLogin:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
#emailErr {
  color: red;
}
</style>
