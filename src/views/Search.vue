<template>
  <ion-page>    
    <ion-content :fullscreen="false"> 
      <form action="" method="GET">
        <ion-searchbar mode="ios" color="danger" show-cancel-button="never" inputmode="search" id="searchBar"></ion-searchbar>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'Search',
  data () {
    return {
      results: []
      // mangasChap: []
    }
  },
  components: {
    IonContent,
    IonPage,
    IonSearchbar
  },
  methods: {
    async searchData () {
        await axios.get('https://api.mangadex.org/manga', {
         
        })
        .then(resp => {
            // console.log(resp.data.data);
            this.results = resp.data
            console.log(this.results);
        })
        .catch(err => {
            console.error(err);
        });
      }
  },
  mounted() {
    this.searchData()
  }
});
</script>

<style scoped>

ion-searchbar {
  position: fixed;
  top: 70px;
}

ion-toolbar {
  display: flex;
  text-align: center;
}

#container {
  text-align: center;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>