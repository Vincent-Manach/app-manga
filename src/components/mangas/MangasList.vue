<template>
  <div class="showList">
    <ion-slides pager="true" :options="slideOpts">
        <id-mangas v-for="manga in mangas" :key="manga.id" :manga="manga"></id-mangas>
    </ion-slides>
  </div>
</template>

<script>
import IdMangas from "@/components/mangas/IdMangas.vue";
import { IonSlides } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'MangasList',
  data () {
    return {
      mangas: []
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
    return { slideOpts }
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
  },
  mounted () {
    // this.fetchData()

    axios.get('https://api.mangadex.org/manga/', {
      params: {
        limit: 5
      }
    })
    .then(resp => {
        // console.log(resp.data.data);
        this.mangas = resp.data.data
        console.log(this.mangas);
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });


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
