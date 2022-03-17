<template>

<v-card>
    <v-card-title>
        Créer un compte
    </v-card-title>
    <v-input class="tw-bg-white tw-text-black">
        <input type="text" placeholder="email" class="tw-text-black">
        <input type="text" placeholder="mdp">
        <input type="text" placeholder="mdpverif">
        <input type="text" placeholder="nom">
        <input type="text"
        placeholder="prénom">
    </v-input>
</v-card>
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