<template>
  <ion-page>    
    <ion-content :fullscreen="false">    
      <div id="container">
        <strong>Hello there ! There is some mangas</strong>
        <MangasList/>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

import MangasList from '@/components/mangas/MangasList.vue';


export default defineComponent({
  name: 'Mangas',
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    // IonButton,
    MangasList,
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
  position: relative;
  left: 0;
  right: 0;
  padding-top: 100px;
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