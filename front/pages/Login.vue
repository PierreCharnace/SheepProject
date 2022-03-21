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

                color="purple darken-2"
                label=" Nom"
                required
              ></v-text-field>
               <v-text-field

                color="purple darken-2"
                label="Prénom"
                required
              ></v-text-field>
               <v-text-field
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
        
            text
            color="primary"
            type="submit"
          >
            Register
          </v-btn>
            <v-btn
          
            text
            color="primary"
            type="submit"
          >
            Register
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
      mode: 'login',
      password : 'passwordConfirm',
      passwordconf: 'firstPassword'
    }
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
   switchToLogin: function () {
      this.mode = 'login';
   }
  }
}
    
</script>