<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-btn @click="cancel()">cancel</v-btn>
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
              :rules="[(v) => !!v || 'Nom incorrect']"
            />
            <v-text-field
              v-if="mode === 'create'"
              v-model="object.firstName"
              color="purple darken-2"
              label="Prénom"
              required
              :rules="[(v) => !!v || 'Prénom incorrect']"
            ></v-text-field>
            <v-text-field
              v-model="object.email"
              color="purple darken-2"
              label="Email"
              required
              :rules="[rules.email]"
            />
            <v-text-field
              v-model="object.firstPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="purple darken-2"
              counter
              label="Mot de passe"
              max="8"
              min="4"
              required
              :rules="[(v) => !!v || 'Le mot de passe n\'a pas le bon format.']"
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-if="mode === 'create'"
              v-model="object.passwordConfirme"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="purple darken-2"
              counter
              label="Confirmer mot de passe"
              max="8"
              min="4"
              required
              :rules="[(v) => !!v || 'Mot de passe incorrect']"
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
          v-if="mode == 'create'"
          @click="createAccount()"
          text
          color="primary"
        >
          S'enregistrer
        </v-btn>
        <v-btn v-else type="submit" text color="primary"> Connection </v-btn>
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
      object: this.initObject(),
      mode: "create",
      show1: false,
      rules: {
        email: (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Email non valide";
        },
      },
    };
  },
  mounted() {},
  computed: {
    validatePassword: function () {
      if (this.passwordConfirme === this.firstPassword) return true;
      return false;
    },
  },
  methods: {
    cancel() {
      this.$refs.form.resetValidation();
      this.object = this.initObject();
    },
    createAccount: function () {
      if (!this.$refs.form.validate()) return;
      this.$store.dispatch("userInfos/createAccount", this.object);
    },
    initObject() {
      return {
        email: null,
        lastName: "",
        firstName: "",
        firstPassword: "",
        passwordConfirme: "",
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
</style>
