<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <ion-item>
          <ion-label>
            {{ username }}
          </ion-label>
          <ion-button class="light" @click="logout">
            Se déconnecter
          </ion-button>
        </ion-item>
        <br>
        <FollowedMangasList />
        <br>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FollowedMangasList from '@/components/followedMangas/FollowedMangasList.vue';
import { IonContent, IonPage, IonItem, IonButton, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user.store';


export default defineComponent({
  name: 'Profile',
  data() {
    return {
      user: [],
      username: '',
      userId: '',
      result: false,
    }
  },
  components: {
    FollowedMangasList,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonButton
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    };
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
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if(token) {
      axios.get('https://api.mangadex.org/user/me', {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => {
          this.user = res.data.data
          this.username = res.data.data.attributes.username
          this.userId = res.data.data.id
      })
      .catch(err => {
          console.error(err);
      });
    }
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
  position: relative;
  margin-top: 150px;
}

#cntainer strong {
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
ion-item {
  width: 95%;
  margin: auto;
}
</style>