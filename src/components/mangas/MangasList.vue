<template>
  <div v-if="mangaStore.getLoadingRecents == false" class="showList">
    <h2>Recent Uploads</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getRecents" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="mangaStore.getLoadingActions == false" class="showList">
    <h2>Action</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getActions" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="mangaStore.getLoadingAdventures == false" class="showList">
    <h2>Adventure</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getAdventures" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div><br>

  <div v-if="mangaStore.getLoadingDramas == false" class="showList">
    <h2>Drama</h2>
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangaStore.getDramas" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div>
</template>

<script>
import IdMangas from "@/components/mangas/IdMangas.vue";
import { IonSlides } from '@ionic/vue';
// import axios from 'axios';
import { useMangaStore } from '@/stores/manga.store';

export default {
  name: 'MangasList',
  data () {
    return {
      // mangasDrama: [],
      // loading: true,
    }
  },
  components: {
    'id-mangas': IdMangas,
    IonSlides,
  },
  setup() {
    const slideOpts = {
      slidesPerView: 1,
      initialSlide: 0,
      speed: 400
    };
    const mangaStore = useMangaStore()
    return { slideOpts, mangaStore }
  },
  methods: {
    // async fetchDrama () {
    //   await axios.get('https://api.mangadex.org/manga?includedTags[]=b9af3a63-f058-46de-a9a0-e0c13906197a&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
    //     params: {
    //       limit: 10
    //     }
    //   })
    //   .then(resp => {
    //       this.mangasDrama = resp.data.data
    //       console.log(this.mangasDrama);
    //       this.loading = false
    //   })
    //   .catch(err => {
    //       console.error(err);
    //   });
    // },
  },
  mounted () {
    // this.fetchRecent()
    this.mangaStore.initFetchHome()
    // this.fetchDrama()
  }
}
</script>

<style scoped>
.showList {
    margin-top: 0px;
}
ion-slides {
  padding: 20px 0;
  height: auto;
}
</style>
