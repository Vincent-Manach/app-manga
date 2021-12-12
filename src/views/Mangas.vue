<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-button router-link="/home">Home</ion-button>
        <ion-button router-link="/mangas">Mangas</ion-button>
        <!-- <ion-button router-link="/login">Login</ion-button> -->
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="false">    
      <div id="container">
        <strong>Hello there ! There is so mangas</strong>
        <MangasList />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

import MangasList from '@/components/mangas/MangasList.vue'

export default defineComponent({
  name: 'Mangas',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButton,
    MangasList
  }
});
</script>

<style scoped>

ion-toolbar {
    display: flex;
    text-align: center;
}

#container {
  text-align: center;
  background-color: black;
  position: absolute;
  left: 0;
  right: 0;
  top: 200%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>