<template>
    <div class="container">
      <h2>{{ list.data }}</h2>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  
  name: 'IdList',
  data () {
    return {
      list: [],
    }
  },
  methods: {
      async fetchData () {

        await axios.get(`https://api.mangadex.org/list/${this.$route.params.id}`)
        .then(resp => {
            // console.log(resp.data.data);
            this.list = resp.data
            console.log(this.list);
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
  .container {
    color: black;
  }
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