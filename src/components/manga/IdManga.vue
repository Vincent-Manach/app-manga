<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ mangaTitle }}</ion-card-title>
        <img v-bind:src="'https://uploads.mangadex.org/covers/'+mangaId+'/'+coverName" />
        <div v-if="mangaLastChap || mangaLastVol" class="detailsVol">
          <p  v-if="mangaLastChap">Last Chapter : {{ mangaLastChap }}</p>
          <p  v-if="mangaLastVol">Last Volume : {{ mangaLastVol }}</p>
        </div>
      </ion-card-header>
      <ion-card-content>{{ mangaDesc }}</ion-card-content>
      <ion-button v-if="logged == true" @click="addFollow">Add</ion-button> 
      <br>
      <hr>
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
import { useMangaStore } from '@/stores/manga.store';

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
  setup() {
    const mangaStore = useMangaStore()
    return { mangaStore }
  },
  methods: {
    // fetch manga data
    async fetchData () {
      await axios.get(`https://api.mangadex.org/manga/${this.$route.params.id}`)
      .then(resp => {
          console.log(resp.data.data);
          this.manga = resp.data
          this.mangaId = resp.data.data.id
          this.mangaTitle = resp.data.data.attributes.title.en
          this.mangaDesc = resp.data.data.attributes.description.en
          this.mangaLastChap = resp.data.data.attributes.lastChapter
          this.mangaLastVol = resp.data.data.attributes.lastVolume
          if (resp.data.data.relationships[2].type == "cover_art") {
            const coverId = resp.data.data.relationships[2].id
            this.fetchImg(coverId)
          } else if (resp.data.data.relationships[3].type == "cover_art") {
            const coverId = resp.data.data.relationships[3].id
            this.fetchImg(coverId)
          } else if (resp.data.data.relationships[4].type == "cover_art") {
            const coverId = resp.data.data.relationships[4].id
            this.fetchImg(coverId)
          }
          console.log(this.manga);
          this.fetchChap()
      })
      .catch(err => {
          console.error(err);
      });
    },

  // fetch manga img
    async fetchImg (coverId) {
      await axios.get(`https://api.mangadex.org/cover/${coverId}`)
      .then(resp => {
          this.coverName = resp.data.data.attributes.fileName
      })
      .catch(err => {
          console.error(err);
      });
    },

  // fetch manga chapters
    async fetchChap () {
      await axios.get(`https://api.mangadex.org/manga/${this.mangaId}/feed?translatedLanguage[]=en&order[volume]=asc&order[chapter]=asc`)
      .then(resp => {
          this.mangaChaps = resp.data.data
          this.loading = false
      })
      .catch(err => {
          console.error(err);
      });
    },

    // add this manga to followed mangas
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
          this.mangaStore.fetchFollows()
          this.$router.push('/profile')
      })
      .catch(err => {
          console.log(err)
      });
    }
  },
    mounted () {
      this.fetchData();
      
      // check if logged
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
    flex-direction: column;
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
    padding-top: 15px;
  }
  ion-select {
    width: 150px;
    margin: auto;
  }
  .showList h2 {
    color: white;
  }
  hr {
    border-top: 1px solid white;
  }
</style>