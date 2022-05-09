<template>
  <ion-page>    
    <ion-content :fullscreen="true">    
      <div id="container">
        <div id="login">
          <h2>Log In</h2>
          <br/>
          <div id="logPart">
            <form action="">
              <ion-input type="text" autocomplete="username" v-model="username" placeholder="Username"></ion-input>
              <br/>
              <ion-input type="password" autocomplete="current-password" v-model="password" placeholder="Password"></ion-input>
              <br/>
              <ion-button class="light" @click="userStore.logIn(username, password)" id="logBtn">LOG IN</ion-button><br/><br/>
              <span id="errorLog">{{ userStore.getLogMessage }}</span>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
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
    IonInput,
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
#logPart {
  width: 40vw;
  margin: auto;
}
ion-input {
  border: 1px solid white;
  border-radius: 3px;
  text-align: left;
}
</style>