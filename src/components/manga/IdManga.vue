<template>
    <ion-card>
      <img v-bind:src="'https://uploads.mangadex.org/covers/'+mangaId+'/'+coverName" />
      <ion-card-header>
        <ion-card-title>{{ mangaTitle }}</ion-card-title>
        <div class="detailsVol">
          <p>Last Chapter : {{ mangaLastChap }}</p>
          <p>Last Volume : {{ mangaLastVol }}</p>
        </div>
        
        <!-- <h3>Status : {{ mangaStatus }}</h3> -->
      </ion-card-header>
      <ion-card-content>{{ mangaDesc }}</ion-card-content>
      <ion-button  @click="addFollow">Add</ion-button> 
      <!-- v-if="logged == true" -->
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  
  name: 'IdManga',
  data () {
    return {
      manga: [],
      mangaId: '', 
      mangaTitle: '',
      mangaDesc: '',
      mangaLastVol: '',
      mangaLastChap: '',
      coverId: '',
      coverName: '',
      logged: false,
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  methods: {
    async addFollow() {
      const token = localStorage.getItem('token');
      await axios.post(`https://api.mangadex.org/manga/${this.mangaId}/follow`, {
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then( res => {
          console.log(res)
      })
      .catch(err => {
          console.log(err)
      });
    },
    async fetchData () {
      await axios.get(`https://api.mangadex.org/manga/${this.$route.params.id}`)
      .then(resp => {
          // console.log(resp.data.data);
          this.manga = resp.data
          this.mangaId = resp.data.data.id
          this.mangaTitle = resp.data.data.attributes.title.en
          this.mangaDesc = resp.data.data.attributes.description.en
          this.mangaLastChap = resp.data.data.attributes.lastChapter
          this.mangaLastVol = resp.data.data.attributes.lastVolume
          this.coverId = resp.data.data.relationships[2].id
          console.log(this.manga);
          this.fetchImg()
      })
      .catch(err => {
          // Handle Error Here
          console.error(err);
      });
    },

    async fetchImg () {
      await axios.get(`https://api.mangadex.org/cover/${this.coverId}`)
      .then(resp => {
          // console.log(resp.data.data);
          this.coverName = resp.data.data.attributes.fileName
      })
      .catch(err => {
          // Handle Error Here
          console.error(err);
      });
    },
  },
    mounted () {
      this.fetchData();

      window.addEventListener('localstorage-changed', () => {
        if (localStorage.getItem('token')) {
          this.logged = true
        } else {
          this.logged = false
        }
      });

      // axios.get(`https://api.mangadex.org/cover/${this.manga.relationships[2].id}`)
      // .then(resp => {
      //     // console.log(resp.data.data);
      //     this.coverName = resp.data.data.attributes.fileName
      // })
      // .catch(err => {
      //     // Handle Error Here
      //     console.error(err);
      // });
    }
  }
</script>

<style scoped>
  .id-card {
    color: black;
    border: 1px solid gray;
    background-color: white;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.50);
    border-radius: 15px;
    width: 300px;
    margin: 25px auto;
    padding: 15px;
  }
  ion-card {
    padding: 15px;
  }
  ion-card-title {
    font-size: 26px;
  }
  .detailsVol {
    display: flex;
    justify-content: space-around;
  }
  .detailsVol p {
    padding: 5px 10px;
    background-color: orange;
    border-radius: 3px;
    color: white;
    font-size: 16px;
  }
  ion-card-content {
    color: white;
  }
  ion-select {
    width: 150px;
    margin: auto;
  }
</style>