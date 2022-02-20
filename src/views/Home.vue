<template>
  <ion-page>    
    <ion-content :fullscreen="false">    
      <div id="container">
        <!-- <strong>Welcome to Manga Manach</strong>
        <p>(Nom provisoire)</p> -->

        <ion-button router-link="/mangas">Voir les mangas</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  methods: {
    // refreshPage() {
    //   let executed = false;
    //   if (!executed && localStorage.getItem('log') == 'logged') {
    //     executed = true;
    //     console.log('hello')
    //     window.location.reload()
    //   }
    // }
  },
});
</script>

<style scoped>

ion-toolbar {
  display: flex;
  text-align: center;
}

#container {
  text-align: center;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
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