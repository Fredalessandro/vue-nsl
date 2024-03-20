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
import { IonButton,IonLabel,IonPage,IonContent} from '@ionic/vue';
import { useRouter } from 'vue-router';
import store from '../../store';

export default {
    components: {
        IonButton,IonLabel,IonPage,IonContent
    },
    data() {
        return {

            router: useRouter(), // get a reference to our vue router   
        }
    },
    methods: {
        async handleSignOut() {
            await this.$store.dispatch('signOut',{user:null,diretor:null})
                .then(() => {
                    this.$router.replace('/login'); // redirect to the feed
                }).catch(error => {
                    console.error('Error add data:', error);
                    alert(error.message);
                });
        },
        handleCancel() {
            try {
                router.push(''); // Redirect to the login page
            } catch (error) {
                console.error('Error signing out:', error);
            }
        }
    }
}
</script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>