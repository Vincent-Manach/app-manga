<template>
  <!-- <div id="headerCard"> -->
<!--Floating buttons -->
  <!-- <ion-fab vertical="start" horizontal="start">
    <ion-fab-button>
      <ion-icon id="settingsIcon" :icon="settingsOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="end">
      <ion-fab-button><ion-icon :icon="logoTwitter"></ion-icon></ion-fab-button>
      <ion-fab-button><ion-icon :icon="logoInstagram"></ion-icon></ion-fab-button>
    </ion-fab-list>
  </ion-fab> -->
  <div class="header">
    <h1>Mang'App</h1>

    <ion-fab v-if="logged == false" id="profileFab" vertical="start" horizontal="end">
      <ion-fab-button color="light" tab="login" href="/login">
        <ion-icon :icon="logInOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-fab v-if="logged == true" id="profileFab" vertical="start" horizontal="end">
      <ion-fab-button color="light" tab="login" @click="logout">
        <ion-icon :icon="logOutOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>

<!--Bottom nav -->
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar>
      <ion-tab-button tab="home" href="/home">
        <ion-icon :icon="homeOutline"></ion-icon>
        <ion-label>Home</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="search" href="/search">
        <ion-icon :icon="searchOutline"></ion-icon>
        <ion-label>Search</ion-label>
      </ion-tab-button>
      <ion-tab-button v-if="logged == true" tab="profile" href="/profile">
        <ion-icon :icon="personCircleOutline"></ion-icon>
        <ion-label>Profile</ion-label>
      </ion-tab-button>
      <!-- <ion-tab-button v-if="logged == true" tab="lists" href="/mylists">
        <img src="../../public/assets/img/lists.svg" width="30"/>
        <ion-label>My Lists</ion-label>
      </ion-tab-button> -->
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonFab, IonFabButton, IonRouterOutlet, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user.store';
import axios from 'axios';

import {
  logoFacebook, 
  logoInstagram, 
  logoTwitter, 
  logoVimeo,
  personCircleOutline,
  searchOutline,
  homeOutline,
  logInOutline,
  logOutOutline,
  // settingsOutline,
  share
} from 'ionicons/icons';

export default defineComponent({
  name: 'Header',
  props: {
    user: Object
  },
  data() {
    return {
      logged: false,
    }
  },
  components: {
    IonTabs,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonFab, 
    IonFabButton, 
    // IonFabList,
    IonRouterOutlet,
    IonIcon
  },
  setup() {
    const userStore = useUserStore();
    return {
      logoFacebook, 
      logoInstagram, 
      logoTwitter, 
      logoVimeo, 
      personCircleOutline,
      searchOutline,
      homeOutline,
      logInOutline,
      logOutOutline,
      // settingsOutline,
      share,
      userStore
    }
  },
  methods: {
    async logout() {
      const token = localStorage.getItem('token')
      await axios.post('https://api.mangadex.org/auth/logout', {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then( res => {
        console.log(res)
        if (res.data.result === 'ok') {
          localStorage.removeItem('token')
          window.dispatchEvent(new CustomEvent('localstorage-changed', {
              detail: {
                  storage: localStorage.removeItem('token')
              }
          }))
          this.userStore.resetMessage()
          this.$router.push('/login');
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
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
    window.addEventListener('localstorage-changed', () => {
      if (localStorage.getItem('token')) {
        this.logged = true
      } else {
        this.logged = false
      }
    });

  }
});
</script>

<style scoped>
.header {
  z-index: 3;
  height: 80px;
  background-color: #1f1f1f;
  border-bottom: 1px solid #3a3a3a;
  box-shadow: 0px 10px 25px rgb(0 0 0);
}
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
h1 {
  z-index: 2;
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

