<template>
    <ion-card>
      <!-- <img v-bind:src="'https://uploads.mangadex.org/covers/'+mangaId+'/'+coverName" /> -->
      <ion-card-header>
        <ion-card-title>{{ mangaTitle }}</ion-card-title>
        <img v-bind:src="'https://uploads.mangadex.org/covers/'+mangaId+'/'+coverName" />
        <div class="detailsVol">
          <p>Last Chapter : {{ mangaLastChap }}</p>
          <p>Last Volume : {{ mangaLastVol }}</p>
        </div>
      </ion-card-header>
      <ion-card-content>{{ mangaDesc }}</ion-card-content>
      <ion-button v-if="logged == true" @click="addFollow">Add</ion-button> 
      <!-- v-if="logged == true" -->
      <div v-if="loading == false" class="showList">
        <h2>Chapters</h2>
        <id-manga-chaps v-for="mangaChap in mangaChaps" :key="mangaChap.id" :mangaChap="mangaChap"></id-manga-chaps>
      </div>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import IdMangaChaps from "@/components/manga/IdMangaChaps.vue";
import axios from 'axios';

export default {
  
  name: 'IdManga',
  data () {
    return {
      manga: [],
      mangaChaps: [],
      mangaId: '', 
      mangaTitle: '',
      mangaDesc: '',
      mangaLastVol: '',
      mangaLastChap: '',
      coverId: '',
      coverName: '',
      logged: false,
      loading: true,
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    'id-manga-chaps': IdMangaChaps,
  },
  methods: {
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
          this.fetchChap()
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

    async fetchChap () {
      await axios.get(`https://api.mangadex.org/manga/${this.mangaId}/feed?translatedLanguage[]=en&order[volume]=asc&order[chapter]=asc`)
      .then(resp => {
          // console.log(resp.data.data);
          this.mangaChaps = resp.data.data
          console.log(this.mangaChaps)
          this.loading = false
      })
      .catch(err => {
          // Handle Error Here
          console.error(err);
      });
    },

    async addFollow() {
      const token = localStorage.getItem('token');
      await axios.post(`https://api.mangadex.org/manga/${this.mangaId}/follow`, {}, {
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
          console.log(res)
      })
      .catch(err => {
          console.log(err)
      });
    }
  },
    mounted () {
      this.fetchData();
      
      if (localStorage.getItem('token')) {
        this.logged = true
      } else {
        this.logged = false
      }
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
  ion-card-header {
    padding: 0;
  }
  ion-card-title {
    font-size: 26px;
    margin-bottom: 10px;
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