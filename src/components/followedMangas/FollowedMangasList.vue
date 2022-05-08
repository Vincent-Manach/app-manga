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
// import axios from 'axios';
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
  methods: {
    // async fetchData () {
    //   const token = localStorage.getItem('vuejs_token')

    //   const res = axios.get('https://api.mangadex.org/manga', {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   console.log(res)
    //   this.mangas = res.data
    //   console.log(this.mangas+'desf')
    // }

    // async fetchData() {
    //   const token = localStorage.getItem('token')
    //   await axios.get('https://api.mangadex.org/user/follows/manga', {
    //     headers: {
    //       'Authorization':`Bearer ${token}`
    //     }
    //   })
    //   .then(res => {
    //       this.followedMangas = res.data.data
    //       console.log(this.followedMangas)
    //       this.loading = false
    //   })
    //   .catch(err => {
    //       console.error(err);
    //   });
    // }
  },
  mounted () {
    // this.fetchData()
    this.mangaStore.fetchFollows()
    

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
