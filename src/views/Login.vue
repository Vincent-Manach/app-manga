@ts-nocheck

<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <div class="logo">
          <!-- <img src="../../../public/assets/img/logotest.png" alt="logo"> -->
        </div>
        <div id="login">
          <h2>Connectez-vous</h2>
          <div id="logPart">
            <form action="">
              <input type="text" autocomplete="username" v-model="username" placeholder="username">
              <br/><br/>
              <input type="password" autocomplete="current-password" v-model="password" placeholder="password">
              <br/><br/>
              <ion-button class="light" @click="userStore.addUser(username, password)" id="logBtn">SE CONNECTER</ion-button><br/><br/>
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
// import axios from 'axios';
// import jwtDecode from "jwt-decode";
import { useUserStore } from '@/stores/user.store';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      login: [],
      username: null,
      password: null,
      errorLog: '',
    }
  },
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    IonButton
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    // async checkToken() {
    //   const token = localStorage.getItem('token')
    //   await axios.get('https://api.mangadex.org/auth/check', {
    //     headers: {
    //       'Authorization':`Bearer ${token}`
    //     }
    //   })
    //   .then(res => {
    //       console.log(res.data.isAuthenticated);
    //       if (res.data.isAuthenticated == true) {

    //         this.refreshToken()
    //       } else {
    //       }
    //   })
    //   .catch(err => {
    //       console.error(err);
    //   });
    // },

    // async refreshToken() {
    //   const token = localStorage.getItem('token')
    //   await axios.get('https://api.mangadex.org/auth/refresh', {
    //     headers: {
    //       'Authorization':`Bearer ${token}`
    //     }
    //   })
    //   .then( res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   }) 
    // },
    // async checkAuth() {
      
    //   await axios.post('https://api.mangadex.org/auth/login', {
    //       username: this.username,
    //       password: this.password
    //   })
    //   .then( res => {
    //     this.errorLog = '';
    //     const tokenUser = res.data.token.session
    //     const jwtToken = jwtDecode(tokenUser)
    //     // const userId = jwtToken.test

    //     console.log(jwtToken)

    //     localStorage.setItem('token', tokenUser)
    //     console.log(localStorage.getItem('token'))
    //     localStorage.setItem('log', 'LogOn')
    //     console.log(localStorage.getItem('log'))
    //     // localStorage.setItem('userId', userId)
    //     // console.log(localStorage.getItem('userId'))
    //     this.$router.push({ path: '/home' })
    //     // this.$router.push('/home');
    //     // window.location.reload();
    //     // this.refreshToken()
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.errorLog = 'Your crendentials are invalid. Please try again'
    //   }) 
    // },
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