<template>
    <div class="container">
      <h2>{{ manga.data }}</h2>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  
  name: 'IdManga',
  data () {
    return {
      manga: [],
    }
  },
  methods: {
      async fetchData () {

        await axios.get(`https://api.mangadex.org/manga/${this.$route.params.id}/aggregate`)
        .then(resp => {
            // console.log(resp.data.data);
            this.manga = resp.data
            console.log(this.manga);
            // const testLists = resp.data.data
            // const listsId = []
            // testLists.forEach(testList => {
            //   listsId.push(testList.id)
            //   return listsId;
            // })
            // console.log(listsId)
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      }
    },
    mounted () {
      this.fetchData()
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
    padding: 5px;
  }
</style>