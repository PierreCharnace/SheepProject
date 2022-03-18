<template>
<v-col>
    <v-card elevation="22">
        <v-card-title >
            Créer un compte
        </v-card-title>
        <v-input class="pl-4">
            <input type="text" placeholder="email">
        </v-input>
        <v-input class="pl-4">
            <input type="text" placeholder="mdp">
        </v-input>
        <v-input class="pl-4">
            <input type="text" placeholder="mdpverif">
        </v-input>
        <v-input class="pl-4">
            <input type="text" placeholder="nom">
        </v-input>
        <v-input class="pl-4">
            <input type="text" placeholder="prénom">
        </v-input>
    </v-card>
</v-col>
    
</template>

<script>
    export default {
        name : 'Login',
        data: function () {
            return {

                mode: 'login',
            }
        },
        methods: {
            switchCreate: function () {
                this.mode = 'create';
            },
            switchLogin: function () {
                this.mode = 'login'
            }
        }

    }
</script>