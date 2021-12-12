<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title router-link="/home">Home</ion-title>
        <ion-title router-link="/mangas">Mangas</ion-title>
        <ion-button router-link="/login">Login</ion-button>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>

<script lang="ts">
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Mangas',
  components: {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});
</script>

