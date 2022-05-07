<template>
  <div v-if="loading == false" class="showList">
    <h2>Recent Uploads</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getRecents" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="loading == false" class="showList">
    <h2>Action</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getActions" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="loading == false" class="showList">
    <h2>Adventure</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getAdventures" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="loading == false" class="showList">
    <h2>Drama</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangasDrama" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div>
</template>

<script>
import IdMangas from "@/components/mangas/IdMangas.vue";
import { IonSlides } from '@ionic/vue';
import axios from 'axios';
import { useMangaStore } from '@/stores/manga.store';

export default {
  name: 'MangasList',
  data () {
    return {
      mangasDrama: [],
      loading: true,
      // mangasChap: []
    }
  },
  components: {
    'id-mangas': IdMangas,
    IonSlides,
    // IonSlide
  },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      slidesPerView: 3,
      initialSlide: 0,
      speed: 400
    };
    const mangaStore = useMangaStore()
    return { slideOpts, mangaStore }
  },
  methods: {

    // async fetchAction () {
    //   await axios.get('https://api.mangadex.org/manga?includedTags[]=391b0423-d847-456f-aff0-8b0cfc03066b&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
    //     params: {
    //       limit: 10
    //     }
    //   })
    //   .then(resp => {
    //       // console.log(resp.data.data);
    //       this.mangasAction = resp.data.data
    //       console.log(this.mangasAction);
    //       this.loading = false
    //   })
    //   .catch(err => {
    //       // Handle Error Here
    //       console.error(err);
    //   });
    // },

    // async fetchAdventure () {
    //   await axios.get('https://api.mangadex.org/manga?includedTags[]=87cc87cd-a395-47af-b27a-93258283bbc6&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
    //     params: {
    //       limit: 10
    //     }
    //   })
    //   .then(resp => {
    //       this.mangasAdventure = resp.data.data
    //       console.log(this.mangasAdventure);
    //       this.loading = false
    //   })
    //   .catch(err => {
    //       console.error(err);
    //   });
    // },

    async fetchDrama () {
      await axios.get('https://api.mangadex.org/manga?includedTags[]=b9af3a63-f058-46de-a9a0-e0c13906197a&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
        params: {
          limit: 10
        }
      })
      .then(resp => {
          this.mangasDrama = resp.data.data
          console.log(this.mangasDrama);
          this.loading = false
      })
      .catch(err => {
          console.error(err);
      });
    },

  },
  mounted () {
    // this.fetchRecent()
    this.mangaStore.initFetchHome()
    this.fetchDrama()


    // axios.get('https://api.mangadex.org/manga/{id}/aggregate', {
    //   params: {
    //     limit: 5
    //   }
    // })
    // .then(resp => {
    //     // console.log(resp.data.data);
    //     this.mangasChap = resp.data.data
    //     console.log(this.mangasChap);
    // })
    // .catch(err => {
    //     // Handle Error Here
    //     console.error(err);
    // });
  }
}
</script>

<style scoped>
.showList {
    margin-top: 0px;
}
ion-slides {
  padding: 20px 0;
}
</style>
