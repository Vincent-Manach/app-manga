<template>
  <div class="showList">
    <id-mangas v-for="manga in mangas" :key="manga.id" :manga="manga"></id-mangas>
  </div>
</template>

<script>
import IdMangas from "@/components/mangas/IdMangas.vue"
import axios from 'axios'

export default {
  name: 'MangaList',
  data () {
    return {
      mangas: []
      // mangasChap: []
    }
  },
  components: {
    'id-mangas': IdMangas
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
</style>
