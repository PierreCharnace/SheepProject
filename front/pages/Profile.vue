<template>
    <div>
        <v-card v-if="mode === 'Infos'" class="mx-auto pb-3" elevation="7" shaped max-width="400">
            <form>
                <v-card-title class="d-flex justify-center">Page de Profil</v-card-title>
                <div class="d-flex justify-center">
                <v-avatar
                        color="teal"
                        size="65"
                >IP</v-avatar>
                </div>
                <v-list-item class=""><!--Current infos-->    
                    <v-list-item-content class="d-flex flex-column">
                        <v-text-field v-model="user.firstName" disabled placeholder="youhou" label="Prénom" color="purple darken-2"/>
                        <v-text-field v-model="user.lastName" disabled placeholder="Robert" label="Nom" color="purple darken-2"/>
                        <v-text-field v-model="user.email" disabled placeholder="aaa@aaa.fr" label="Email" color="purple darken-2"/>
                    </v-list-item-content>
                </v-list-item>
            </form>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        rounded
                        text
                        @click="switchToModifyInformations()"
                    >
                    <v-icon class="ma-2" title="modifier">mdi-pencil</v-icon>
                        Modifier mes informations
                    </v-btn>
                </v-card-actions>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        rounded
                        text
                    >
                    <v-icon class="ma-2" title="effacer">mdi-delete</v-icon>
                        Effacer mon profil
                    </v-btn>
                </v-card-actions>
        </v-card>
        <v-card v-if="mode === 'modifyInfos'" class="mx-auto" elevation="7" shaped max-width="400">
            <form>
                <v-card-title class="d-flex justify-center">Page de Profil</v-card-title>
                <div class="d-flex justify-center">
                <v-avatar
                        color="teal"
                        size="65"
                >IP</v-avatar>
                </div>
                <v-list-item class=""><!--Modify infos-->                    
                    <v-list-item-content class="d-flex flex-column">
                        <v-text-field v-model="user.firstName" placeholder="youhou" label="Prénom" color="purple darken-2"/>
                        <v-text-field v-model="user.lastName" placeholder="Robert" label="Nom" color="purple darken-2"/>
                        <v-text-field v-model="user.email" placeholder="aaa@aaa.fr" label="Email" color="purple darken-2"/>
                    </v-list-item-content>
                </v-list-item>
            </form>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        rounded
                        text
                        @click="switchToInformations()"
                    >
                        Enregistrer mes informations
                    </v-btn>
                </v-card-actions>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        rounded
                        text
                    >
                        Effacer votre profil
                    </v-btn>
                </v-card-actions>
        </v-card>
    </div> 
</template>

<script>
export default {
    name: "profile",
    data: function () {
      return {
        mode: "Infos",
        user: {
               firstName:'',
               lastName:'',
               email:'',
               password:'',
               imageUrl:null,   
              } ,
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
     }
    },
    mounted:function () {
      /*      console.log(this.$store.dispatch("userInfos/getUserInfos"));
        if (this.$store.state.user.token == '') {
            this.$router.push('/login').catch(()=>{});
            console.log(this.$store.state.user.token);
            return ;
        } 
            this.$store.dispatch('getUserInfos');
*/
        if (localStorage.email) {
            this.user.email = JSON.parse(localStorage.getItem('email'));
        }
    },
    state: {
        user:{ /*JSON.parse(localStorage.getItem('user'))*/
        token:'',
        userId:'',
      },
    },
    computed:{
    //  ...mapState(['coins']),
    },
    methods: {
        switchToModifyInformations: function () {
            this.mode = "modifyInfos";
        },
        switchToInformations: function () {
            this.mode = "Infos";
        },

        updateProfile: function () {
                let userToken = localStorage.getItem('user');
                userToken = JSON.parse(userToken)

                {  axios.put("http://localhost:3000/api/users/userProfile", {
                        
                        lastName : this.user.lastName,
                        firstName: this.user.firstName,

                    },
                    {
                        headers: {
                            Authorization: "Bearer " + userToken.token
                        }
                    }).then (response => {
                        window.alert("Modifications effectuées")
                        this.$router.go()

                    }).catch(function (error) {
                        if (error == "Error: Request failed with status code 400") {
                            window.alert('Il y a un soucis avec les informations saisies!')
                        }
                        
                    })
                }
        
            },
    }

}

</script>