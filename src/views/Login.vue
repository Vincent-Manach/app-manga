<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-button router-link="/home">Home</ion-button>
        <ion-button router-link="/mangas">Mangas</ion-button>
        <ion-button router-link="/login">Login</ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">    
      <div id="container">
        <div class="logo">
          <!-- <img src="../../../public/assets/img/logotest.png" alt="logo"> -->
        </div>
        <div id="login">
          <h1>Le nom de l'app</h1>
          <h2>Connectez-vous</h2>
          <div id="logPart">
            <input type="text" name="username" id="username" placeholder="USERNAME">
            <br/><br/>
            <input type="password" name="password" id="password" placeholder="PASSWORD">
            <br/><br/>
            <!-- <button v-on:click="checkAuth()" id="logBtn">SE CONNECTER</button> -->
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
// import axios from 'axios';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButton
  },
  methods: {
    // checkAuth() {
    //   var currentUsername = username.value;
    //   var currentPassword = password.value;
    // }
  }
});

// const username = document.getElementById('username') as HTMLInputElement;
// const password = document.getElementById('password') as HTMLInputElement;

</script>

<style scoped>

ion-toolbar {
  display: flex;
  text-align: center;
}

#container {
  text-align: center;
  
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