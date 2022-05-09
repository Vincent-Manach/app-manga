<template>
  <div v-if="mangaStore.getLoadingFollows == false" class="showList">
      <h1 class="title" >My followed mangas</h1>
      <ion-slides pager="true" :options="slideOpts">
        <id-followed-mangas v-for="followedManga in mangaStore.getFollows" :key="followedManga.id" :followedManga="followedManga"></id-followed-mangas>
      </ion-slides> 
  </div>
</template>

<script>
import IdFollowedMangas from "@/components/followedMangas/IdFollowedMangas.vue";
import { IonSlides } from '@ionic/vue';
import { useMangaStore } from '@/stores/manga.store';

export default {
  name: 'FollowedMangasList',
  data () {
    return {
      loading: true,
    }
  },
  components: {
    'id-followed-mangas': IdFollowedMangas,
    IonSlides
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
    this.mangaStore.fetchFollows()
  }
}
</script>

<style scoped>
ion-slides {
  padding: 20px 20px 30px 20px;
  height: auto;
}
.showList {
    margin-top: 0px;
}
.title {
  color: white;
}
</style>
