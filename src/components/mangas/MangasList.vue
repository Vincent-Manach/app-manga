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
import { useMangaStore } from '@/stores/manga.store';

export default {
  name: 'MangasList',
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
  mounted () {
    this.mangaStore.initFetchHome()
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
