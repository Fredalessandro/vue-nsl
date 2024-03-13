<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-label>Deseja sair do sistema?</ion-label>
            <ion-button @click="handleSignOut">Sim</ion-button>
            <ion-button @click="handleCancel">Não</ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue'; // Import your Firebase authentication instance
import { useRouter } from 'vue-router';
import store from '../../store/index.js';
export default defineComponent({
    components: {
        IonButton,
    },
    data() {
        return {

            router: useRouter(), // get a reference to our vue router   
        }
    },
    methods: {
        async handleSignOut() {
            await this.$store.dispatch('signOut')
                .then(() => {
                    this.router.push('/login'); // redirect to the feed
                }).catch(error => {
                    console.error('Error add data:', error);
                    alert(error.message);
                });
        },
        async handleCancel() {
            try {
                router.push('/'); // Redirect to the login page
            } catch (error) {
                console.error('Error signing out:', error);
            }
        },
    },
});
</script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>