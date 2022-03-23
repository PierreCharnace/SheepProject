<template >
    <v-card flat>

      <v-form
        ref="form"
        @submit.prevent="submit"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
            <p v-if="mode =='login' "> Vous n'avez pas encore de compte? <a  @click="switchTocreateAccount()">Créer un compte</a></p>
            <p v-else > Vous avez déjà un compte? <a  @click="switchToLogin()">Se connecter</a></p>
              <v-text-field
                v-model="lastName"
                color="purple darken-2"
                label=" Nom"
                required
                v-if=" mode === 'create'"
              ></v-text-field>
               <v-text-field
                v-model="firstName"
                color="purple darken-2"
                label="Prénom"
                required
                v-if=" mode === 'create'"
              ></v-text-field>
               <v-text-field
               v-model="email"
                color="purple darken-2"
                label="Email"
                required
              ></v-text-field>
               <v-text-field
                color="purple darken-2"
                label="password"
                required
                type="password"
                v-model="firstPassword"
                
              ></v-text-field>
               <v-text-field
                color="purple darken-2"
                label="password"
                required
                type="password"
                v-model="passwordConfirme"
                v-if=" mode === 'create'"
              ></v-text-field>
              <small v-if="firstPassword !== passwordConfirme"
              > Mot de passe saisie incorrect
              </small>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              
            </v-col>

          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
          
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
            <v-btn 
            v-if="mode == 'create'"
            class="disabled"
            disabled
            text
            color="primary"
          >
            S'enregistrer
          </v-btn>
           <v-btn
            v-else
           @click="createAccount"
            class="enabled"
            text
            color="primary"
            type="submit"
          >
            S'enregistrer
          </v-btn>
          <v-btn 
          v-if="mode == 'login'"
          text
          color="primary">
            Connection
          </v-btn>
        </v-card-actions>
      </v-form>
   
      <v-dialog

        width="70%"
      >
  
      </v-dialog>
    </v-card>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      mode: 'create',
      email: '',
      lastName: '',
      firstName: '',
      firstPassword : 'firstPassword',
      passwordConfirme: 'passwordConfirme'
    }
  },
  computed: {
    validatesFields: function () {
      if (this.mode == 'create') {
        
        if ( this.email != '' && this.lastName != '' && this.firstName !='' && this.firstPassword!='' && this.passwordConfirme !='')
        {
          return true;
        }  else {
          return false;
        }
      } else {
        if (this.email != '' && this.firstPassword != '') {
          return true
        } else {
          return false
        }
      }

    }
  },
  methods: {  // create account or login mode
    switchTocreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
   createAccount: function () {
     console.log(this.email, this.lastName, this.firstName, this.passwordConfirme, this.firstPassword);
   }
  }
}
    
</script>