<!-- <template>
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
        <ion-button v-if="logged === 'logged'" fill="outline" router-link="/profile">
          <ion-icon name="person-circle-outline"></ion-icon>
          My Profile
        </ion-button>
        <ion-button fill="outline" router-link="/login">
          <ion-icon name="person-circle-outline"></ion-icon>
          Login
        </ion-button>
      </ion-toolbar>
    </ion-header>
</template> -->
<template>

<!--Floating buttons -->
  <ion-fab vertical="start" horizontal="start">
    <ion-fab-button>
      <ion-icon id="settingsIcon" :icon="settingsOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="end">
      <ion-fab-button><ion-icon :icon="logoTwitter"></ion-icon></ion-fab-button>
      <ion-fab-button><ion-icon :icon="logoInstagram"></ion-icon></ion-fab-button>
    </ion-fab-list>
  </ion-fab>

  <ion-fab id="profileFab" vertical="start" horizontal="end">
    <ion-fab-button tab="login" href="/login">
      <ion-icon :icon="personCircleOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <ion-fab id="profileFab" vertical="start" horizontal="end">
    <ion-fab-button tab="login" href="/login">
      <ion-icon :icon="personCircleOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>

<!--Bottom nav -->
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar>
      <ion-tab-button tab="home" href="/home">
        <img src="../../public/assets/img/home.svg" width="32"/>
        <ion-label>Home</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="search" href="/search">
        <ion-icon :icon="searchOutline"></ion-icon>
        <ion-label>Search</ion-label>
      </ion-tab-button>
      <ion-tab-button v-if="logged" tab="profile" href="/profile">
        <img src="../../public/assets/img/profile.svg" width="35"/>
        <ion-label>Profile</ion-label>
      </ion-tab-button>
      <!-- <ion-tab-button tab="lists" href="/mylists">
        <img src="../../public/assets/img/lists.svg" width="30"/>
        <ion-label>My Lists</ion-label>
      </ion-tab-button> -->
      <ion-tab-button tab="login" href="/login">
        <img src="../../public/assets/img/profile.svg" width="35"/>
        <ion-label>Login</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonFab, IonFabButton, IonFabList, IonRouterOutlet, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
// import axios from 'axios';

import {
  logoFacebook, 
  logoInstagram, 
  logoTwitter, 
  logoVimeo,
  personCircleOutline,
  searchOutline,
  settingsOutline,
  share
} from 'ionicons/icons';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      logged: true,
    }
  },
  components: {
    IonTabs,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonFab, 
    IonFabButton, 
    IonFabList,
    IonRouterOutlet,
    IonIcon
  },
  setup() {
    return {
      logoFacebook, 
      logoInstagram, 
      logoTwitter, 
      logoVimeo, 
      personCircleOutline,
      searchOutline,
      settingsOutline,
      share
    }
  },
  methods: {
    // async checkStorage() {
    //   await localStorage.getItem
    // }
  },
  mounted() {
    if (localStorage.getItem('log') === 'LogOn') {
      console.log(localStorage.getItem('log'))
    }
    // axios.get('https://api.mangadex.org/auth/check', {
    //   headers: {
    //     'Authorization':`Bearer ${token}`
    //   }
    // })
    // .then(res => {
    //   console.log(res.data.data)
    //     // this.user = res.data.data
    //     // console.log(this.user)
    // })
    // .catch(err => {
    //     console.error(err);
    // });
  }
});
</script>

<style scoped>
ion-searchbar {
  padding: 8px 8px 8px 100px;
  z-index: 5;
}

ion-toolbar {
    display: flex;
    text-align: center;
}

ion-fab {
  top: 10px;
}

ion-icon {
  font-size: 35px;
  color: white !important;
}

ion-icon#settingsIcon {
  font-size: 30px;
}

ion-tabs {
  z-index: 1 !important;
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

