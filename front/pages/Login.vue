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
              v-model="lastName"
              color="purple darken-2"
              label=" Nom"
              required
              v-if="mode === 'create'"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              color="purple darken-2"
              label="Prénom"
              required
              v-if="mode === 'create'"
            ></v-text-field>
            <v-text-field
              v-model="email"
              color="purple darken-2"
              label="Email"
              required
            /> <!--<small v-if="!validateEmail">
              "Email saisie incorrect"
            </small>-->
            <v-text-field
              v-model="firstPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="purple darken-2"
              counter
              label="Mot de passe"
              max="8"
              min="4"
              required
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
              @click:append="show1 = !show1"
            />
            <small v-if="!validatePassword">
              Mot de passe saisie incorrect
            </small>
          </v-col>
          <v-col cols="12" sm="6"> </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text> annuler </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="createAccount()"
          :class="{ disabled: !validatesFields }"
          v-if="mode == 'create'"
          text
          color="primary"
        >
          S'enregistrer
        </v-btn>
        <v-btn
          @click="login()"
          type="submit"
          :class="{ disabled: !validatesFields }"
          v-else
          text
          color="primary"
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
      mode: "create",
      email: "",
      lastName: "",
      firstName: "",
      firstPassword: "",
      passwordConfirm: "",
      show1: false,
    };
  },

  mounted() {},
  computed: {
    validatesFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.lastName != "" &&
          this.firstName != "" &&
          this.firstPassword != "" &&
          this.passwordConfirm != "" &&
          this.validatePassword == true
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.firstPassword != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    validatePassword: function () {
      if (this.passwordConfirm === this.firstPassword) {
        return true;
      } else {
        return false;
      }
    },
 
  },
  methods: {
    // create account or login mode
    switchTocreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      this.$store.dispatch("userInfos/login", {
        email: this.email,
        password: this.passwordConfirm
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error);
      });
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch("userInfos/createAccount", {
        email: this.email,
        lastName: this.lastName,
        firstName: this.firstName,
        password: this.passwordConfirm,
        
      }).then(function (response) {
          //Ne pas oublier la modal!!!!!!!!!!!!!!!!!!
          self.mode = "login"
          console.log(response);
      }).catch(function (error) {
          console.log(error);
      });
    },
  },

  head() {
    return {
      title:'Inscription',
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

header,
h2 {
  margin-bottom: 20px;
}
.modal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>