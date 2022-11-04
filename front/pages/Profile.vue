<template>
    <div>
        <v-card class="mx-auto" elevation="7" shaped max-width="400">
            <form>
                <v-card-title >Page de Profil</v-card-title>
                <div class="d-flex justify-center">
                <v-avatar
                        color="teal"
                        size="65"
                >IP</v-avatar>
                </div>
                <v-list-item class="red">                    
                    <v-list-item-content class="d-flex justify- flex-column green">
                        <v-text-field placeholder="Dugenoux" label="Nom"/>
                        <v-text-field placeholder="Robert" label="Prénom"/>
                        <v-text-field placeholder="aaa@aaa.fr" label="Email"/>
                    </v-list-item-content>
                </v-list-item>
            </form>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        rounded
                        text
                    >
                        Enregister mes informations
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
<!--
        <v-card elevation="7" shaped max-width="80%">
            <v-card-title>Page de Profil</v-card-title>
            <v-avatar
                color="teal"
                size="56"
                >IP</v-avatar>
            <v-input placeholder="nom"/>
            <v-label>Nom</v-label>
            <v-input placeholder="Prénom"/>
            <v-label>Prénom</v-label>
            <v-input />
            <v-label>Email</v-label>
            <v-input />
            <v-label></v-label>
        </v-card> -->
    </div> 
</template>

<script>
</script>
