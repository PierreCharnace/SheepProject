<template >
    <v-card flat>
      <v-snackbar
      
        absolute
        top
        right
        color="success"
      >
        <span>Registration successful!</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
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
              <v-text-field

                color="purple darken-2"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field

                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
                  <v-text-field

                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
                  <v-text-field

                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
                  <v-text-field

                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">

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
            @click="resetForm"
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
        </v-card-actions>
      </v-form>
   
      <v-dialog

        width="70%"
      >
  
      </v-dialog>
    </v-card>
</template>

<script>
    
</script>