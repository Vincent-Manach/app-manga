@ts-nocheck

<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <div class="logo">
          <!-- <img src="../../../public/assets/img/logotest.png" alt="logo"> -->
        </div>
        <div id="login">
          <h1>Le nom de l'app</h1>
          <h2>Connectez-vous</h2>
          <div id="logPart">
            <form action="">
              <input type="text" v-model="username" placeholder="USERNAME">
              <br/><br/>
              <input type="password" v-model="password" placeholder="PASSWORD">
              <br/><br/>
              <ion-button class="light" @click="checkAuth" id="logBtn">SE CONNECTER</ion-button><br/><br/>
              <span id="errorLog">{{ errorLog }}</span>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import jwtDecode from "jwt-decode";

export default defineComponent({
  name: 'Login',
  data() {
    return {
      login: [],
      username: null,
      password: null,
      errorLog: '',
      logged: false,
    }
  },
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    IonButton
  },
  methods: {
    async checkToken() {
      const token = localStorage.getItem('token')
      await axios.get('https://api.mangadex.org/auth/check', {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res => {
          console.log(res.data.isAuthenticated);
          if (res.data.isAuthenticated == true) {
            this.logged = true
            this.refreshToken()
          } else {
            this.logged = false
          }
      })
      .catch(err => {
          console.error(err);
      });
    },

    async checkAuth() {
      
      await axios.post('https://api.mangadex.org/auth/login', {
          username: this.username,
          password: this.password
      })
      .then( res => {
        const tokenUser = res.data.token.session
        const jwtToken = jwtDecode(tokenUser)

        console.log(jwtToken)


        localStorage.setItem('token', tokenUser)
        console.log(localStorage.getItem('token'))
        this.$router.push('/home');
        this.checkToken()
      })
      .catch(err => {
        console.log(err)
        this.errorLog = 'Your crendentials are invalid. Please try again'
      }) 
    },

    async refreshToken() {
        const token = localStorage.getItem('token')
        await axios.post('https://api.mangadex.org/auth/refresh', {
          headers: token
        })
        .then( res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        }) 
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