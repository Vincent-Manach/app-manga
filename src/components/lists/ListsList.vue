<template>
  <div class="showList">
    <id-lists v-for="list in lists" :key="list.id" :list="list"></id-lists>
  </div>
</template>

<script>
import IdLists from "@/components/lists/IdLists.vue";
import axios from 'axios';

export default {
  name: 'ListsList',
  data () {
    return {
      lists: [],
    }
  },
  components: {
    'id-lists': IdLists
  },
  methods: {
    async fetchData () {

      axios.get('https://api.mangadex.org/user/7fee09b4-9244-4fc9-a208-7024f5d95e44/list?limit=10', {
        params: {
          limit: 5
        }
      })
      .then(resp => {
          // console.log(resp.data.data);
          this.lists = resp.data.data
          console.log(this.lists);
          const testLists = resp.data.data
          const listsId = []
          testLists.forEach(testList => {
            listsId.push(testList.id)
            return listsId;
          })
          console.log(listsId)
      })
      .catch(err => {
          // Handle Error Here
          console.error(err);
      });
    }
  },
  mounted () {
    this.fetchData()

    


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
