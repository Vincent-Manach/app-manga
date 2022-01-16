<template>
    <ion-header class="navigation" :translucent="true">
      <ion-toolbar>
        <ion-button router-link="/home">
          <ion-icon name="home-outline"></ion-icon>
          Home
        </ion-button>
        <ion-button router-link="/mangas">
          <ion-icon class="icon icon-md ion-null-book-outline" name="book-outline"></ion-icon>
          Mangas
        </ion-button>
        <ion-button router-link="/myLists">
          <ion-icon class="icon icon-md ion-null-book-outline" name="book-outline"></ion-icon>
          My Lists
        </ion-button>
        <!-- <ion-button v-if="logged=true" fill="outline" router-link="/profile">
          <ion-icon name="person-circle-outline"></ion-icon>
          My Profile
        </ion-button> -->
        <ion-button fill="outline" router-link="/login">
          <ion-icon name="person-circle-outline"></ion-icon>
          Login
        </ion-button>
      </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { IonHeader, IonButton, IonToolbar, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  components: {
    IonHeader,
    IonIcon,
    IonButton,
    IonToolbar,
  }
});
</script>

<style scoped>
ion-toolbar {
    display: flex;
    text-align: center;
}

ion-icon {
  color: red !important;
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

