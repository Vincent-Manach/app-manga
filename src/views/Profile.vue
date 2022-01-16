<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <!-- <strong>Welcome to Manga Manach</strong>
        <p>(Nom provisoire)</p> -->
        <ion-item>
          <ion-label>
            Item {{ user.attributes }}
          </ion-label>
        </ion-item>
        <ion-item>
        <ion-label>
          <ion-button class="light" @click="logout">
            Se déconnecter
          </ion-button>
        </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonItem, IonButton, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'Profile',
  data() {
    return {
      // logged: true,
      user: [],
    }
  },
  components: {
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
          // this.logged = fals
        }
      })
      .catch(err => {
        console.log(err)
      }) 

      // this.$router.push('/home');
      // .then(res => {
      //   this.login = res.data.data
      //     console.log('it works ' + res.data.token.session);
      // })
      // .catch(err => {
      //     // Handle Error Here
      //     console.error('no no no' + err);
      // })
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    axios.get('https://api.mangadex.org/user/me', {
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res => {
        console.log(res.data);
        this.user = res.data.data
        console.log(this.user)
    })
    .catch(err => {
        console.error(err);
    });
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