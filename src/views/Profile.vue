<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <!-- <strong>Welcome to Manga Manach</strong>
        <p>(Nom provisoire)</p> -->
        <ion-item>
          <ion-label>
            {{ username }}
          </ion-label>
        </ion-item>
        <ion-item>
        <ion-label>
          <ion-button class="light" @click="logout">
            Se déconnecter
          </ion-button>
        </ion-label>
        </ion-item>

        <h1 class="title" >Followed Mangas </h1>
        <FollowedMangasList/>
        <br>
        <ListsList/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FollowedMangasList from '@/components/followedMangas/FollowedMangasList.vue';
import ListsList from '@/components/lists/ListsList.vue';
import { IonContent, IonPage, IonItem, IonButton, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'Profile',
  data() {
    return {
      user: [],
      username: '',
      userId: '',
    }
  },
  components: {
    FollowedMangasList,
    ListsList,
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    IonItem,
    IonLabel,
    IonButton
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
          localStorage.removeItem('log')
          this.$router.push('/home');
          console.log(localStorage.getItem('token'), localStorage.getItem('log'))
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    console.log(token)
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

.title {
  color: black;
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